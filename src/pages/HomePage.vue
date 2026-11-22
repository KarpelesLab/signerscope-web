<script setup lang="ts">
import { sponsors } from '@/site'
import SweepChart from '@/components/SweepChart.vue'
import ExplainerVideo from '@/components/ExplainerVideo.vue'

const steps = [
  {
    n: '01',
    title: 'Slide it in',
    body: 'The wallet goes into an open TEM cell: a metal septum held 20 mm above a ground plane, with tapered ramps at each end. It sets up a near-uniform field over an 80 × 80 mm test area, so the result barely depends on where the device lies.',
  },
  {
    n: '02',
    title: 'Sweep',
    body: 'One button starts a scalar sweep from 800 to 1600 MHz in 5 MHz steps. A synthesizer drives the cell, a log detector measures what comes out the other side. No VNA, no cables, no probe to position.',
  },
  {
    n: '03',
    title: 'Read the verdict',
    body: 'A tuned implant antenna absorbs energy at its resonance and leaves a narrow notch. Batteries, shields and the wallet’s own electronics only shift the sweep broadly. Green or red on the LED, details on the screen.',
  },
]

const rule = [
  ['Baseline', 'wallet sweep − empty-cell sweep'],
  ['Flatten', 'subtract a 200 MHz running median'],
  ['Search', '1.00 – 1.45 GHz'],
  ['Flag', 'notch ≥ 0.45 dB deep, 10 – 60 MHz wide'],
  ['Confirm', 're-seat and sweep again; two notches within 15 MHz → red'],
]

const results = [
  { label: 'Tampered, every placement and both orientations', value: '12 / 12 flagged', note: '0.79 – 1.02 dB at ~1171 MHz', bad: true },
  { label: 'Genuine', value: '13 / 14 clean', note: 'at most 0.24 dB; one outlier did not repeat', bad: false },
  { label: 'Re-seat and repeat', value: '8 / 8 · 0 / 10', note: 'tampered pairs confirmed · genuine pairs flagged', bad: false },
]

const misses = [
  {
    title: 'Coverage still growing',
    body: 'The proof of concept targets the implants found so far. Until every antenna type is covered, a green result does not rule out every possible implant.',
  },
  {
    title: 'Implants that adapt',
    body: 'Implant makers will try to work around any detector. The firmware takes signed updates, so detection evolves as implants do, and the sweep hardware already covers 35 MHz to 4.4 GHz.',
  },
  {
    title: 'Profile library still to build',
    body: 'Antenna detection works with any device. Exact-match checks need a measured profile for each genuine wallet model; the proof of concept used a Nano X, and the library will grow from there.',
  },
]

const timeline = [
  { tag: 'rev 0.1', state: 'explored', title: 'Capacitive array + RF loop', body: 'A handheld with eight capacitive electrodes and a near-field loop for a NanoVNA. Set aside in favour of RF.' },
  { tag: 'sim', state: 'done', title: 'Electrostatic & FDTD simulations', body: 'Floating copper behind the battery is invisible capacitively, but RF shows a narrow in-band absorption that plain copper does not.' },
  { tag: '2026-10-18', state: 'done', title: 'First NanoVNA session', body: 'Resonance visible on a tampered unit, but only with the probe right over the antenna feed.' },
  { tag: '2026-10-26', state: 'proof of concept', title: 'RF fixture kit', body: 'Slot line and open TEM cell. The TEM cell sees the tampered notch at every placement and in both orientations.' },
  { tag: 'rev 0.2', state: 'built', title: 'Integrated TEM cell', body: 'The NanoVNA replaced by an on-board sweep: five boards built, with the synthesizer, detector, ADC, display and USB all working.' },
  { tag: 'rev 0.3', state: 'next', title: 'RF layout refinements', body: 'A cleaner RF layout for a flat sweep across the whole band, so the detection rule runs on the device itself.' },
  { tag: 'firmware', state: 'next', title: 'Detector firmware', body: 'Self-check, the detection rule, green/red verdict, signed updates and a HID interface for data collection.' },
  { tag: 'goal', state: 'next', title: 'Every antenna, every profile', body: 'Detection of all antenna types, and a library of measured genuine wallet profiles so a device can be confirmed as an exact match or flagged as unknown.' },
]
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="status"><span class="dot" />Proof of concept done · device in development</p>
        <h1>Find the antenna that shouldn’t be there.</h1>
        <p class="lede">
          SignerScope is an open-hardware bench tool that checks a hardware wallet for a hidden
          cellular implant. Slide the wallet in, press one button, and read the answer: a green or red
          light, with the details on screen. Under the hood, it sweeps the LTE bands for the narrow
          absorption notch a tuned implant antenna leaves behind.
        </p>
        <div class="cta">
          <RouterLink :to="{ path: '/', hash: '#how' }" class="btn primary">How it works</RouterLink>
          <RouterLink :to="{ path: '/', hash: '#results' }" class="btn">See the results</RouterLink>
        </div>
      </div>
      <SweepChart class="hero-chart" />
    </div>
  </section>

  <section id="threat" class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow">The threat</p>
        <h2>A modem hidden in the shell.</h2>
      </div>
      <div class="prose">
        <p>
          A supply-chain implant can add an LTE modem to a hardware wallet, giving an attacker a
          covert channel out of the one device that is supposed to stay offline. To reach a cell
          tower, that modem needs an antenna, and an antenna is a resonant structure that a genuine
          unit does not have.
        </p>
        <p>
          The wallet’s own copper (battery, ground plane, Bluetooth antenna, NFC coil) changes how
          RF passes through it, but broadly and smoothly. A tuned antenna absorbs sharply at its
          resonance. SignerScope looks for that difference.
        </p>
      </div>
    </div>
    <div class="wrap">
      <ExplainerVideo />
    </div>
  </section>

  <section id="how" class="section">
    <div class="wrap">
      <p class="eyebrow">How it works</p>
      <h2>No VNA, no cables, no positioning skill.</h2>
      <ol class="steps">
        <li v-for="s in steps" :key="s.n">
          <span class="n mono">{{ s.n }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.body }}</p>
        </li>
      </ol>

      <div class="rule">
        <div class="rule-head">
          <p class="eyebrow">The detection rule</p>
          <p class="rule-note">
            Needs no reference wallet. Known-wallet profiles add a second check.
          </p>
        </div>
        <dl>
          <template v-for="[k, v] in rule" :key="k">
            <dt class="mono">{{ k }}</dt>
            <dd>{{ v }}</dd>
          </template>
        </dl>
      </div>
    </div>
  </section>

  <section id="results" class="section">
    <div class="wrap">
      <p class="eyebrow">First results</p>
      <h2>One tampered unit, flagged every time.</h2>
      <p class="lede">
        NanoVNA captures through the TEM cell fixture, 2026-10-26: one genuine and one tampered
        Ledger Nano X. The implant antenna’s own S11 confirms the feature: it resonates at
        1156 – 1245 MHz depending on what surrounds it.
      </p>
      <div class="results">
        <div v-for="r in results" :key="r.label" class="result">
          <p class="value mono" :class="{ bad: r.bad }">{{ r.value }}</p>
          <p class="label">{{ r.label }}</p>
          <p class="note">{{ r.note }}</p>
        </div>
      </div>
      <p class="caveat">
        These captures set the target for the device: a sweep from 800 to 1600 MHz with at most
        0.05 dB of noise per point. The device will be characterised on many more units before
        release.
      </p>
    </div>
  </section>

  <section id="goal" class="section">
    <div class="wrap">
      <p class="eyebrow">The goal</p>
      <h2>Catch every implant. Confirm every genuine wallet.</h2>
      <p class="lede">
        Two checks, one verdict. To pass, an implant would have to hide its antenna and leave the
        wallet’s entire RF profile unchanged.
      </p>
      <ol class="layers">
        <li>
          <span class="n mono">Layer 1</span>
          <h3>Detect any antenna</h3>
          <p>
            Look for antenna signatures in any device, with no reference needed. The aim is to
            cover every antenna type, across every band an implant could use.
          </p>
        </li>
        <li>
          <span class="n mono">Layer 2</span>
          <h3>Match the known profile</h3>
          <p>
            Compare the whole sweep against a library of measured genuine wallets. An exact match
            confirms the device is what it claims to be; anything that doesn’t match is flagged as
            unknown.
          </p>
        </li>
      </ol>
    </div>
  </section>

  <section id="limits" class="section">
    <div class="wrap split">
      <div>
        <p class="eyebrow">Limits</p>
        <h2>Known limits.</h2>
        <p class="lede small">
          A detector that overclaims is worse than none. Here is what it can’t see yet, and how
          it keeps up.
        </p>
      </div>
      <ul class="misses">
        <li v-for="m in misses" :key="m.title">
          <h3>{{ m.title }}</h3>
          <p>{{ m.body }}</p>
        </li>
      </ul>
    </div>
  </section>

  <section id="hardware" class="section">
    <div class="wrap">
      <p class="eyebrow">The device</p>
      <h2>A simple box anyone can use.</h2>
      <p class="lede">
        One button to start. A green or red LED you can read from across the room. A small screen for
        the details. Inside, a single board is both the floor of the TEM cell and all of the
        electronics.
      </p>
      <div class="boards">
        <figure>
          <img src="/img/integrated_top.webp" alt="Top of the rev 0.3 board: the TEM cell ground plane with an 80 by 80 mm test area, start button, green and red LEDs and the LCD footprint" width="1100" height="1100" loading="lazy" />
          <figcaption>Top: test area, button, LEDs and screen (rev 0.3 board)</figcaption>
        </figure>
        <figure>
          <img src="/img/integrated_bottom.webp" alt="Underside of the rev 0.3 board with the RF synthesizer, log detector, ADC and Raspberry Pi Pico 2 module" width="1100" height="1100" loading="lazy" />
          <figcaption>Underside: every part lives here</figcaption>
        </figure>
      </div>
      <dl class="specs">
        <dt>Board</dt>
        <dd>200 × 216 mm, 4 layers. RF crosses through fenced vias, so there are no cables.</dd>
        <dt>Signal chain</dt>
        <dd>ADF4351 synthesizer → 10 dB pad → cell → 6 dB pad → AD8318 log detector → ADS1115 16-bit ADC</dd>
        <dt>Control</dt>
        <dd>Raspberry Pi Pico 2 (RP2350), 2″ LCD, green and red LEDs, one button, USB power and updates</dd>
        <dt>Cell</dt>
        <dd>Septum plate and ramps are separate PCBs on 20 mm nylon spacers</dd>
        <dt>Hackable</dt>
        <dd>Optional SMA ports to use the cell with a NanoVNA, a second synthesizer output, spare GPIO and ADC lines, test points on every RF block</dd>
      </dl>
    </div>
  </section>

  <section id="status" class="section">
    <div class="wrap">
      <p class="eyebrow">Status</p>
      <h2>Where the project stands.</h2>
      <ol class="timeline">
        <li v-for="t in timeline" :key="t.tag" :class="t.state.replace(/ /g, '-')">
          <span class="tag mono">{{ t.tag }}</span>
          <div>
            <h3>{{ t.title }} <span class="state mono">{{ t.state }}</span></h3>
            <p>{{ t.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>

  <section id="backers" class="section">
    <div class="wrap">
      <p class="eyebrow">Sponsors</p>
      <h2>Implants are an ecosystem problem.</h2>
      <p class="lede">
        A supply-chain implant threatens every hardware wallet maker and every user, whatever the
        brand. Turning the proof of concept into a device anyone can buy costs real money:
        prototype runs, RF test equipment, certification for the EU and US markets, and a
        reference library of every wallet and signer on the market, in every hardware revision.
        Our sponsors make that possible, and we are looking for more. Wallet makers are welcome to
        <RouterLink to="/support#makers">send their devices</RouterLink>.
      </p>
      <ul class="backers">
        <li v-for="s in sponsors" :key="s.name">
          <a :href="s.url" target="_blank" rel="nofollow noopener" :aria-label="s.name">
            <picture>
              <source :srcset="s.logoDark" media="(prefers-color-scheme: dark)" />
              <img :src="s.logoLight" :alt="s.name" width="640" height="288" loading="lazy" />
            </picture>
          </a>
          <span v-if="s.note" class="backer-note mono">{{ s.note }}</span>
        </li>
        <li class="become">
          <RouterLink to="/support">
            <span class="plus" aria-hidden="true">+</span>
            <span>Become a sponsor</span>
          </RouterLink>
        </li>
      </ul>
      <p class="independence">
        Sponsors fund the work; they have no say in how SignerScope works or in what it reports.
      </p>
    </div>
  </section>

  <section class="section join">
    <div class="wrap join-box">
      <div>
        <h2>Open hardware, once the design is final.</h2>
        <p class="lede small">
          Schematics, firmware, captures and test notes will be published once testing is complete
          and the board design is frozen.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hero */
.hero {
  padding: clamp(48px, 8vw, 96px) 0 clamp(64px, 9vw, 104px);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: center;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--signal);
  border: 1px solid color-mix(in srgb, var(--signal) 35%, transparent);
  border-radius: 99px;
  padding: 5px 12px;
  margin-bottom: 24px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--signal);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--signal) 20%, transparent);
}

h1 {
  font-size: clamp(38px, 6vw, 64px);
  font-weight: 700;
  letter-spacing: -0.035em;
}

.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

@media (max-width: 880px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

/* Shared layouts */
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

.lede.small {
  font-size: 17px;
}

h3 {
  font-size: 19px;
  font-weight: 600;
}

/* Steps */
.steps {
  list-style: none;
  padding: 0;
  margin: 48px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
}

.steps li {
  background: var(--bg-raised);
  padding: 28px;
}

.steps .n {
  color: var(--signal);
  display: block;
  margin-bottom: 18px;
}

.steps p {
  color: var(--text-dim);
  margin-top: 10px;
  font-size: 16px;
}

/* Rule */
.rule {
  margin-top: 32px;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 28px;
  background: var(--bg-sunk);
}

.rule-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4px 24px;
  margin-bottom: 12px;
}

.rule-head .eyebrow {
  margin: 0;
}

.rule-note {
  color: var(--text-faint);
  font-size: 14px;
}

.rule dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  margin: 0;
}

.rule dt,
.rule dd {
  padding: 12px 0;
  border-top: 1px solid var(--line-soft);
  margin: 0;
}

.rule dt {
  color: var(--text-faint);
  padding-right: 28px;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.08em;
  line-height: 1.9;
}

/* Results */
.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.result {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 24px;
  background: var(--bg-raised);
}

.result .value {
  font-size: 26px;
  font-weight: 500;
  color: var(--signal);
  letter-spacing: -0.02em;
}

.result .value.bad {
  color: var(--alert);
}

.result .label {
  margin-top: 10px;
  font-weight: 600;
  font-size: 15px;
}

.result .note {
  color: var(--text-faint);
  font-size: 14px;
  margin-top: 4px;
}

.caveat {
  margin-top: 24px;
  color: var(--text-faint);
  font-size: 14px;
  max-width: 70ch;
  border-left: 2px solid var(--warn);
  padding-left: 14px;
}

/* Goal */
.layers {
  list-style: none;
  padding: 0;
  margin: 40px 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.layers li {
  border: 1px solid var(--line);
  border-top: 3px solid var(--signal);
  border-radius: var(--radius);
  background: var(--bg-raised);
  padding: 28px;
}

.layers .n {
  display: block;
  color: var(--signal);
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.layers p {
  color: var(--text-dim);
  font-size: 16px;
  margin-top: 10px;
}

/* Misses */
.misses {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}

.misses li {
  border: 1px solid var(--line);
  border-left: 3px solid var(--alert);
  border-radius: var(--radius);
  padding: 20px 22px;
  background: var(--bg-raised);
}

.misses p {
  color: var(--text-dim);
  margin-top: 6px;
  font-size: 16px;
}

/* Hardware */
.boards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.boards figure {
  margin: 0;
}

.boards img {
  width: 100%;
  height: auto;
  border-radius: var(--radius);
  border: 1px solid var(--line);
}

.boards figcaption {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-faint);
  margin-top: 10px;
}

.specs {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0 32px;
  margin: 40px 0 0;
}

.specs dt,
.specs dd {
  margin: 0;
  padding: 14px 0;
  border-top: 1px solid var(--line-soft);
}

.specs dt {
  font-weight: 600;
}

.specs dd {
  color: var(--text-dim);
}

@media (max-width: 560px) {
  .specs,
  .rule dl {
    grid-template-columns: 1fr;
  }
  .specs dd,
  .rule dd {
    border-top: 0;
    padding-top: 0;
  }
}

/* Timeline */
.timeline {
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
}

.timeline li {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 24px;
  padding: 20px 0;
  border-top: 1px solid var(--line-soft);
}

.timeline .tag {
  color: var(--text-faint);
  padding-top: 2px;
}

.timeline h3 {
  font-size: 17px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.timeline p {
  color: var(--text-dim);
  font-size: 16px;
  margin-top: 4px;
}

.state {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 2px 8px;
  border-radius: 99px;
  border: 1px solid var(--line);
  color: var(--text-faint);
}

.done .state,
.built .state {
  color: var(--signal);
  border-color: color-mix(in srgb, var(--signal) 40%, transparent);
}

.proof-of-concept .state {
  color: #06120c;
  background: var(--signal);
  border-color: var(--signal);
}

.next .state {
  color: var(--warn);
  border-color: color-mix(in srgb, var(--warn) 40%, transparent);
}

@media (max-width: 560px) {
  .timeline li {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

/* Backers */
.backers {
  list-style: none;
  margin: 40px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.backers li {
  position: relative;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--bg-raised);
  aspect-ratio: 16 / 8;
  transition: border-color 0.15s;
}

.backers li:hover {
  border-color: var(--signal-dim);
}

.backers a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 8px 24px;
  text-decoration: none;
}

.backers img {
  width: 100%;
  max-width: 240px;
  height: auto;
}

.backer-note {
  position: absolute;
  top: 12px;
  left: 14px;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--signal);
}

.backers .become {
  border-style: dashed;
  background: transparent;
}

.become a {
  flex-direction: column;
  gap: 6px;
  color: var(--text-dim);
  font-weight: 600;
  font-size: 15px;
}

.become .plus {
  font-size: 28px;
  font-weight: 400;
  line-height: 1;
  color: var(--signal);
}

.independence {
  margin-top: 24px;
  color: var(--text-faint);
  font-size: 14px;
  border-left: 2px solid var(--signal);
  padding-left: 14px;
  max-width: 70ch;
}

/* Join */
.join-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px 48px;
}
</style>
