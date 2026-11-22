<script setup lang="ts">
import { site } from '@/site'
import BrandMark from './BrandMark.vue'
</script>

<template>
  <footer class="footer">
    <div class="wrap row">
      <div class="brand">
        <BrandMark />
        <span>{{ site.name }}</span>
      </div>
      <p class="note">
        Open hardware research prototype. Not validated: a green result is not a guarantee that a
        device is clean.
      </p>
      <div class="links">
        <a :href="site.repoUrl" target="_blank" rel="noopener">Hardware &amp; firmware</a>
        <a :href="site.webRepoUrl" target="_blank" rel="noopener">Website source</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line-soft);
  padding: 40px 0 56px;
  font-size: 14px;
  color: var(--text-faint);
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  font-weight: 700;
}

.note {
  max-width: 46ch;
}

.links {
  display: flex;
  gap: 20px;
}

.links a {
  color: var(--text-dim);
}
</style>
