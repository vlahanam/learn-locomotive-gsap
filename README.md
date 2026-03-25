# learn-locomotive-gsap

A Next.js learning/experimentation project for GSAP animations and Locomotive Scroll.

**Version**: 0.1.0 | **Status**: Early development

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
| Fonts | Roboto Slab, Geist (via next/font) | - |

---

## Project Structure

```
learn-locomotive-gsap/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Roboto Slab font
│   │   ├── page.tsx            # Home page (renders LearnGsap)
│   │   ├── globals.css         # Global styles + Tailwind import
│   │   └── favicon.ico
│   └── components/
│       ├── LearnGsap/
│       │   ├── LearnGsap.tsx   # GSAP ScrollTrigger demo (active)
│       │   └── styles.module.css
│       └── LearnLocomotiveScroll/
│           ├── LearnLocomotiveScroll.tsx  # Locomotive Scroll demo (commented out)
│           └── styles.module.css
├── public/images/              # Vietnam landscape photos
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

## Components

### LearnGsap (active)

`src/components/LearnGsap/LearnGsap.tsx` - 3-slide GSAP ScrollTrigger demo with Vietnamese-themed content.

- **Slide Intro**: Cát Bà image with text animation using `gsap.fromTo` (scale + rotation + opacity), scrub on scroll-out
- **Slide Content 1**: Ho Chi Minh City background, staggered text slides from left, 3 rotating image reveals
- **Slide 3**: Static Hạ Long Bay image

Uses `gsap.context()` for cleanup, `useLayoutEffect` for animation setup.

### LearnLocomotiveScroll (inactive)

`src/components/LearnLocomotiveScroll/LearnLocomotiveScroll.tsx` - Basic Locomotive Scroll speed demo using `data-scroll` and `data-scroll-speed` attributes. Commented out in `page.tsx`.

---

## Switching Demos

Edit `src/app/page.tsx`:

```tsx
// Uncomment one, comment the other
<LearnGsap />
{/* <LearnLocomotiveScroll /> */}
```

---

## Images

Vietnam landscape photos in `public/images/`:

- `cat-ba.jpg` - used in Slide Intro
- `thanh-pho-ho-chi-minh.jpg` - Slide Content 1 background
- `nhat-ban.jpg`, `nui-tuyet.jpg`, `cau-vang.jpg` - Slide Content 1 image panels
- `vinh-ha-long.jpg` - Slide 3
- `ha-noi.jpg`, `suong-mu.jpg` - not yet used

---

## Documentation

See `./docs/` for full project documentation.
