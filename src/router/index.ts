import { createRouter, type RouterHistory, type RouteRecordRaw } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'
import SupportPage from '@/pages/SupportPage.vue'
import SponsorIntroPage from '@/pages/SponsorIntroPage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    noindex?: boolean
  }
}

export const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomePage },
  {
    path: '/support',
    name: 'support',
    component: SupportPage,
    meta: {
      title: 'Support the project',
      description:
        'Help bring SignerScope, a detector for spy implants in hardware wallets, from proof of concept to a certified device. Sponsor via GitHub, crypto or directly.',
    },
  },
  {
    // Private page shared directly with prospective sponsors: not linked, not indexed.
    path: '/sponsor-intro',
    name: 'sponsor-intro',
    component: SponsorIntroPage,
    meta: {
      title: 'Sponsor introduction',
      description:
        'How to sponsor SignerScope, the device-agnostic detector for spy implants in hardware wallets: what it funds, how it works and how to get in touch.',
      noindex: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundPage,
    meta: { title: 'Page not found', noindex: true },
  },
]

export function makeRouter(history: RouterHistory) {
  return createRouter({
    history,
    routes,
    scrollBehavior(to, _from, saved) {
      if (saved) return saved
      if (to.hash) return { el: to.hash, behavior: 'smooth', top: 72 }
      return { top: 0 }
    },
  })
}
