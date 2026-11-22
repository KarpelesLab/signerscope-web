// Central place for links and facts that appear across the site.
export const site = {
  name: 'SignerScope',
  url: 'https://signerscope.com',
  tagline: 'Find the antenna that shouldn’t be there',
  description:
    'SignerScope is an open-hardware RF detector that finds hidden cellular spy implants in hardware wallets. A TEM cell sweep flags the absorption notch of an implanted LTE antenna.',
  // Bump ?v= after changing the image so social networks fetch it again.
  ogImage: '/og.png?v=2',
  sponsorUrl: 'https://github.com/sponsors/KarpelesLab',
  contacts: [
    { label: 'X', handle: '@MagicalTux', url: 'https://x.com/MagicalTux', note: 'Direct message' },
    { label: 'Telegram', handle: '@mkarpeles', url: 'https://t.me/mkarpeles', note: 'Message' },
    { label: 'Email', handle: 'mark@klb.jp', url: 'mailto:mark@klb.jp?subject=SignerScope', note: 'Write' },
  ],
  themeColor: '#0c1110',
  company: { name: 'Karpeles Lab Inc.', city: 'Tokyo', country: 'JP', countryName: 'Japan' },
  founder: { name: 'Mark Karpeles', x: 'https://x.com/MagicalTux' },
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
    logoLight: '/partners/onekey-black.svg?v=1',
    logoDark: '/partners/onekey-white.svg?v=1',
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
    // Bump ?v= after re-encoding so the Cloudflare cache picks up the new files.
    src: `/video/implant-explainer.${v.lang}.mp4?v=1`,
    poster: `/video/poster.${v.lang}.webp?v=1`,
  })) as ExplainerVideo[],
}

// What sponsorship pays for (shown on /support and /sponsor-intro).
export const fundingNeeds = [
  {
    title: 'Prototype runs',
    body: 'Board fabrication and assembly for each revision, plus the cell parts, until the design is final.',
  },
  {
    title: 'Test equipment',
    body: 'RF instruments to characterise the on-board sweep and check every unit against a known reference.',
  },
  {
    title: 'Every wallet, every revision',
    body: 'Confirming a genuine wallet needs its measured profile, so the library needs every wallet and signer on the market, in every hardware revision, plus tampered samples.',
  },
  {
    title: 'Certification',
    body: 'EMC and radio compliance testing for CE marking in the EU and FCC authorisation in the US, so the device can be sold.',
  },
]

export function pageTitle(title?: string) {
  return title ? `${title} · ${site.name}` : `${site.name}: hardware wallet spy implant detector`
}
