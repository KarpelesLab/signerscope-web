# signerscope-web

Website for [SignerScope](https://signerscope.com), an open-hardware RF detector for implanted
antennas in hardware wallets. The hardware and firmware live in
[KarpelesLab/ledger_implant_detector](https://github.com/KarpelesLab/ledger_implant_detector).

Vue 3 + Vite + TypeScript, deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build to dist/, copy index.html to 404.html (SPA fallback)
npm run preview    # serve dist/
```

## Layout

```
src/site.ts            links and names used across the site
src/pages/             routed pages (HomePage, NotFoundPage)
src/components/        header, footer, the sweep chart
src/assets/main.css    design tokens (dark/light) and global styles
public/                copied as-is: CNAME, favicon, board renders in img/
```

## Deploy

`.github/workflows/deploy.yml` builds every push and pull request, and deploys `master` to GitHub
Pages. `public/CNAME` sets the custom domain `signerscope.com`.
