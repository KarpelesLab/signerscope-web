// Central place for links and facts that appear across the site.
export const site = {
  name: 'SignerScope',
  url: 'https://signerscope.com',
  tagline: 'Find the antenna that shouldn’t be there',
  description:
    'SignerScope is an open-hardware RF detector that finds hidden cellular spy implants in hardware wallets. A TEM cell sweep flags the absorption notch of an implanted LTE antenna.',
  ogImage: '/og.png',
  sponsorUrl: 'https://github.com/sponsors/KarpelesLab',
  themeColor: '#0c1110',
} as const

export interface Sponsor {
  name: string
  url: string
  // Monochrome logotypes per the sponsor's brand rules: dark logo on light, light logo on dark.
  logoLight: string
  logoDark: string
  note?: string
}

export const sponsors: Sponsor[] = [
  {
    name: 'OneKey',
    url: 'https://onekey.so/',
    logoLight: '/sponsors/onekey-black.svg',
    logoDark: '/sponsors/onekey-white.svg',
    note: 'First sponsor',
  },
]

export function pageTitle(title?: string) {
  return title ? `${title} · ${site.name}` : `${site.name}: hardware wallet spy implant detector`
}
