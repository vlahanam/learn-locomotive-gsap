# System Architecture

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Last Updated**: 2026-03-25

---

## Overview

Single-page Next.js application using App Router. No backend, no API routes, no database. All content hardcoded in JSX; images are static assets.

---

## Stack

```
Browser
  └── Next.js 16 (App Router, SSR shell + client hydration)
        ├── React 19 (all interactive components are "use client")
        ├── GSAP 3.14 + ScrollTrigger
        ├── Locomotive Scroll 5 (passive, no ScrollerProxy)
        ├── Tailwind CSS 4
        └── next/font (Roboto Slab)
```

---

## Rendering Model

```
layout.tsx          (server component — font + html/body wrapper)
  └── page.tsx      (client component — LocomotiveScroll init + renders Demo)
        └── Demo    (client — orchestrator)
              ├── SectionContentReveal   (client — hero + pinned scroll)
              └── SectionStorytelling    (client — 10-chapter narrative)
                    └── ImageLightbox    (client — conditional overlay)
```

`layout.tsx` is the only server component. All animation components are client-only because they use `useRef`, `useLayoutEffect`, and browser APIs (GSAP, ScrollTrigger, matchMedia).

---

## Component Architecture

```
Demo/
├── Demo.tsx                  # Renders SectionContentReveal then SectionStorytelling
├── section-content-reveal.tsx # Self-contained: hero + pinned scroll, own GSAP contexts
├── section-storytelling.tsx  # Self-contained: 10 chapters, single gsap.context
├── image-lightbox.tsx        # Overlay portal, driven by SectionStorytelling state
└── styles.module.css
```

Each component owns its animation setup and cleanup. No shared animation state between components.

---

## Animation Architecture

### SectionContentReveal

Five `useLayoutEffect` hooks, each a separate `gsap.context`:

```
useLayoutEffect 1 — title stagger (immediate, no ScrollTrigger)
useLayoutEffect 2 — image pop-in + hover listeners
useLayoutEffect 3 — section2 horizontal line + star ornament
useLayoutEffect 4 — section2 col entrance (y slide-up)
useLayoutEffect 5 — section2 pin + image scroll (pin:true, scrub:1)
```

### SectionStorytelling

Single `useLayoutEffect`, single `gsap.context(fn, sectionRef)`:

```
gsap.context
  ├── Hero: char flip (rotationX), subtitle fade, decorative lines, star spin
  ├── Ch1:  parallax inner + grayscale scrub
  ├── Ch2:  slide text/image + parallax
  ├── Ch3:  clip-path wipe
  ├── Ch4:  full-bleed grayscale scrub + overlay
  ├── Ch5:  slide-left + sepia scrub
  ├── Ch6:  drop + blur-clear
  ├── Ch7:  radial clip reveal + sepia scrub
  ├── Ch8:  book-open (rotationY scrub, no text helpers)
  ├── Ch9:  spin-rotate
  ├── Ch10: split-tear (x scrub, no text helpers)
  ├── Ch11: fade-up + end-star
  └── shared: animTitleWords, animBody, animDecLine
```

### ImageLightbox

Standalone GSAP timelines (no ScrollTrigger). Opens by morphing from `sourceRect` coordinates; closes with reverse. Uses `isAnimatingRef` guard and `tlRef.current?.kill()` to prevent overlap.

---

## Scroll Architecture

### Active

Native browser scroll. GSAP ScrollTrigger reads `window.scrollY`.

Locomotive Scroll v5 instance created in `page.tsx` `useEffect` (async import). Runs its own momentum layer but is **not** proxied to ScrollTrigger — both operate independently.

### Planned (not implemented)

Full integration via `ScrollTrigger.scrollerProxy()` so ScrollTrigger reads Locomotive Scroll's virtual position instead of native scroll. Requires:

1. `scrollerProxy` setup on container element
2. `scroll.on("scroll", ScrollTrigger.update)`
3. `ScrollTrigger.addEventListener("refresh", () => scroll.update())`

---

## Data Flow

```
Static images (public/images/, public/svg/)
  └── next/image → WebP/AVIF + responsive srcset → browser

STORY_CHAPTERS (module-level const array in section-storytelling.tsx)
  └── mapped to chapter JSX + drives ImageLightbox data

User scroll event
  └── ScrollTrigger reads scroll position
        └── GSAP tweens DOM element CSS properties → browser paint

User clicks story image
  └── SectionStorytelling setState (lightboxData, lightboxRect)
        └── ImageLightbox renders → animateIn() via requestAnimationFrame
```

---

## Asset Pipeline

Images served from `public/images/` via Next.js static serving. `next/image` provides automatic WebP/AVIF conversion, responsive srcset, and layout shift prevention. `loading="eager"` used for above-the-fold images; `priority` for pinned section images.

---

## Styling Architecture

```
Tailwind CSS v4
  ├── globals.css          @import "tailwindcss" + CSS variables
  └── styles.module.css    per-component scoped CSS (minimal use)

No global component library. Layout via Tailwind utilities inline.
Responsive breakpoints: sm (640) / md (768) / lg (1024) / xl (1280).
```

---

## Font Architecture

Roboto Slab loaded via `next/font/google` in `layout.tsx`. Applied as `className` on `<html>`. Includes `vietnamese` subset for diacritic rendering. Geist/Geist_Mono imported but not applied.

---

## File Serving

```
/          → src/app/page.tsx → renders Demo
/images/*  → public/images/* (static)
/svg/*     → public/svg/* (static)
/_next/*   → Next.js compiled assets
```

---

## Known Architectural Notes

- Locomotive Scroll instance in `page.tsx` is never assigned to a variable — no `destroy()` called on unmount. Acceptable for a single-page learning project.
- `section1/` and `section2/` subdirs inside `Demo/` are empty placeholders, not yet used.
- Legacy components (`LearnGsap`, `LearnLocomotiveScroll`) remain in `src/components/` but are not imported anywhere.
- No shared animation state or context between components — each manages its own `gsap.context` lifecycle.
