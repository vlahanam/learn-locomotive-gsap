# learn-locomotive-gsap

A Next.js learning/experimentation project for GSAP animations with ScrollTrigger and Locomotive Scroll.

**Version**: 0.1.0 | **Status**: Active development

---

## Tech Stack

| Layer | Library | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.1 |
| UI | React | 19.2.4 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| Animation | GSAP + ScrollTrigger | 3.14.2 |
| Smooth scroll | Locomotive Scroll | 5.0.1 |
| Fonts | Roboto Slab (via next/font) | - |

---

## Project Structure

```
learn-locomotive-gsap/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Roboto Slab font
│   │   ├── page.tsx            # Home page (renders Demo + LocomotiveScroll init)
│   │   └── globals.css         # Global styles + Tailwind import
│   └── components/
│       ├── Demo/
│       │   ├── Demo.tsx                  # Thin orchestrator: renders SectionContentReveal + SectionStorytelling
│       │   ├── section-content-reveal.tsx # Intro hero + pinned image scroll section
│       │   ├── section-storytelling.tsx  # 10-chapter scroll storytelling
│       │   ├── image-lightbox.tsx        # GSAP-animated fullscreen image overlay
│       │   └── styles.module.css
│       ├── LearnGsap/                    # Legacy GSAP demo (not rendered)
│       └── LearnLocomotiveScroll/        # Locomotive Scroll demo (not rendered)
├── public/
│   ├── images/                 # Vietnam / CM12 historical photos
│   └── svg/                    # ngoi-sao.svg
├── docs/                       # Project documentation
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
pnpm build
pnpm start
```

### Lint

```bash
pnpm lint
```

---

## Active Demo: Demo Component

`src/app/page.tsx` renders `<Demo />` with Locomotive Scroll initialized (passive, no proxy).

### Demo.tsx

Thin orchestrator — renders two section components in sequence:

1. `<SectionContentReveal />` — intro hero with staggered title, polaroid-style images, pinned scroll image panel
2. `<SectionStorytelling />` — 10-chapter Vietnamese historical storytelling with per-chapter GSAP animations

### SectionContentReveal

**Section 1** (hero):
- Title words animate in alternating x-direction with stagger (`gsap.fromTo`)
- Three polaroid-style images (cm-12-1/2/3) pop in with `back.out(1.7)` + elastic bounce, hover effects

**Section 2** (pinned scroll):
- Left column pins while images scroll vertically (`-160vh`, `scrub:1`, `pin:true`)
- Right column holds body text
- Animated horizontal line + moving star ornament on scroll enter

### SectionStorytelling

10 chapters + closing, each with distinct GSAP animation type:

| Chapter | Animation Type | Key Technique |
|---|---|---|
| Hero | Char 3D flip | `rotationX: -90 → 0`, stagger per char |
| Ch 1 | Parallax + grayscale desaturate | scrub parallax inner, sepia `→` color on scroll |
| Ch 2 | Slide-in text + parallax | text from left, image from right |
| Ch 3 | Clip-path wipe | `inset(0 100% 0 0) → inset(0 0% 0 0)` |
| Ch 4 | Full-bleed + grayscale | full-width image, sepia scrub, overlay fade-up |
| Ch 5 | Slide-in + grayscale | image from left with rotation, sepia scrub |
| Ch 6 | Drop + blur | image drops from above + blur clears |
| Ch 7 | Radial clip reveal | `circle(0%) → circle(100%)` + sepia scrub |
| Ch 8 | Book-open | left/right halves rotate on Y-axis via scroll scrub |
| Ch 9 | Spin rotate | image spins `-180° → 0°` into view |
| Ch 10 | Split tear | left/right image halves slide apart, text reveals underneath |
| Ch 11 | Fade-up closing | final image + end star spin |

Shared helpers: `animTitleWords`, `animBody` (typewriter word stagger), `animDecLine`.

All animation durations max 1.5s. Respects `prefers-reduced-motion`.

### ImageLightbox

Fullscreen overlay triggered by clicking story images. Animates open from source rect (scale + translate + rotation), Escape/click-outside to close. GSAP timeline with `kill()` on re-trigger.

---

## Inactive Components

| Component | Path | Notes |
|---|---|---|
| LearnGsap | `src/components/LearnGsap/` | Legacy 3-slide GSAP demo, not imported |
| LearnLocomotiveScroll | `src/components/LearnLocomotiveScroll/` | Locomotive Scroll data-attribute demo, not imported |

---

## Images

`public/images/` — Vietnam / CM12 historical photos used in Demo sections. See `docs/codebase-summary.md` for full asset table.

---

## Documentation

See `./docs/` for full project documentation.
