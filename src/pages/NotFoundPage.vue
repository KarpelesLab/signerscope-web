<template>
  <section class="nf wrap">
    <p class="eyebrow">404 · no signal</p>
    <h1>Nothing resonates at this address.</h1>
    <RouterLink to="/" class="btn primary">Back to the home page</RouterLink>
  </section>
</template>

<style scoped>
.nf {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
}

h1 {
  font-size: clamp(32px, 5vw, 52px);
}
</style>
