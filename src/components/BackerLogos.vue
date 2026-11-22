<script setup lang="ts">
import { sponsors } from '@/site'
</script>

<template>
  <ul class="logos">
    <li v-for="s in sponsors" :key="s.name">
      <a :href="s.url" target="_blank" rel="nofollow noopener" :aria-label="s.name">
        <picture>
          <source :srcset="s.logoDark" media="(prefers-color-scheme: dark)" />
          <img :src="s.logoLight" :alt="s.name" width="640" height="288" loading="lazy" />
        </picture>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.logos {
  list-style: none;
  padding: 0;
  margin: 8px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.logos a {
  display: block;
  width: 220px;
}

.logos img {
  width: 100%;
  height: auto;
}
</style>
