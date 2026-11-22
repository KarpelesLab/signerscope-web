<script setup lang="ts">
import { site, sponsors } from '@/site'

const costs = [
  {
    title: 'Prototype runs',
    body: 'Board fabrication and assembly for each revision, plus the cell parts, until the design is final.',
  },
  {
    title: 'Test equipment',
    body: 'RF instruments to characterise the on-board sweep and check every unit against a known reference.',
  },
  {
    title: 'Test devices',
    body: 'Genuine and tampered wallets from several makers, so the detection rule holds beyond the proof of concept.',
  },
  {
    title: 'Certification',
    body: 'EMC and radio compliance testing for CE marking in the EU and FCC authorisation in the US, so the device can be sold.',
  },
]

const ways = [
  {
    title: 'GitHub Sponsors',
    body: 'Monthly or one-time, by card. The simplest way for individuals and small teams.',
    href: site.sponsorUrl,
    action: 'Sponsor on GitHub',
    external: true,
  },
  {
    title: 'Crypto',
    body: 'Bitcoin, Ethereum and other assets are welcome. Get in touch and we’ll send you an address to use.',
    href: '#contact',
    action: 'Ask for an address',
    external: false,
  },
  {
    title: 'Company sponsorship',
    body: 'Wallet makers, exchanges, custodians: invoiced or one-off contributions of any size. Let’s talk about what fits.',
    href: '#contact',
    action: 'Get in touch',
    external: false,
  },
  {
    title: 'Devices',
    body: 'Lend or donate genuine units, or anything you suspect has been tampered with. Every new device makes the detector better.',
    href: '#contact',
    action: 'Offer a device',
    external: false,
  },
]
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <p class="eyebrow">Support SignerScope</p>
      <h1>Help every wallet owner check what’s inside.</h1>
      <p class="lede">
        Supply-chain implants are a problem for the whole hardware wallet ecosystem, whatever the
        brand. The proof of concept works. Turning it into a certified device anyone can buy takes
        funding, and we welcome new sponsors.
      </p>
      <div class="cta">
        <a href="#contact" class="btn primary">Contact us</a>
        <a :href="site.sponsorUrl" class="btn" target="_blank" rel="noopener">GitHub Sponsors</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Where the money goes</p>
      <h2>From proof of concept to a device on the shelf.</h2>
      <ul class="grid costs">
        <li v-for="c in costs" :key="c.title">
          <h3>{{ c.title }}</h3>
          <p>{{ c.body }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Ways to contribute</p>
      <h2>Pick whatever works for you.</h2>
      <ul class="grid ways">
        <li v-for="w in ways" :key="w.title">
          <h3>{{ w.title }}</h3>
          <p>{{ w.body }}</p>
          <a
            :href="w.href"
            class="more"
            v-bind="w.external ? { target: '_blank', rel: 'noopener' } : {}"
          >
            {{ w.action }} →
          </a>
        </li>
      </ul>
    </div>
  </section>

  <section id="contact" class="section">
    <div class="wrap">
      <p class="eyebrow">Contact</p>
      <h2>Talk to Mark directly.</h2>
      <p class="lede">
        Questions, crypto addresses, company sponsorship or a device to test: reach out on whichever
        channel you prefer.
      </p>
      <ul class="contacts">
        <li v-for="c in site.contacts" :key="c.label">
          <a :href="c.url" v-bind="c.url.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {}">
            <span class="label mono">{{ c.label }}</span>
            <span class="handle">{{ c.handle }}</span>
            <span class="note">{{ c.note }} →</span>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Current sponsors</p>
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
      <p class="independence">
        Sponsors fund the work; they have no say in test results or in which devices we test.
        Sponsors who wish to be named are listed on this site.
      </p>
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
  max-width: 18ch;
}

.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

h3 {
  font-size: 18px;
  font-weight: 600;
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
  border-radius: var(--radius);
  background: var(--bg-raised);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.grid p {
  color: var(--text-dim);
  font-size: 16px;
}

.costs li {
  border-top: 3px solid var(--signal);
}

.ways .more {
  margin-top: auto;
  padding-top: 12px;
  font-weight: 600;
  font-size: 15px;
  text-decoration: none;
}

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

.contacts .label {
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-faint);
}

.contacts .handle {
  font-size: 20px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

.contacts .note {
  color: var(--signal);
  font-size: 14px;
  margin-top: 6px;
}

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

.independence {
  margin-top: 16px;
  color: var(--text-faint);
  font-size: 14px;
  border-left: 2px solid var(--signal);
  padding-left: 14px;
  max-width: 70ch;
}
</style>
