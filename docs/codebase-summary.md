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
│   │   ├── layout.tsx              # Root layout, Roboto Slab font
│   │   ├── page.tsx                # Home page, renders Demo + LocomotiveScroll init
│   │   ├── globals.css             # Tailwind v4 import + CSS variables
│   │   └── favicon.ico
│   └── components/
│       ├── Demo/
│       │   ├── Demo.tsx                  # Orchestrator (12 lines)
│       │   ├── section-content-reveal.tsx # Hero + pinned scroll (595 lines)
│       │   ├── section-storytelling.tsx  # 10-chapter storytelling (~900 lines)
│       │   ├── image-lightbox.tsx        # Lightbox overlay (193 lines)
│       │   ├── styles.module.css
│       │   ├── section1/                 # Empty placeholder dir
│       │   └── section2/                 # Empty placeholder dir
│       ├── LearnGsap/                    # Legacy (not rendered)
│       │   ├── LearnGsap.tsx
│       │   └── styles.module.css
│       └── LearnLocomotiveScroll/        # Legacy (not rendered)
│           ├── LearnLocomotiveScroll.tsx
│           └── styles.module.css
├── public/
│   ├── images/                     # 28 image assets
│   └── svg/
│       └── ngoi-sao.svg
├── docs/
├── plans/
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── CLAUDE.md
```

---

## Entry Points

### `src/app/layout.tsx`

Server component. Applies Roboto Slab font (weights 400/700, latin + vietnamese subsets) to `<html>`. Geist/Geist_Mono imported but not applied.

### `src/app/page.tsx`

Client component (`"use client"`). Initializes Locomotive Scroll in `useEffect` (async import, passive — no ScrollerProxy). Renders `<Demo />`.

### `src/app/globals.css`

Tailwind v4 import (`@import "tailwindcss"`). CSS variables for background/foreground with dark mode via `prefers-color-scheme`.

---

## Components

### `Demo`

**Path**: `src/components/Demo/Demo.tsx`

Thin orchestrator. Renders `<SectionContentReveal />` followed by `<SectionStorytelling />`. No props, no state, no animations.

---

### `SectionContentReveal`

**Path**: `src/components/Demo/section-content-reveal.tsx`

Two-section component (hero + pinned scroll), single file.

**Refs**:
- `containerRef` — title animation scope
- `img1Ref`, `img2Ref`, `img3Ref` — polaroid photos
- `section2Ref`, `leftColRef`, `leftImagesWrapRef`, `rightColRef` — pinned scroll section
- `lineRef2`, `starRef2`, `lineRef5`, `starRef5` — decorative line + star ornament (section 2 and 5)

**Animation contexts** (4 separate `useLayoutEffect` calls):
1. Title word stagger — `fromTo` alternating x-direction, no scroll trigger (immediate)
2. Image bounce + hover — `back.out(1.7)` scale-in, elastic bounce on complete, hover scale/rotate
3. Section 2 line + star — scrollTrigger timeline: line expands, star fades in + starts infinite yoyo
4. Section 2 col entrance — left/right cols slide up from `y:80`
5. Section 2 pin — `leftImagesWrapRef` scrolls `y:"-160vh"` while section is pinned (`pin:true`, `scrub:1`, `+=280vh`)

**Sections rendered**:
- **Section 1**: `#EFE9E7` bg, hero title ("Dùng Địch Đánh Địch" + "Đỉnh Cao Của Chiến Lược Thâm Nhập"), three polaroid photos (cm-12-1/2/3 with ghim.png pin overlay). Mobile and desktop layouts.
- **Section 2**: pinned left column (3 stacked 80vh images), right column body text

---

### `SectionStorytelling`

**Path**: `src/components/Demo/section-storytelling.tsx`

Full scroll-storytelling with 10 chapters + hero + closing.

**State**: `lightboxData`, `lightboxRect` — drives `<ImageLightbox>` overlay.

**STORY_CHAPTERS** (10 entries, defined as module-level const):

| Index | Chapter Title | Image |
|---|---|---|
| 0 | Dùng Địch Đánh Địch | vietnam-independence.png |
| 1 | Đồng Chí Trần Phương Thế | deer-team-vietminh.png |
| 2 | Cải Trang & Xâm Nhập | ho-chi-minh-giap.png |
| 3 | Chiến Công Thầm Lặng | guerrilla-patrol.jpg |
| 4 | Liên Lạc Giả Qua Điện Đàm | radio-operator.jpg |
| 5 | Gặp Gỡ Trực Tiếp Chỉ Huy Địch | field-radio-test.jpg |
| 6 | Lấy Hoàn Toàn Lòng Tin Địch | nva-document.jpg |
| 7 | Kiểm Soát Đường Dây Vận Tải | military-transport.jpg |
| 8 | Chiến Dịch CM12 Thành Công Rực Rỡ | chess-strategy.jpg |
| 9 | Dùng Địch Đánh Địch — Đỉnh Cao... | nva-medal-doc.jpg |

**Per-chapter animation types**:

| Selector | Type | Technique |
|---|---|---|
| Hero | 3D char flip | `rotationX:-90→0`, stagger 0.08 per char |
| `.ch-1` | Parallax + sepia-to-color | inner `y:-60→60` scrub, grayscale filter scrub |
| `.ch-2` | Slide text left, image right + parallax | x offset `fromTo`, inner parallax scrub |
| `.ch-3` | Clip-path wipe | `inset(0 100% 0 0)→inset(0 0% 0 0)` |
| `.ch-4` | Full-bleed grayscale scrub | sepia scrub + `.ch4-overlay` fade-up |
| `.ch-5` | Slide left + sepia scrub | image x `-120` with rotation, text from right |
| `.ch-6` | Drop + blur clear | y:100 drop + `blur(10px)→blur(0px)` |
| `.ch-7` | Radial clip reveal | `circle(0%)→circle(100%)` + sepia scrub |
| `.ch-8` | Book-open (3D) | `.book-left` `rotationY:0→-70`, `.book-right` `rotationY:0→70`, scrub; `.book-inner` fades in |
| `.ch-9` | Spin-rotate | `rotation:-180→0`, `scale:0.3→1` |
| `.ch-10` | Split tear | `.split-left` x `0%→-110%`, `.split-right` x `0%→110%`, scrub; `.split-inner` fades up |
| `.ch-11` | Fade-up closing | image y:80→0, `.end-star` spin |

**Shared helpers** (defined inside `gsap.context` callback):
- `animTitleWords(parent)` — `.ch-title-word` elements: `y:60→0`, stagger 0.25
- `animBody(parent)` — `.ch-body-word` elements: typewriter word stagger, 0.06 each
- `animDecLine(parent)` — `.ch-dec-line`: `scaleX:0→1`

**Notes**:
- All durations max 1.5s
- `prefers-reduced-motion` guard — returns early if reduced motion preferred
- Single `gsap.context(..., sectionRef)` scopes all animations; `ctx.revert()` on cleanup
- ch8 and ch10 do NOT call `animTitleWords`/`animBody` (fixed bug)

---

### `ImageLightbox`

**Path**: `src/components/Demo/image-lightbox.tsx`

Fullscreen image overlay with GSAP open/close animation.

**Props**: `data: LightboxData | null`, `sourceRect: DOMRect | null`, `onClose: () => void`

**Open animation** (`animateIn`): overlay fade-in → image morphs from source element position/scale/rotation → text slides up.

**Close animation** (`animateOut`): text fades out → image shrinks → overlay fades. Previous timeline killed via `tlRef.current?.kill()`.

**Triggers**: `useEffect` on `data` change calls `animateIn` via `requestAnimationFrame`. Escape key calls `animateOut`.

**Guard**: `isAnimatingRef` prevents overlapping animations.

---

## Styling

**Tailwind CSS v4**: Auto-configured via PostCSS. No config file.

**CSS Modules**: `Demo/styles.module.css` (present, content not actively used in current components). `LearnGsap/styles.module.css` defines `textSlideIntroRefShadow`.

**Fonts**: Roboto Slab with Vietnamese subset applied globally to `<html>`.

---

## Assets

### `public/images/`

| File | Used in |
|---|---|
| cm-12-1.png | SectionContentReveal Section 1 (img1) |
| cm-12-2.jpg | SectionContentReveal Section 1 (img2) |
| cm-12-3.jpg | SectionContentReveal Section 1 (img3) |
| ghim.png | Polaroid pin overlay |
| deer-team-vietminh.png | SectionContentReveal Section 2 (img1); Ch1 lightbox |
| viet-minh-poster.jpg | SectionContentReveal Section 2 (img2) |
| view-war-other-side.jpg | SectionContentReveal Section 2 (img3) |
| vietnam-independence.png | Ch0 storytelling |
| ho-chi-minh-giap.png | Ch2 storytelling |
| guerrilla-patrol.jpg | Ch3 storytelling |
| radio-operator.jpg | Ch4 storytelling |
| field-radio-test.jpg | Ch5 storytelling |
| nva-document.jpg | Ch6 storytelling |
| military-transport.jpg | Ch7 storytelling |
| chess-strategy.jpg | Ch8 storytelling |
| nva-medal-doc.jpg | Ch9 storytelling |
| cat-ba.jpg | Legacy LearnGsap |
| thanh-pho-ho-chi-minh.jpg | Legacy LearnGsap |
| nhat-ban.jpg | Legacy LearnGsap |
| nui-tuyet.jpg | Legacy LearnGsap |
| cau-vang.jpg | Legacy LearnGsap |
| vinh-ha-long.jpg | Legacy LearnGsap |
| ha-noi.jpg | Not used |
| suong-mu.jpg | Not used |
| chess-game.jpg | Not used |
| propaganda-poster.jpg | Not used |
| radio-station.jpg | Not used |
| sai-gon-1968.jpg | Not used |

### `public/svg/`

| File | Used in |
|---|---|
| ngoi-sao.svg | SectionContentReveal decorative star ornament |

---

## Dependencies

**Runtime**: `gsap@^3.14.2`, `locomotive-scroll@^5.0.1`, `next@16.2.1`, `react@19.2.4`, `react-dom@19.2.4`

**Dev**: `typescript@^5`, `tailwindcss@^4`, `@tailwindcss/postcss@^4`, `eslint@^9`, `eslint-config-next@16.2.1`, `@types/node@^20`, `@types/react@^19`, `@types/react-dom@^19`
