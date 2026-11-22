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
        Proof of concept complete; the SignerScope device is in development. See the limits for
        what a green result does and does not cover.
      </p>
      <RouterLink to="/support" class="support">Support the project →</RouterLink>
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

.support {
  color: var(--signal);
  font-weight: 600;
  text-decoration: none;
}
</style>
