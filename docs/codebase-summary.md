# Codebase Summary

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Last Updated**: 2026-03-25

---

## Directory Structure

```
learn-locomotive-gsap/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── favicon.ico
│   └── components/
│       ├── LearnGsap/
│       │   ├── LearnGsap.tsx        # active (325 lines)
│       │   └── styles.module.css
│       └── LearnLocomotiveScroll/
│           ├── LearnLocomotiveScroll.tsx  # inactive (22 lines)
│           └── styles.module.css          # empty
├── public/
│   └── images/                 # 8 Vietnam landscape photos
├── docs/
├── plans/
├── package.json
├── next.config.ts              # minimal, no custom options
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── CLAUDE.md
```

---

## Entry Points

### `src/app/layout.tsx`

Root layout. Applies Roboto Slab font (weights 400/700, latin + vietnamese subsets) to `<html>`. Geist and Geist_Mono are imported but not applied.

### `src/app/page.tsx`

Client component. Renders `<LearnGsap />`. `<LearnLocomotiveScroll />` is commented out.

### `src/app/globals.css`

Tailwind v4 import (`@import "tailwindcss"`). CSS variables for background/foreground with dark mode support via `prefers-color-scheme`.

---

## Components

### `LearnGsap`

**Path**: `src/components/LearnGsap/LearnGsap.tsx`

**Purpose**: GSAP ScrollTrigger demo with 3 full-screen slides.

**Refs**:
- `wrapperRef` - outer `data-scroll-container` div
- `slideIntroRef` / `textSlideIntroRef` - intro slide container and animated text block
- `slideContent1Ref` - content slide 1 ScrollTrigger target
- `textContent1Ref` through `textContent5Ref` - staggered text lines
- `imageContent2Ref`, `imageContent3Ref`, `imageContent4Ref` - rotating image panels

**Animation context 1 (ctxIntro)**:
- `gsap.fromTo` on `textSlideIntroRef`: enters from `{x:-150, y:50, scale:0.5, rotation:-10, opacity:0}` with `back.out(1.7)`
- On complete: registers scroll-out `gsap.to` with `scrub:true`, trigger=`slideIntroRef`, `start:"top top"`, `end:"bottom top"`

**Animation context 2 (ctxContent1)**:
- `gsap.set` initializes images to `{scale:0, opacity:0}` and text to `{x:-200, opacity:0}`
- Timeline: `toggleActions:"play none none reverse"`, `start:"top 80%"`, `end:"bottom 20%"`
- Text items animate in sequence `+=0.1` apart with `power3.out`
- Image panels animate concurrently with paired text item via `"<"` position, `back.out(1.4)`, `rotation:60`

**Cleanup**: `ctxIntro.revert()` and `ctxContent1.revert()` in `useLayoutEffect` return.

**Slides**:
1. **Intro** (bg-blue-500): cat-ba.jpg + Vietnamese text overlay
2. **Content 1** (bg-green-500): thanh-pho-ho-chi-minh.jpg background, left staggered text, right 3 overlapping image panels (nhat-ban.jpg, nui-tuyet.jpg, cau-vang.jpg)
3. **Slide 3** (bg-red-500): vinh-ha-long.jpg, no animation

**Vietnamese text content**:
- Intro: "Dùng địch đánh địch", "Đỉnh cao của chiến lược thâm nhập"
- Content 1: "Thế lực thù địch đã dùng", "14 Tấn tiền giả", "Mật mã điện đài", "Hệ thống con dấu", "Một kế hoạch tinh vi"

### `LearnLocomotiveScroll`

**Path**: `src/components/LearnLocomotiveScroll/LearnLocomotiveScroll.tsx`

**Purpose**: Basic Locomotive Scroll parallax speed demo.

Two divs with `data-scroll` + `data-scroll-speed` (2 and 1) in a full-height section. No Locomotive Scroll instance initialization in the component. Currently commented out in `page.tsx`.

---

## Styling

**Tailwind CSS v4**: Auto-configured via PostCSS. No `tailwind.config.js` required.

**CSS Modules**: `LearnGsap/styles.module.css` defines `textSlideIntroRefShadow` for intro text. `LearnLocomotiveScroll/styles.module.css` is empty.

**Fonts**: Roboto Slab with Vietnamese subset applied globally.

---

## Assets

`public/images/`:

| File | Usage |
|---|---|
| cat-ba.jpg | Slide Intro background |
| thanh-pho-ho-chi-minh.jpg | Slide Content 1 background |
| nhat-ban.jpg | Slide Content 1 image panel 1 |
| nui-tuyet.jpg | Slide Content 1 image panel 2 |
| cau-vang.jpg | Slide Content 1 image panel 3 |
| vinh-ha-long.jpg | Slide 3 background |
| ha-noi.jpg | Not currently used |
| suong-mu.jpg | Not currently used |

---

## Dependencies

**Runtime**: `gsap@^3.14.2`, `locomotive-scroll@^5.0.1`, `next@16.2.1`, `react@19.2.4`, `react-dom@19.2.4`

**Dev**: `typescript@^5`, `tailwindcss@^4`, `@tailwindcss/postcss@^4`, `eslint@^9`, `eslint-config-next@16.2.1`, `@types/node@^20`, `@types/react@^19`, `@types/react-dom@^19`
