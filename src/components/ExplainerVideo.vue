<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { explainer } from '@/site'

const videos = explainer.videos
const lang = ref(videos[0]!.lang)
const current = computed(() => videos.find((v) => v.lang === lang.value) ?? videos[0]!)

// The prerendered page shows English; switch to the visitor's language once in the browser.
onMounted(() => {
  for (const l of navigator.languages ?? [navigator.language]) {
    const match = videos.find((v) => l.toLowerCase().startsWith(v.lang))
    if (match) {
      lang.value = match.lang
      return
    }
  }
})
</script>

<template>
  <figure class="explainer">
    <div class="langs" role="tablist" aria-label="Narration language">
      <button
        v-for="v in videos"
        :key="v.lang"
        type="button"
        role="tab"
        :lang="v.lang"
        :aria-selected="v.lang === lang"
        :class="{ on: v.lang === lang }"
        @click="lang = v.lang"
      >
        {{ v.label }}
      </button>
    </div>
    <div class="frame">
      <video
        :key="current.lang"
        :lang="current.lang"
        :poster="current.poster"
        :aria-label="current.title"
        controls
        playsinline
        preload="none"
        width="1920"
        height="1080"
      >
        <source :src="current.src" type="video/mp4" />
      </video>
    </div>
    <figcaption>
      <span :lang="current.lang">{{ current.title }}</span>
      <span class="credit">
        Animation by
        <a :href="explainer.creditUrl" target="_blank" rel="noopener">{{ explainer.credit }}</a>
      </span>
    </figcaption>
  </figure>
</template>

<style scoped>
.explainer {
  margin: 48px 0 0;
}

.langs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 12px;
}

.langs button {
  font: inherit;
  font-size: 14px;
  padding: 6px 14px;
  border-radius: 99px;
  border: 1px solid var(--line);
  background: transparent;
  color: var(--text-dim);
  cursor: pointer;
}

.langs button:hover {
  color: var(--text);
}

.langs button.on {
  background: var(--signal);
  border-color: var(--signal);
  color: #06120c;
  font-weight: 600;
}

.frame {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 9;
}

video {
  display: block;
  width: 100%;
  height: 100%;
}

figcaption {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 24px;
  margin-top: 10px;
  font-size: 14px;
  color: var(--text-dim);
}

.credit {
  color: var(--text-faint);
}

.credit a {
  color: var(--text-dim);
}
</style>
