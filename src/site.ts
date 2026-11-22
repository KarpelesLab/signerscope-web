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

export interface ExplainerVideo {
  lang: string
  label: string
  title: string
  src: string
  poster: string
  duration: string // ISO 8601, for structured data
}

// Implant explainer animation by Tibane Labs, one widescreen cut per narration language.
export const explainer = {
  uploadDate: '2026-11-07',
  credit: 'Tibane Labs',
  creditUrl: 'https://www.tibane.net/research/ledger-nano-x-implant',
  videos: [
    { lang: 'en', label: 'English', title: 'A spy inside your hardware wallet', duration: 'PT1M48S' },
    { lang: 'fr', label: 'Français', title: 'Un espion dans votre hardware wallet', duration: 'PT1M58S' },
    { lang: 'ja', label: '日本語', title: 'ハードウェアウォレットに潜むスパイ', duration: 'PT2M27S' },
    { lang: 'ko', label: '한국어', title: '하드웨어 지갑 속의 스파이', duration: 'PT2M5S' },
  ].map((v) => ({
    ...v,
    src: `/video/implant-explainer.${v.lang}.mp4`,
    poster: `/video/poster.${v.lang}.webp`,
  })) as ExplainerVideo[],
}

export function pageTitle(title?: string) {
  return title ? `${title} · ${site.name}` : `${site.name}: hardware wallet spy implant detector`
}
