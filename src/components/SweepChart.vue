<script setup lang="ts">
// Illustrative residual sweep: wallet minus empty cell, minus a running median.
// Shapes follow the 2026-10-26 TEM cell captures (tampered Nano X: ~1 dB, ~40 MHz wide
// notch at 1171 MHz; genuine: within ~0.2 dB). The noise is synthetic.

const W = 640
const H = 300
const pad = { l: 46, r: 14, t: 18, b: 34 }
const f0 = 800
const f1 = 1600
const yMax = 0.4
const yMin = -1.4

const x = (f: number) => pad.l + ((f - f0) / (f1 - f0)) * (W - pad.l - pad.r)
const y = (db: number) => pad.t + ((yMax - db) / (yMax - yMin)) * (H - pad.t - pad.b)

function rng(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0
    return seed / 2 ** 32 - 0.5
  }
}

function trace(seed: number, notch: boolean) {
  const r = rng(seed)
  const pts: string[] = []
  let drift = 0
  for (let f = f0; f <= f1; f += 5) {
    drift = drift * 0.85 + r() * 0.05
    let v = drift + r() * 0.07
    if (notch) v -= 0.95 * Math.exp(-((f - 1171) ** 2) / (2 * 17 ** 2))
    pts.push(`${x(f).toFixed(1)},${y(v).toFixed(1)}`)
  }
  return 'M' + pts.join('L')
}

const genuine = trace(7, false)
const tampered = trace(42, true)
const xTicks = [800, 1000, 1200, 1400, 1600]
const yTicks = [0, -0.5, -1]
</script>

<template>
  <figure class="chart">
    <svg :viewBox="`0 0 ${W} ${H}`" role="img" aria-labelledby="sweep-title sweep-desc">
      <title id="sweep-title">Residual transmission through the TEM cell</title>
      <desc id="sweep-desc">
        Two sweeps from 800 to 1600 MHz. The genuine wallet stays flat within about 0.2 dB. The
        tampered wallet shows a notch about 1 dB deep at 1171 MHz, inside the 1.0 to 1.45 GHz search
        window and below the 0.45 dB threshold.
      </desc>

      <rect
        :x="x(1000)"
        :y="pad.t"
        :width="x(1450) - x(1000)"
        :height="H - pad.t - pad.b"
        class="window"
      />
      <text :x="x(1000) + 8" :y="pad.t + 16" class="label">search window</text>

      <g class="grid">
        <line v-for="t in yTicks" :key="'y' + t" :x1="pad.l" :x2="W - pad.r" :y1="y(t)" :y2="y(t)" />
        <line v-for="t in xTicks" :key="'x' + t" :x1="x(t)" :x2="x(t)" :y1="pad.t" :y2="H - pad.b" />
      </g>

      <line :x1="x(1000)" :x2="x(1450)" :y1="y(-0.45)" :y2="y(-0.45)" class="threshold" />
      <text :x="x(1450) + 6" :y="y(-0.45) + 4" class="label warn">−0.45 dB</text>

      <path :d="genuine" class="trace genuine" pathLength="1" />
      <path :d="tampered" class="trace tampered" pathLength="1" />

      <g class="callout">
        <circle :cx="x(1171)" :cy="y(-0.97)" r="5" />
        <text :x="x(1171) + 12" :y="y(-1.05)" class="label alert">1171 MHz · −1.0 dB</text>
      </g>

      <g class="axis">
        <text v-for="t in xTicks" :key="'xl' + t" :x="x(t)" :y="H - 12" text-anchor="middle">{{ t }}</text>
        <text v-for="t in yTicks" :key="'yl' + t" :x="pad.l - 8" :y="y(t) + 4" text-anchor="end">
          {{ t === 0 ? '0' : t.toFixed(1) }}
        </text>
      </g>
    </svg>
    <figcaption>
      <span class="key"><i class="sw genuine" />genuine</span>
      <span class="key"><i class="sw tampered" />tampered</span>
      <span class="unit">residual |S21|, dB · MHz</span>
    </figcaption>
  </figure>
</template>

<style scoped>
.chart {
  margin: 0;
  background: var(--bg-sunk);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 14px 14px 12px;
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 22px 22px;
}

svg {
  width: 100%;
  height: auto;
  overflow: visible;
}

.window {
  fill: color-mix(in srgb, var(--signal) 6%, transparent);
}

.grid line {
  stroke: var(--line);
  stroke-width: 1;
}

.threshold {
  stroke: var(--warn);
  stroke-dasharray: 4 4;
  stroke-width: 1.2;
}

.trace {
  fill: none;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: draw 2.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.trace.genuine {
  stroke: var(--signal);
}

.trace.tampered {
  stroke: var(--alert);
  animation-delay: 0.5s;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.callout {
  opacity: 0;
  animation: fade 0.5s ease-out 2.6s forwards;
}

.callout circle {
  fill: none;
  stroke: var(--alert);
  stroke-width: 1.5;
}

@keyframes fade {
  to {
    opacity: 1;
  }
}

.label,
.axis text {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: var(--text-faint);
}

.label.warn {
  fill: var(--warn);
}

.label.alert {
  fill: var(--alert);
}

figcaption {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 18px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-dim);
  padding: 8px 4px 0;
}

.key {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.sw {
  width: 14px;
  height: 2px;
  border-radius: 1px;
}

.sw.genuine {
  background: var(--signal);
}

.sw.tampered {
  background: var(--alert);
}

.unit {
  margin-left: auto;
  color: var(--text-faint);
}

@media (prefers-reduced-motion: reduce) {
  .trace {
    stroke-dashoffset: 0;
  }
  .callout {
    opacity: 1;
  }
}
</style>
