# Deployment Guide

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Last Updated**: 2026-03-25

---

## Overview

This is a local learning/experimentation project. No production deployment is planned. This guide covers local dev, build verification, and basic hosting options if needed.

---

## Prerequisites

- Node.js 18+
- pnpm

---

## Local Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Hot reload enabled via Next.js Fast Refresh.

---

## Production Build (local verification)

```bash
pnpm build
pnpm start
```

Verifies the build compiles without errors and runs at [http://localhost:3000](http://localhost:3000).

---

## Lint

```bash
pnpm lint
```

Uses ESLint with `eslint-config-next`. No custom rules configured.

---

## Static Export (optional)

Next.js App Router supports static export. Add to `next.config.ts`:

```ts
const nextConfig = {
  output: "export",
};
export default nextConfig;
```

Then `pnpm build` produces a `out/` directory servable from any static host (Netlify, GitHub Pages, S3).

Note: Locomotive Scroll uses browser APIs — ensure `"use client"` is present on all components using it (already done).

---

## Vercel (optional)

Connect repo to Vercel. No additional configuration needed — Next.js is auto-detected. All images served via `next/image` work out of the box on Vercel's CDN.

---

## Environment Variables

None required. All content is static.

---

## Known Build Considerations

- All animation components are `"use client"` — no SSR conflicts with GSAP/browser APIs
- Locomotive Scroll is dynamically imported (`await import("locomotive-scroll")`) in `page.tsx` to avoid SSR evaluation
- `next/image` handles all image optimization at build time or on-demand (Vercel)
