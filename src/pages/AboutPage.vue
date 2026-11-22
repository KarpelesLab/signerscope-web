<script setup lang="ts">
import { explainer, site } from '@/site'
import ContactList from '@/components/ContactList.vue'

const principles = [
  {
    title: 'Independent',
    body: 'Sponsors fund the work; they have no say in how SignerScope works or in what it reports.',
  },
  {
    title: 'Device-agnostic',
    body: 'SignerScope looks for antennas that shouldn’t be there, in any wallet or signer, whoever made it.',
  },
  {
    title: 'Open once it’s final',
    body: 'Schematics, firmware and test data will be published as open hardware once the design is frozen.',
  },
]
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <p class="eyebrow">About</p>
      <h1>Who builds SignerScope.</h1>
      <p class="lede">
        SignerScope is a project of {{ site.company.name }}, based in {{ site.company.city }},
        {{ site.company.countryName }}. It exists because supply-chain implants are a threat to
        every hardware wallet owner, and owners need a simple way to check their own device.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Founder</p>
        <h2>{{ site.founder.name }}</h2>
      </div>
      <div class="prose">
        <p>
          Mark is a long-standing and well-known figure in the crypto world, based in Tokyo. He
          leads SignerScope, from the RF measurements and the hardware design to the firmware.
        </p>
        <p>
          Follow the project and reach Mark on
          <a :href="site.founder.x" target="_blank" rel="noopener">X (@MagicalTux)</a>.
        </p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Company</p>
        <h2>{{ site.company.name }}</h2>
      </div>
      <dl class="facts">
        <dt>Location</dt>
        <dd>{{ site.company.city }}, {{ site.company.countryName }}</dd>
        <dt>Project</dt>
        <dd>SignerScope, a detector for spy implants in hardware wallets</dd>
        <dt>Contact</dt>
        <dd><a href="mailto:mark@klb.jp?subject=SignerScope">mark@klb.jp</a></dd>
      </dl>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Principles</p>
      <h2>How we work.</h2>
      <ul class="grid">
        <li v-for="p in principles" :key="p.title">
          <h3>{{ p.title }}</h3>
          <p>{{ p.body }}</p>
        </li>
      </ul>
      <p class="credits">
        Explainer animation by
        <a :href="explainer.creditUrl" target="_blank" rel="noopener">{{ explainer.credit }}</a>.
        Funded with the help of our <RouterLink :to="{ path: '/', hash: '#backers' }">sponsors</RouterLink>.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Contact</p>
      <h2>Get in touch.</h2>
      <ContactList />
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: clamp(48px, 8vw, 96px) 0 clamp(56px, 8vw, 88px);
}

h1 {
  font-size: clamp(36px, 5.5vw, 60px);
  font-weight: 700;
  letter-spacing: -0.035em;
}

h3 {
  font-size: 18px;
  font-weight: 600;
}

.split {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: clamp(24px, 5vw, 72px);
}

@media (max-width: 800px) {
  .split {
    grid-template-columns: minmax(0, 1fr);
  }
}

.prose {
  display: grid;
  gap: 18px;
  color: var(--text-dim);
  font-size: 18px;
}

.facts {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0 28px;
  margin: 0;
}

.facts dt,
.facts dd {
  margin: 0;
  padding: 14px 0;
  border-top: 1px solid var(--line-soft);
}

.facts dt {
  font-weight: 600;
}

.facts dd {
  color: var(--text-dim);
}

.grid {
  list-style: none;
  padding: 0;
  margin: 40px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.grid li {
  border: 1px solid var(--line);
  border-top: 3px solid var(--signal);
  border-radius: var(--radius);
  background: var(--bg-raised);
  padding: 24px;
}

.grid p {
  color: var(--text-dim);
  font-size: 16px;
  margin-top: 8px;
}

.credits {
  margin-top: 24px;
  color: var(--text-faint);
  font-size: 14px;
}
</style>
