/**
 * Concatenate original GLB bytes into ANPK v1 packs.
 * Does not parse or re-export glTF, so vertex positions stay identical.
 *
 * Layout (little-endian):
 *   0  char[4]  'ANPK'
 *   4  uint32   version = 1
 *   8  uint32   count
 *   then count times:
 *     uint16 nameLen + utf8 basename + uint32 dataLen + original file bytes
 *
 * Usage: node scripts/pack-models.mjs <outDir>
 */
import { createHash } from 'node:crypto'
import { readFile, writeFile, mkdir, readdir, rm, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

const GROUPS = [
  { name: 'bones', manifest: 'models/extra/manifest.json' },
  { name: 'muscles', manifest: 'models/extra/muscles/manifest.json' },
  { name: 'cartilage', manifest: 'models/extra/cartilage/manifest.json' },
  { name: 'ligaments', manifest: 'models/extra/ligaments/manifest.json' },
]

function readPack(buf) {
  if (buf.length < 12) throw new Error('pack is too short')
  if (buf.toString('latin1', 0, 4) !== 'ANPK') throw new Error('pack magic')
  const version = buf.readUInt32LE(4)
  if (version !== 1) throw new Error('pack version ' + version)
  const count = buf.readUInt32LE(8)
  let p = 12
  const entries = []
  for (let i = 0; i < count; i++) {
    const nameLen = buf.readUInt16LE(p)
    p += 2
    const name = buf.toString('utf8', p, p + nameLen)
    p += nameLen
    const dataLen = buf.readUInt32LE(p)
    p += 4
    const data = buf.subarray(p, p + dataLen)
    p += dataLen
    entries.push({ name, data })
  }
  if (p !== buf.length) throw new Error('trailing bytes ' + (buf.length - p))
  return entries
}

function assertWholeGlb(data, name) {
  if (data.length < 12 || data.toString('latin1', 0, 4) !== 'glTF') {
    throw new Error(name + ' is not a GLB')
  }
  const declared = data.readUInt32LE(8)
  if (declared !== data.length) {
    throw new Error(`${name} length header ${declared} != file ${data.length}`)
  }
}

async function packGroup(group, outDir) {
  const manifestPath = path.join(publicDir, group.manifest)
  const urls = JSON.parse(await readFile(manifestPath, 'utf8'))
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new Error('empty manifest ' + group.manifest)
  }
  const parts = [Buffer.alloc(12)]
  parts[0].write('ANPK', 0, 'latin1')
  parts[0].writeUInt32LE(1, 4)
  parts[0].writeUInt32LE(urls.length, 8)

  const seen = new Set()
  const originals = []
  for (const url of urls) {
    const rel = String(url).replace(/^\//, '')
    const filePath = path.join(publicDir, rel)
    const base = path.basename(filePath)
    if (seen.has(base)) throw new Error('duplicate mesh name ' + base)
    seen.add(base)
    // thorax.glb and spine-360.glb are not in these manifests and are not packed.
    if (base === 'thorax.glb' || base === 'spine-360.glb') {
      throw new Error('refusing to pack unused asset ' + base)
    }
    const file = await readFile(filePath)
    assertWholeGlb(file, base)
    const name = Buffer.from(base, 'utf8')
    if (name.length > 65535) throw new Error('name too long ' + base)
    const head = Buffer.alloc(2 + name.length + 4)
    head.writeUInt16LE(name.length, 0)
    name.copy(head, 2)
    head.writeUInt32LE(file.length, 2 + name.length)
    parts.push(head, file)
    originals.push({ name: base, file })
  }

  const packed = Buffer.concat(parts)
  const outPath = path.join(outDir, group.name + '.pack')
  await writeFile(outPath, packed)

  const readBack = readPack(await readFile(outPath))
  if (readBack.length !== originals.length) {
    throw new Error(group.name + ' count mismatch')
  }
  for (let i = 0; i < originals.length; i++) {
    const got = readBack[i]
    const want = originals[i]
    if (got.name !== want.name || Buffer.compare(got.data, want.file) !== 0) {
      throw new Error(group.name + ' byte mismatch at ' + want.name)
    }
  }
  const sha = createHash('sha256').update(packed).digest('hex')
  return { name: group.name, count: originals.length, bytes: packed.length, sha }
}


/** Production dist does not need the individual packed GLBs (or unused leftovers). */
export async function omitLoosePackedGlbs(modelsDir) {
  const extra = path.join(modelsDir, 'extra')
  async function walk(dir) {
    let entries = []
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) await walk(full)
      else if (entry.name.endsWith('.glb')) await unlink(full)
    }
  }
  await walk(extra)
  for (const leftover of ['thorax.glb', 'spine-360.glb']) {
    await rm(path.join(modelsDir, leftover), { force: true })
  }
}

export async function writeModelPacks(outDir) {
  await mkdir(outDir, { recursive: true })
  const stats = []
  for (const group of GROUPS) stats.push(await packGroup(group, outDir))
  // Guard: a stray rewrite must not drop a pack.
  const names = new Set((await readdir(outDir)).filter((n) => n.endsWith('.pack')))
  for (const group of GROUPS) {
    if (!names.has(group.name + '.pack')) throw new Error('missing ' + group.name + '.pack')
  }
  const id = createHash('sha256')
    .update(stats.map((stat) => stat.name + ':' + stat.sha + ':' + stat.bytes).join('|'))
    .digest('hex')
    .slice(0, 20)
  await writeFile(path.join(outDir, 'revision.json'), JSON.stringify({ id }) + '\n')
  for (const stat of stats) {
    console.info(
      '[pack]',
      stat.name,
      stat.count,
      'files',
      (stat.bytes / (1024 * 1024)).toFixed(2) + 'MB',
      'original bytes',
    )
  }
  console.info('[pack] revision', id)
  return stats
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (invokedDirectly) {
  const outDir = process.argv[2]
  if (!outDir) {
    console.error('usage: node scripts/pack-models.mjs <outDir>')
    process.exit(1)
  }
  await writeModelPacks(path.resolve(outDir))
}
