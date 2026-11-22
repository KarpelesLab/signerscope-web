// Central place for links and facts that appear across the site.
export const site = {
  name: 'SignerScope',
  url: 'https://signerscope.com',
  tagline: 'Find the antenna that shouldn’t be there',
  description:
    'SignerScope is an open-hardware RF detector that finds hidden cellular spy implants in hardware wallets. A TEM cell sweep flags the absorption notch of an implanted LTE antenna.',
  ogImage: '/og.png',
  themeColor: '#0c1110',
} as const

export function pageTitle(title?: string) {
  return title ? `${title} · ${site.name}` : `${site.name}: hardware wallet spy implant detector`
}
