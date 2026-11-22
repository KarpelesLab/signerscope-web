<script setup lang="ts">
import { site } from '@/site'
</script>

<template>
  <ul class="contacts">
    <li v-for="c in site.contacts" :key="c.label">
      <a :href="c.url" v-bind="c.url.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}">
        <span class="label mono">{{ c.label }}</span>
        <span class="handle">{{ c.handle }}</span>
        <span class="note">{{ c.note }} →</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.contacts {
  list-style: none;
  padding: 0;
  margin: 40px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.contacts a {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-raised);
  text-decoration: none;
  color: var(--text);
  transition: border-color 0.15s;
}

.contacts a:hover {
  border-color: var(--signal-dim);
}

.label {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.handle {
  font-size: 20px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.note {
  color: var(--signal);
  font-size: 14px;
  margin-top: 6px;
}
</style>
