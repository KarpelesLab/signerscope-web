<script setup lang="ts">
import { fundingNeeds, site } from '@/site'
import ContactList from '@/components/ContactList.vue'
import BackerLogos from '@/components/BackerLogos.vue'

const steps = [
  {
    title: 'Get in touch',
    body: 'Message Mark on X, Telegram or by email. Tell us who you are and what kind of support you have in mind.',
  },
  {
    title: 'Agree on the form',
    body: 'One-off or recurring, any size. We work out together what fits your organisation.',
  },
  {
    title: 'Contribute',
    body: 'Through GitHub Sponsors, in crypto (we send you an address on request), or on invoice.',
  },
  {
    title: 'Send your logo',
    body: 'SVG preferred, with a light and a dark (or monochrome) version, plus the link you want it to point to.',
  },
  {
    title: 'Get listed',
    body: 'Your logo appears with the other sponsors on signerscope.com, unless you prefer to stay anonymous.',
  },
]

const benefits = [
  {
    title: 'Your name on the project',
    body: 'Logo and link in the sponsor sections of signerscope.com, if you wish to be named.',
  },
  {
    title: 'Your devices in the library',
    body: 'Wallet makers can send every model and hardware revision they ship, so their customers can confirm that a genuine unit matches the design exactly.',
  },
  {
    title: 'A safer ecosystem',
    body: 'An implant found in one brand’s device damages trust in all of them. A detector anyone can use protects every maker and every user.',
  },
]
</script>

<template>
  <section class="hero">
    <div class="wrap">
      <p class="eyebrow">Sponsor introduction</p>
      <h1>Sponsoring SignerScope</h1>
      <p class="lede">
        SignerScope is a simple bench device that detects hidden antennas, the tell-tale sign of a
        cellular spy implant, in any hardware wallet or signer. Slide the device in, press one
        button, read a green or red light. The proof of concept is done; we are now building the
        device and need sponsors to bring it to market.
      </p>
      <div class="cta">
        <a href="#contact" class="btn primary">Talk to us</a>
        <RouterLink :to="{ path: '/', hash: '#threat' }" class="btn">Watch the explainer</RouterLink>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Why it matters</p>
        <h2>Implants are an ecosystem problem.</h2>
      </div>
      <div class="prose">
        <p>
          A supply-chain implant adds a cellular modem to a hardware wallet and quietly sends its
          secrets out over the mobile network. It threatens every maker and every user, whatever
          the brand.
        </p>
        <p>
          SignerScope works in two layers: it looks for antenna signatures in any device, and it
          compares the whole device against measured profiles of genuine wallets. A match confirms
          the device is what it claims to be; anything else is flagged.
        </p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">What your sponsorship funds</p>
      <h2>From proof of concept to a certified device.</h2>
      <ul class="grid needs">
        <li v-for="n in fundingNeeds" :key="n.title">
          <h3>{{ n.title }}</h3>
          <p>{{ n.body }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">What sponsors get</p>
      <h2>Visibility, and a detector that protects everyone.</h2>
      <ul class="grid">
        <li v-for="b in benefits" :key="b.title">
          <h3>{{ b.title }}</h3>
          <p>{{ b.body }}</p>
        </li>
      </ul>
      <p class="independence">
        Sponsors fund the work; they have no say in how SignerScope works or in what it reports.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">How it works</p>
      <h2>Five steps.</h2>
      <ol class="steps">
        <li v-for="(s, i) in steps" :key="s.title">
          <span class="n mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.body }}</p>
          </div>
        </li>
      </ol>
      <p class="alt">
        Prefer to give as an individual? <a :href="site.sponsorUrl" target="_blank" rel="noopener">GitHub Sponsors</a>
        takes monthly or one-time contributions by card, and every option is on the
        <RouterLink to="/support">support page</RouterLink>.
      </p>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <p class="eyebrow">Current sponsors</p>
      <BackerLogos />
    </div>
  </section>

  <section id="contact" class="section">
    <div class="wrap">
      <p class="eyebrow">Contact</p>
      <h2>Talk to Mark directly.</h2>
      <p class="lede">Reach out on whichever channel you prefer.</p>
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
}

.grid p {
  color: var(--text-dim);
  font-size: 16px;
  margin-top: 8px;
}

.needs li {
  border-top: 3px solid var(--signal);
}

.steps {
  list-style: none;
  padding: 0;
  margin: 40px 0 0;
}

.steps li {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 16px;
  padding: 20px 0;
  border-top: 1px solid var(--line-soft);
}

.steps .n {
  color: var(--signal);
  padding-top: 2px;
}

.steps p {
  color: var(--text-dim);
  font-size: 16px;
  margin-top: 4px;
}

.alt {
  margin-top: 24px;
  color: var(--text-dim);
  font-size: 15px;
}

.independence {
  margin-top: 24px;
  color: var(--text-faint);
  font-size: 14px;
  border-left: 2px solid var(--signal);
  padding-left: 14px;
  max-width: 70ch;
}
</style>
