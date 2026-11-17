import { assetUrl } from '../assetUrl'

/**
 * Load the original GLB bytes faster.
 * Packs (production builds) are concatenations of those exact bytes — no
 * Draco, meshopt, quantization, or re-export — so vertex data is unchanged.
 * Repeat visits read the Cache API. This page keeps a buffer only until that
 * file has been parsed, so the raw GLB and the mesh are not both held.
 */

const sessionBuffers = new Map<string, ArrayBuffer>()
const inflight = new Map<string, Promise<ArrayBuffer>>()
let cachePromise: Promise<Cache | null> | null = null
let revisionPromise: Promise<string | null> | null = null

export type GlbRole = 'bones' | 'muscles'

/** How many GLBs to fetch and parse at once. Higher than the old 24/12 batches. */
export function glbConcurrency(role: GlbRole): number {
  const cores = navigator.hardwareConcurrency || 4
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
  const touch = navigator.maxTouchPoints > 0
  const lowMem = mem != null && mem > 0 && mem <= 4
  if (role === 'muscles') {
    // Background. Old code used batches of 12. Some muscles are ~2MB.
    if (touch && lowMem) return 16
    if (touch) return 20
    return Math.min(24, Math.max(16, cores * 2))
  }
  // Foreground bones + cartilage. Old code waited out batches of 24.
  if (touch && lowMem) return 28
  if (touch) return 32
  return Math.min(48, Math.max(32, cores * 4))
}

/** Drop decoded file bytes kept for this page. Cache API copies stay for the next visit. */
export function releaseGlbSessionCache(): void {
  sessionBuffers.clear()
}

function absoluteUrl(url: string): string {
  return new URL(url, window.location.href).href
}

function isGlb(buf: ArrayBuffer): boolean {
  if (buf.byteLength < 12) return false
  const u = new Uint8Array(buf, 0, 4)
  return u[0] === 0x67 && u[1] === 0x6c && u[2] === 0x54 && u[3] === 0x46
}

function isPack(buf: ArrayBuffer): boolean {
  if (buf.byteLength < 12) return false
  const u = new Uint8Array(buf, 0, 4)
  // ANPK — see scripts/pack-models.mjs
  return u[0] === 0x41 && u[1] === 0x4e && u[2] === 0x50 && u[3] === 0x4b
}

/** Build id from dist/models/packs/revision.json. A new build must not reuse old packs. */
function revision(): Promise<string | null> {
  if (!import.meta.env.PROD) return Promise.resolve(null)
  if (!revisionPromise) {
    revisionPromise = (async () => {
      try {
        const res = await fetch(assetUrl('models/packs/revision.json'), { cache: 'no-store' })
        if (!res.ok) return null
        const json = (await res.json()) as { id?: unknown }
        const id = typeof json.id === 'string' ? json.id : ''
        return /^[a-f0-9]{16,64}$/.test(id) ? id : null
      } catch {
        return null
      }
    })()
  }
  return revisionPromise
}

async function openCache(): Promise<Cache | null> {
  if (cachePromise) return cachePromise
  cachePromise = (async () => {
    const id = await revision()
    if (!id || !('caches' in window)) return null
    const name = `anatomy-glb-${id}`
    try {
      const keys = await caches.keys()
      await Promise.all(
        keys
          .filter((key) => key.startsWith('anatomy-glb-') && key !== name)
          .map((key) => caches.delete(key)),
      )
      return await caches.open(name)
    } catch {
      return null
    }
  })()
  return cachePromise
}

async function fetchGlb(url: string, accept: (buf: ArrayBuffer) => boolean): Promise<ArrayBuffer> {
  const key = absoluteUrl(url)
  const mem = sessionBuffers.get(key)
  if (mem) return mem
  const pending = inflight.get(key)
  if (pending) return pending

  const job = (async () => {
    const cache = await openCache()
    if (cache) {
      try {
        const hit = await cache.match(key)
        if (hit) {
          const cached = await hit.arrayBuffer()
          if (accept(cached)) {
            sessionBuffers.set(key, cached)
            return cached
          }
          await cache.delete(key)
        }
      } catch {
        /* private mode or a bad entry */
      }
    }

    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
    const copy = res.clone()
    const buf = await res.arrayBuffer()
    if (!accept(buf)) throw new Error(`Unexpected file for ${url}`)
    sessionBuffers.set(key, buf)
    if (cache) {
      try {
        await cache.put(key, copy)
      } catch {
        /* quota */
      }
    }
    return buf
  })()

  inflight.set(key, job)
  try {
    return await job
  } finally {
    inflight.delete(key)
  }
}

type PackIndex = {
  buffer: ArrayBuffer
  entries: Map<string, { off: number; len: number }>
}

/** Walk an ANPK v1 pack. Returns null when the bytes are not a pack. */
function indexPack(buf: ArrayBuffer): PackIndex | null {
  if (!isPack(buf)) return null
  const view = new DataView(buf)
  const version = view.getUint32(4, true)
  if (version !== 1) return null
  const count = view.getUint32(8, true)
  const entries = new Map<string, { off: number; len: number }>()
  const decoder = new TextDecoder()
  let p = 12
  for (let i = 0; i < count; i++) {
    if (p + 2 > buf.byteLength) return null
    const nameLen = view.getUint16(p, true)
    p += 2
    if (nameLen < 1 || p + nameLen + 4 > buf.byteLength) return null
    const name = decoder.decode(new Uint8Array(buf, p, nameLen))
    p += nameLen
    const dataLen = view.getUint32(p, true)
    p += 4
    if (dataLen < 12 || p + dataLen > buf.byteLength) return null
    entries.set(name, { off: p, len: dataLen })
    p += dataLen
  }
  return { buffer: buf, entries }
}

async function mapPool<T>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<void>,
): Promise<void> {
  if (items.length === 0) return
  let cursor = 0
  const workers = Math.max(1, Math.min(limit, items.length))
  let finished = 0
  async function worker(): Promise<void> {
    while (cursor < items.length) {
      const item = items[cursor]
      cursor += 1
      await fn(item)
      finished += 1
      // Let the loading status paint. A full yield every file would add a lot of idle time.
      if (finished % 8 === 0) {
        await new Promise<void>((resolve) => {
          window.setTimeout(resolve, 0)
        })
      }
    }
  }
  await Promise.all(Array.from({ length: workers }, () => worker()))
}

async function loadPack(packName: string): Promise<PackIndex | null> {
  if (!import.meta.env.PROD) return null
  if (!(await revision())) return null
  try {
    const buf = await fetchGlb(assetUrl(`models/packs/${packName}.pack`), isPack)
    return indexPack(buf)
  } catch (err) {
    console.info(
      '[skeleton] no pack',
      packName,
      err instanceof Error ? err.message : '',
    )
    return null
  }
}

/**
 * Deliver each manifest URL's original GLB bytes.
 * Production prefers one pack request. Dev and a missing pack use the files themselves.
 */
export async function forEachGlb(
  urls: readonly string[],
  opts: {
    packName: string
    concurrency: number
    onFile: (url: string, data: ArrayBuffer) => Promise<void>
  },
): Promise<void> {
  const started = performance.now()
  const pack = await loadPack(opts.packName)
  const missing: string[] = []

  const deliver = async (url: string, data: ArrayBuffer): Promise<void> => {
    try {
      await opts.onFile(url, data)
    } catch (err) {
      console.warn('Failed to load', url, err)
    }
  }

  const deliverFile = async (url: string): Promise<void> => {
    const data = await fetchGlb(url, isGlb)
    try {
      await deliver(url, data)
    } finally {
      // Keep the Cache API copy for the next visit. Don't also hold every GLB in JS
      // after its mesh exists — that doubles RAM on a phone.
      sessionBuffers.delete(absoluteUrl(url))
    }
  }

  if (pack) {
    await mapPool(urls, opts.concurrency, async (url) => {
      const name = url.split('/').pop() || ''
      const loc = pack.entries.get(name)
      if (!loc) {
        missing.push(url)
        return
      }
      // slice() is a copy of the original GLB range, which parse() requires at offset 0.
      const data = pack.buffer.slice(loc.off, loc.off + loc.len)
      await deliver(url, data)
    })
    if (missing.length > 0) {
      console.warn('[skeleton] pack missing', opts.packName, missing.length)
      await mapPool(missing, opts.concurrency, async (url) => {
        try {
          await deliverFile(url)
        } catch (err) {
          console.warn('Failed to load', url, err)
        }
      })
    }
  } else {
    await mapPool(urls, opts.concurrency, async (url) => {
      try {
        await deliverFile(url)
      } catch (err) {
        console.warn('Failed to load', url, err)
      }
    })
  }

  console.info(
    '[skeleton] loaded',
    opts.packName,
    urls.length,
    pack ? 'pack' : 'files',
    'x' + opts.concurrency,
    Math.round(performance.now() - started) + 'ms',
  )
}
