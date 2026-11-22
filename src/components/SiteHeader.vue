<script setup lang="ts">
import { site } from '@/site'
import BrandMark from './BrandMark.vue'
</script>

<template>
  <header class="header">
    <div class="wrap bar">
      <RouterLink to="/" class="brand" aria-label="SignerScope home">
        <BrandMark />
        <span>{{ site.name }}</span>
      </RouterLink>
      <nav aria-label="Main">
        <RouterLink :to="{ path: '/', hash: '#how' }">How it works</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#results' }">Results</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#status' }">Status</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#backers' }">Sponsors</RouterLink>
        <RouterLink to="/support" class="cta">Support us</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line-soft);
}

.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  text-decoration: none;
  font-weight: 700;
  letter-spacing: -0.01em;
  font-size: 18px;
}

nav {
  display: flex;
  gap: clamp(12px, 3vw, 28px);
  font-size: 15px;
}

nav a {
  color: var(--text-dim);
  text-decoration: none;
}

nav a:hover {
  color: var(--text);
}

nav .cta {
  color: var(--signal);
  font-weight: 600;
}

@media (max-width: 640px) {
  nav a:not(:first-child):not(.cta) {
    display: none;
  }
}
</style>
