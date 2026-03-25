# System Architecture

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Last Updated**: 2026-03-25

---

## Overview

A single-page Next.js application using the App Router. Renders one active demo component at a time. No backend, no API routes, no database.

---

## Stack

```
Browser
  └── Next.js 16 (App Router, SSR/SSG)
        ├── React 19 (client components)
        ├── GSAP 3.14 + ScrollTrigger
        ├── Locomotive Scroll 5 (inactive)
        ├── Tailwind CSS 4
        └── next/font (Roboto Slab, Geist)
```

---

## Rendering Model

All animation-heavy components are client components (`"use client"`). The root `page.tsx` is also marked client because it directly imports `LearnGsap`.

`layout.tsx` is a server component (default in App Router). It applies the font className and wraps content in `<html>` + `<body>`.

```
layout.tsx (server)
  └── page.tsx (client)
        └── LearnGsap (client)
```

---

## Component Architecture

```
src/
└── components/
    ├── LearnGsap/           # Active: GSAP ScrollTrigger demo
    └── LearnLocomotiveScroll/  # Inactive: Locomotive Scroll demo
```

Only one demo component is rendered at a time. Switching is done manually in `page.tsx` by commenting/uncommenting the import.

---

## Animation Architecture (LearnGsap)

```
useLayoutEffect (runs after paint)
  ├── gsap.registerPlugin(ScrollTrigger)
  ├── gsap.context() → ctxIntro
  │     ├── gsap.fromTo(textSlideIntroRef)   # entrance animation
  │     └── gsap.to(textSlideIntroRef)       # scroll-out (scrub)
  │           └── scrollTrigger on slideIntroRef
  └── gsap.context() → ctxContent1
        ├── gsap.set([images], initial state)
        ├── gsap.set([texts], initial state)
        └── gsap.timeline()
              ├── scrollTrigger on slideContent1Ref
              └── sequential + parallel tweens

cleanup (return fn)
  ├── ctxIntro.revert()
  └── ctxContent1.revert()
```

**Two animation styles used**:
1. **Scrub**: Text exits on scroll proportionally — no timeline, `scrub:true`
2. **Toggle**: Content slide plays/reverses on enter/leave viewport — `toggleActions:"play none none reverse"`

---

## Scroll Architecture

### Current (LearnGsap)

Uses native browser scroll. GSAP ScrollTrigger reads native scroll position. `data-scroll-container` and `data-scroll-section` attributes exist on the DOM but are not active (no Locomotive Scroll instance initialized).

### Planned (LearnLocomotiveScroll)

Locomotive Scroll takes over scrolling by intercepting native scroll events. Requires:
1. Instance initialized in `useEffect` on the container ref
2. Integration with GSAP ScrollTrigger via `ScrollTrigger.scrollerProxy()` if combining both

---

## Asset Pipeline

Images served from `public/images/` via Next.js static serving. `next/image` provides:
- Automatic WebP/AVIF conversion
- Responsive srcset generation
- Lazy loading (overridden with `loading="eager"` for above-fold images)
- Layout shift prevention via placeholder

---

## Styling Architecture

```
Tailwind CSS v4 (utility classes)
  ├── globals.css       # @import "tailwindcss", CSS variables
  └── styles.module.css # per-component scoped CSS (textSlideIntroRefShadow)
```

No global component library. All layout done with Tailwind utilities inline.

---

## Font Architecture

Roboto Slab loaded via `next/font/google` in `layout.tsx`. Applied as `className` on `<html>`. Includes `vietnamese` subset for correct diacritic rendering.

Geist and Geist_Mono are imported but not applied to any element.

---

## Data Flow

No external data. All content is hardcoded in JSX. Images are static assets.

```
Static images (public/images/)
  └── next/image → optimized delivery → browser

GSAP animations
  └── read DOM refs → animate CSS properties → browser paint
```

---

## File Serving

```
/               → src/app/page.tsx → renders LearnGsap
/images/*       → public/images/* (static)
/_next/*        → Next.js compiled assets
```

---

## Known Architectural Notes

- `wrapperRef` on the outer div uses `data-scroll-container` — this is a Locomotive Scroll attribute left in place even though Locomotive Scroll is inactive. It has no effect on GSAP animations.
- `data-scroll-section` on each slide div is likewise Locomotive Scroll markup, inert without an active instance.
- No shared state between components — each demo is fully self-contained.
