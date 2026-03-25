# Project Roadmap

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Last Updated**: 2026-03-25

---

## Phase 1: Foundation (Complete)

Basic GSAP ScrollTrigger + scroll storytelling working in Next.js App Router.

- Next.js App Router scaffold with GSAP + Locomotive Scroll
- `Demo` orchestrator with `SectionContentReveal` + `SectionStorytelling`
- Hero title: char-by-char 3D flip entrance
- `SectionContentReveal`: polaroid image pop-in with bounce + hover effects
- `SectionContentReveal`: pinned left column with scrolling images
- `SectionStorytelling`: 10-chapter narrative with distinct per-chapter animation types
  - Parallax inner, clip-path wipe, grayscale scrub, book-open (3D rotationY), spin-rotate, split-tear
- `ImageLightbox`: GSAP morph open/close from source element rect
- Shared helpers: `animTitleWords`, `animBody` (typewriter), `animDecLine`
- Animation durations normalized to max 1.5s
- ScrollTrigger bugs fixed in ch8/ch10 (removed premature helper calls)
- `prefers-reduced-motion` guard
- Proper GSAP cleanup via `gsap.context().revert()`
- Next.js Image optimization for all assets

---

## Phase 2: Scroll Library Integration (Next)

Get GSAP ScrollTrigger and Locomotive Scroll fully synchronized.

- Assign Locomotive Scroll instance to ref for proper lifecycle management
- Add `destroy()` call on page unmount
- Implement `ScrollTrigger.scrollerProxy()` so GSAP reads Locomotive's virtual scroll position
- Sync refresh: `scroll.on("scroll", ScrollTrigger.update)` + `ScrollTrigger.addEventListener("refresh", ...)`
- Verify all existing chapter animations work correctly with proxied scroll

---

## Phase 3: More Animation Patterns

Additional GSAP techniques not yet demonstrated.

- **Horizontal scroll**: section that moves left/right on vertical scroll (pin + x tween)
- **ScrollTrigger.batch**: animate lists of cards entering viewport
- **Counter**: scroll-triggered number count-up animation
- **SVG path draw**: `strokeDashoffset` animation linked to scroll
- **Magnetic cursor**: custom cursor that attracts to interactive elements

---

## Phase 4: Polish & Reusability

Make demos production-quality and extract reusable patterns.

- Responsive animation values (adapt offsets/scales for mobile breakpoints)
- Extract `useGsapContext(scopeRef)` custom hook to separate animation logic from JSX
- Use empty `section1/` and `section2/` subdirs for modular chapter components
- Add currently unused images (`ha-noi.jpg`, `suong-mu.jpg`, `chess-game.jpg`, `propaganda-poster.jpg`, `radio-station.jpg`, `sai-gon-1968.jpg`) to new chapters or sections
- Page transition that cleans up GSAP contexts without leaks

---

## Backlog (No Priority)

- Dark mode toggle with GSAP color transition
- Video background with scroll-controlled playback
- GSAP SplitText plugin (requires Club or manual implementation)
- Reintroduce `LearnGsap` / `LearnLocomotiveScroll` as toggleable demo modes

---

## Not Planned

- Backend / API
- Authentication
- Testing
- Production deployment pipeline
- CMS
