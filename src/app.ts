import { createSSRApp } from 'vue'
import type { RouterHistory } from 'vue-router'
import App from './App.vue'
import { makeRouter } from './router'
import './assets/fonts'
import './assets/main.css'

// Shared by the browser entry (hydration) and the build-time prerender.
export function createApp(history: RouterHistory) {
  const app = createSSRApp(App)
  const router = makeRouter(history)
  app.use(router)
  return { app, router }
}
