/** Prefix a public-path URL with Vite's base (localhost and GitHub Pages). */
export function assetUrl(path: string): string {
  const clean = path.replace(/^\//, '')
  const base = import.meta.env?.BASE_URL ?? '/'
  return `${base}${clean}`
}
