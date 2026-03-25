# Project Overview & PDR

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Type**: Learning / experimentation
**Status**: Active development
**Last Updated**: 2026-03-25

---

## Overview

A Next.js sandbox for learning scroll-driven animation techniques using GSAP ScrollTrigger and Locomotive Scroll. Content theme is Vietnamese history (CM12 intelligence operation).

Not a production application. Goal is to build reference implementations for animation patterns applicable to future projects.

---

## Goals

1. Learn GSAP ScrollTrigger patterns (fromTo, scrub, pin, timelines, clip-path, 3D transforms)
2. Learn Locomotive Scroll setup and integration with Next.js App Router
3. Build a rich storytelling UI with per-chapter animation variety
4. Establish reusable patterns for scroll animations

---

## Product Development Requirements

### P1 - Core (done)

| ID | Requirement | Status |
|---|---|---|
| P1-01 | Next.js App Router scaffold with GSAP + Locomotive Scroll | Done |
| P1-02 | `Demo` orchestrator rendering section components | Done |
| P1-03 | `SectionContentReveal`: hero title stagger + polaroid images | Done |
| P1-04 | `SectionContentReveal`: pinned left-col image scroll + animated line | Done |
| P1-05 | `SectionStorytelling`: 10-chapter scroll narrative | Done |
| P1-06 | Hero section: char-by-char 3D flip entrance | Done |
| P1-07 | Ch1: parallax inner image + grayscale-to-color scrub | Done |
| P1-08 | Ch2: slide-in text + image with parallax | Done |
| P1-09 | Ch3: clip-path horizontal wipe | Done |
| P1-10 | Ch4: full-bleed grayscale scrub + overlay | Done |
| P1-11 | Ch5: slide-from-left + sepia scrub | Done |
| P1-12 | Ch6: drop-in + blur-clear | Done |
| P1-13 | Ch7: radial clip-path reveal + sepia scrub | Done |
| P1-14 | Ch8: book-open 3D Y-axis rotation (scrub) | Done |
| P1-15 | Ch9: spin-rotate entrance | Done |
| P1-16 | Ch10: split-tear image, reveals text underneath | Done |
| P1-17 | Ch11: fade-up closing + end-star spin | Done |
| P1-18 | `ImageLightbox`: GSAP open/close from source rect | Done |
| P1-19 | Shared helpers: `animTitleWords`, `animBody` (typewriter), `animDecLine` | Done |
| P1-20 | All animation durations normalized to max 1.5s | Done |
| P1-21 | ScrollTrigger ch8/ch10 bugs fixed (removed premature animTitle/animBody) | Done |
| P1-22 | `prefers-reduced-motion` guard in SectionStorytelling | Done |
| P1-23 | GSAP cleanup via `gsap.context().revert()` in all components | Done |
| P1-24 | Next.js Image optimization for all assets | Done |

### P2 - Nice to have

| ID | Requirement | Status |
|---|---|---|
| P2-01 | Combine GSAP + Locomotive Scroll (ScrollerProxy) | Not started |
| P2-02 | Horizontal scroll section | Not started |
| P2-03 | Reusable animation hook (`useGsapTimeline`) | Not started |
| P2-04 | Full mobile-responsive animations (adapt values for small screens) | Not started |
| P2-05 | GSAP SplitText plugin for word/char split (currently manual) | Not started |

### P3 - Future exploration

| ID | Requirement | Status |
|---|---|---|
| P3-01 | Custom cursor with magnetic effects | Not started |
| P3-02 | SVG path draw animations | Not started |
| P3-03 | ScrollTrigger.batch for card list animations | Not started |
| P3-04 | Scroll-based counter animation | Not started |

---

## Constraints

- No backend (static/client-side only)
- Must work with Next.js App Router + React 19
- GSAP free tier only (no Club GSAP plugins)
- No test infrastructure required

---

## Non-Goals

- Production deployment
- Tests
- CMS or content management
- i18n beyond Vietnamese text labels
- Authentication
