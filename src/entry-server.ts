import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './app'
import { headTags } from './seo'

// Used at build time only (scripts/prerender.mjs): renders one URL to static HTML.
export async function render(url: string) {
  const { app, router } = createApp(createMemoryHistory())
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)
  const route = router.currentRoute.value
  return { html, head: headTags(route), noindex: !!route.meta.noindex }
}
