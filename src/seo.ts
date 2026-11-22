import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { pageTitle, site } from './site'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function jsonLd() {
  const org = {
    '@type': 'Organization',
    '@id': `${site.url}/#org`,
    name: site.name,
    url: `${site.url}/`,
    logo: `${site.url}/icon-512.png`,
  }
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      org,
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name,
        description: site.description,
        publisher: { '@id': `${site.url}/#org` },
        inLanguage: 'en',
      }
    ],
  }
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
}

// Head tags for one route, injected into the static HTML at build time.
export function headTags(route: RouteLocationNormalizedLoaded) {
  const title = pageTitle(route.meta.title)
  const description = route.meta.description ?? site.description
  const url = site.url + route.path
  const image = site.url + site.ogImage
  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
  ]
  if (route.meta.noindex) {
    tags.push('<meta name="robots" content="noindex" />')
    return tags.join('\n    ')
  }
  tags.push(
    `<link rel="canonical" href="${url}" />`,
    '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${esc(site.name + ': ' + site.tagline)}" />`,
    '<meta property="og:locale" content="en_US" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  )
  if (route.name === 'home') tags.push(jsonLd())
  return tags.join('\n    ')
}
