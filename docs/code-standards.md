# Code Standards

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Last Updated**: 2026-03-25

---

## Overview

Coding standards for this Next.js + GSAP + Locomotive Scroll project.

---

## File & Directory Naming

| Type | Convention | Example |
|---|---|---|
| React component dirs | PascalCase | `Demo/`, `LearnGsap/` |
| Component files | PascalCase for top-level, kebab-case for section files | `Demo.tsx`, `section-storytelling.tsx` |
| CSS modules | `styles.module.css` in component dir | `Demo/styles.module.css` |
| Pages (App Router) | lowercase | `app/page.tsx`, `app/layout.tsx` |
| Images | kebab-case | `cm-12-1.png`, `deer-team-vietminh.png` |
| Docs | kebab-case | `codebase-summary.md` |

---

## TypeScript

- Strict mode enabled via `tsconfig.json`
- Explicit typing for `useRef` generics: `useRef<HTMLDivElement>(null)`
- Interface declarations for component props (see `ImageLightboxProps`, `LightboxData`)
- Use `import type` for type-only imports when possible

---

## React Patterns

### Client Components

Mark with `"use client"` at top when using hooks, browser APIs, or GSAP. All Demo components and `page.tsx` are client components.

### Refs

Declare all refs at top of component before any `useLayoutEffect`. Use specific element types:

```tsx
const containerRef = useRef<HTMLDivElement>(null);
const heroTitleRef = useRef<HTMLHeadingElement>(null);
```

### Animation Setup Hook

Use `useLayoutEffect` (not `useEffect`) for GSAP to avoid flash of unstyled content:

```tsx
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    // animations
  }, scopeRef);
  return () => ctx.revert();
}, []);
```

### Multiple Concerns, Multiple Effects

Split logically distinct animation groups into separate `useLayoutEffect` calls (see `SectionContentReveal`: title, images, section2 line, section2 cols, section2 pin — 5 separate effects).

---

## GSAP Patterns

### Plugin Registration

Register at module level (outside component) for SSR safety:

```tsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

### Context with Scope

Always pass a scope ref as second arg to `gsap.context()` to restrict selector queries:

```tsx
const ctx = gsap.context(() => {
  gsap.fromTo(".ch-title-word", { y: 60 }, { y: 0 });
}, sectionRef);
```

### Initial State

Set initial state with `gsap.set()` before timeline/trigger setup so elements start hidden:

```tsx
gsap.set([img1Ref.current, img2Ref.current], { scale: 0, opacity: 0 });
```

### Animation Duration Cap

Max animation duration: **1.5s**. Standard values used in this project: `0.3`, `0.5`, `0.8`, `1.5`.

### ScrollTrigger Configs

**Scrub (scroll-linked)**:
```tsx
scrollTrigger: {
  trigger: ref.current,
  start: "top bottom",
  end: "bottom top",
  scrub: 3,
}
```

**Snap trigger (play on enter)**:
```tsx
scrollTrigger: {
  trigger: ref.current,
  start: "top 75%",
}
```

**Pin + scrub**:
```tsx
scrollTrigger: {
  trigger: sectionRef.current,
  start: "top top",
  end: "+=280vh",
  pin: true,
  scrub: 1,
  anticipatePin: 1,
}
```

### Timeline Position Operators

- `"-=0.1"` — overlap 0.1s with previous animation end
- `"<"` — start at same time as previous (parallel)
- `"-=0.3"` — overlap 0.3s (used in lightbox)

### Reduced Motion

Always guard complex scroll animations:

```tsx
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
```

### Animation Anti-Patterns to Avoid

- Do NOT call shared helpers (`animTitleWords`, `animBody`) inside scrub-only chapters (ch8, ch10) — those chapters use special layout elements incompatible with the generic `.ch-title-word`/`.ch-body-word` selectors
- Do NOT run GSAP in `useEffect` for layout-dependent animations (use `useLayoutEffect`)
- Do NOT skip `ctx.revert()` cleanup — causes leaked ScrollTriggers on re-render

---

## Next.js Image

Always use `next/image` `<Image>` for all assets in `public/`. Required props:

```tsx
<div className="relative w-[450px] h-[300px]">
  <Image
    src="/images/cm-12-1.png"
    alt="description"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    className="object-cover"
    loading="eager"
  />
</div>
```

- `loading="eager"` for above-the-fold / critical images
- `priority` on images in pinned sections
- Parent must be `position: relative` (Tailwind `relative`) with explicit dimensions

---

## Locomotive Scroll

Current usage: passive initialization in `page.tsx` (no ScrollerProxy). Locomotive Scroll v5 instance created on mount for smooth momentum scroll:

```tsx
useEffect(() => {
  (async () => {
    const LocomotiveScroll = (await import("locomotive-scroll")).default;
    new LocomotiveScroll();
  })();
}, []);
```

For full GSAP integration (future), use ScrollerProxy pattern:

```tsx
ScrollTrigger.scrollerProxy(el, {
  scrollTop(value) { ... },
  getBoundingClientRect() { ... },
});
scroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.addEventListener("refresh", () => scroll.update());
```

---

## Tailwind CSS

Using v4. No config file. Import in `globals.css`:

```css
@import "tailwindcss";
```

Use standard utility classes inline. Responsive prefix order: `sm:` `md:` `lg:` `xl:`.

Custom max-widths used in sections: `sm:max-w-150`, `md:max-w-180`, `lg:max-w-240`, `xl:max-w-310`.

---

## CSS Class Naming for GSAP Targets

Use semantic class names as GSAP query selectors. Do NOT rely on Tailwind utility classes as GSAP targets:

```tsx
// Good — semantic selector
<span className="ch-title-word ...">word</span>
gsap.fromTo(".ch-title-word", ...)

// Bad — utility class as selector
gsap.fromTo(".text-7xl", ...)
```

Established selector conventions:

| Class | Used by |
|---|---|
| `.char` | Hero title char-by-char animation |
| `.hero-sub` | Hero subtitle fade |
| `.hero-line` | Hero decorative lines |
| `.hero-star` | Hero star spin |
| `.ch-1` … `.ch-11` | Chapter containers |
| `.ch-title-word` | Per-chapter title word stagger |
| `.ch-body-word` | Per-chapter body typewriter |
| `.ch-text-block` | Per-chapter text container |
| `.ch-dec-line` | Per-chapter decorative line |
| `.story-img` | Clickable story image wrapper |
| `.story-img-inner` | Inner image for parallax offset |
| `.book-left`, `.book-right`, `.book-inner` | Ch8 book-open elements |
| `.split-left`, `.split-right`, `.split-inner` | Ch10 split-tear elements |
| `.end-star` | Closing star ornament |

---

## Git Commit Messages

Conventional commits:

```
type: description
```

Types: `feat`, `fix`, `docs`, `refactor`, `style`, `chore`

---

## No Tests

Learning project. No test infrastructure required.
