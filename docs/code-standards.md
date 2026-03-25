# Code Standards

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Last Updated**: 2026-03-25

---

## Overview

Coding standards for this Next.js + GSAP + Locomotive Scroll project. Focused on patterns relevant to the actual codebase.

---

## File & Directory Naming

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase directory + file | `LearnGsap/LearnGsap.tsx` |
| CSS modules | `styles.module.css` in component dir | `LearnGsap/styles.module.css` |
| Pages (App Router) | lowercase `page.tsx`, `layout.tsx` | `app/page.tsx` |
| Images | kebab-case | `cat-ba.jpg`, `cau-vang.jpg` |

---

## TypeScript

- Strict mode enabled (via `tsconfig.json`)
- Prefer explicit typing for `useRef` generics: `useRef<HTMLDivElement>(null)`
- Use `import type` for type-only imports when possible

---

## React Patterns

### Client Components

Mark with `"use client"` at the top when using hooks, browser APIs, or GSAP. Example: `page.tsx` and `LearnGsap.tsx`.

### Refs

Use `useRef<HTMLDivElement>(null)` for DOM refs passed to GSAP. Initialize all refs at the top of the component before `useLayoutEffect`.

### Animation Setup

Use `useLayoutEffect` (not `useEffect`) for GSAP animations to avoid flash of unstyled content:

```tsx
useLayoutEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const ctx = gsap.context(() => {
    // animations here
  });
  return () => ctx.revert(); // cleanup
}, []);
```

---

## GSAP Patterns

### Plugin Registration

Always register plugins inside the component (or at module level for SSR safety):

```tsx
gsap.registerPlugin(ScrollTrigger);
```

For Next.js, import from `gsap/dist/ScrollTrigger` (not `gsap/ScrollTrigger`) to avoid SSR issues:

```tsx
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
```

### Context Isolation

Wrap all animations in `gsap.context()` to scope selectors and enable clean revert:

```tsx
const ctx = gsap.context(() => {
  gsap.fromTo(ref.current, { ... }, { ... });
});
return () => ctx.revert();
```

### Multiple Contexts

Use separate contexts for logically distinct sections (e.g., one per slide). Revert all in cleanup:

```tsx
const ctxIntro = gsap.context(() => { /* slide 1 */ });
const ctxContent1 = gsap.context(() => { /* slide 2 */ });
return () => {
  ctxIntro.revert();
  ctxContent1.revert();
};
```

### Initial State

Use `gsap.set()` to establish initial states before timeline/trigger setup, so elements start hidden before animations run:

```tsx
gsap.set([ref1.current, ref2.current], { x: -200, opacity: 0 });
```

### Timeline Position Operators

- `"+=0.1"` - delay 0.1s after previous animation ends
- `"<"` - start at the same time as the previous animation (parallel)

### ScrollTrigger Config

Common pattern used in this project:

```tsx
scrollTrigger: {
  trigger: sectionRef.current,
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
}
```

Scrub pattern for scroll-linked animation:

```tsx
scrollTrigger: {
  trigger: containerRef.current,
  start: "top top",
  end: "bottom top",
  scrub: true,
}
```

---

## Next.js Image

Always use `next/image` `<Image>` for images in `public/`. Required props:
- `src`, `alt`, `fill` (or explicit `width`/`height`)
- Use `loading="eager"` for above-the-fold images
- Use `className="object-cover"` with `fill` on a `position:relative` parent

```tsx
<div className="relative w-[300px] h-[300px]">
  <Image src="/images/cat-ba.jpg" alt="Cát Bà" fill className="object-cover" loading="eager" />
</div>
```

---

## Locomotive Scroll

`data-scroll-container` on the root wrapper, `data-scroll-section` on each scroll section, `data-scroll` + `data-scroll-speed` on parallax elements.

Locomotive Scroll v5 requires explicit initialization (not just data attributes). When adding back `LearnLocomotiveScroll`, initialize the instance in `useEffect`:

```tsx
import LocomotiveScroll from "locomotive-scroll";

useEffect(() => {
  const scroll = new LocomotiveScroll({ el: wrapperRef.current });
  return () => scroll.destroy();
}, []);
```

---

## Tailwind CSS

Using v4. No config file needed. Import in `globals.css`:

```css
@import "tailwindcss";
```

Use standard utility classes. For custom CSS properties via `@theme inline` directive (see `globals.css`).

---

## Git Commit Messages

Follow conventional commits:

```
type: description
```

Types: `feat`, `fix`, `docs`, `refactor`, `style`, `chore`

Examples:
```
feat: add horizontal scroll demo
fix: gsap context cleanup on unmount
docs: update codebase summary
```

---

## File Size

Keep component files concise. `LearnGsap.tsx` at 325 lines is acceptable for a demo component combining markup + animations. If adding more slides, consider splitting animation logic into a custom hook.

---

## No Tests

This is a learning project. No test infrastructure required.
