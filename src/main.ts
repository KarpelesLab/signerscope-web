import { createWebHistory } from 'vue-router'
import { createApp } from './app'
import { pageTitle, site } from './site'

const { app, router } = createApp(createWebHistory(import.meta.env.BASE_URL))

router.afterEach((to) => {
  document.title = pageTitle(to.meta.title)
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', to.meta.description ?? site.description)
})

router.isReady().then(() => app.mount('#app'))
