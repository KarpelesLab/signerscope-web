// Build-time prerender: renders each route of the client build to static HTML so crawlers
// and link previews get the full content and head tags without running JavaScript.
import { readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const ssrDir = resolve(root, 'dist-ssr')
const siteUrl = 'https://signerscope.com'

// Indexable pages go in the sitemap; 404.html is GitHub Pages' fallback for unknown paths.
const pages = [
  { url: '/', file: 'index.html', sitemap: true },
  // GitHub Pages serves support.html at /support (no trailing-slash redirect).
  { url: '/support', file: 'support.html', sitemap: true },
  { url: '/sponsor-intro', file: 'sponsor-intro.html', sitemap: false },
  { url: '/404', file: '404.html', sitemap: false },
]

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')

// Preload the latin subsets of the two variable fonts used above the fold.
const assets = readdirSync(resolve(dist, 'assets'))
const preloads = assets
  .filter((f) => /^(instrument-sans|jetbrains-mono)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ')

for (const page of pages) {
  const { html, head } = await render(page.url)
  const out = template
    .replace('<!--app-head-->', [head, preloads].filter(Boolean).join('\n    '))
    .replace('<!--app-html-->', html)
  writeFileSync(resolve(dist, page.file), out)
  console.log(`prerendered ${page.url} -> dist/${page.file}`)
}

const lastmod = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => p.sitemap)
  .map((p) => `  <url>\n    <loc>${siteUrl}${p.url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
console.log('wrote dist/sitemap.xml')

rmSync(ssrDir, { recursive: true, force: true })
