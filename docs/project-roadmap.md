# Project Roadmap

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Last Updated**: 2026-03-25

---

## Phase 1: Foundation (Complete)

Basic GSAP ScrollTrigger demos working in Next.js App Router.

- GSAP ScrollTrigger with `fromTo`, scrub, timelines
- Staggered text reveals
- Image reveals with rotation
- Proper cleanup via `gsap.context().revert()`
- Next.js Image optimization
- Locomotive Scroll basic data-attribute demo (inactive, ready to enable)

---

## Phase 2: Combine Libraries (Next)

Get GSAP and Locomotive Scroll working together.

- Initialize Locomotive Scroll instance in `LearnLocomotiveScroll`
- Proxy native scroll to Locomotive Scroll for GSAP ScrollTrigger:
  ```
  ScrollTrigger.scrollerProxy(el, { ... })
  ```
- Sync ScrollTrigger refresh on Locomotive Scroll update
- Add smooth-scroll to the GSAP demo

---

## Phase 3: More Animation Patterns

Explore additional GSAP animation types.

- **Pin**: Fix a section in place while animating content inside it
- **Parallax**: Different scroll speeds for layered elements
- **Horizontal scroll**: Scroll section that moves left/right
- **Batch**: Animate lists of cards on scroll (`ScrollTrigger.batch`)
- **SplitText**: Character and word-level text animations (requires GSAP Club or manual split)

---

## Phase 4: Polish & Reusability

Make the demos production-quality and extract reusable patterns.

- Responsive animations (adapt values for mobile)
- Custom `useGsapTimeline` hook to separate animation logic from JSX
- Transition between demo pages without GSAP context leaks
- Add unused images (`ha-noi.jpg`, `suong-mu.jpg`) to new slides

---

## Backlog (No Priority)

- Custom cursor with magnetic button effect
- SVG path draw animation
- Scroll-based counter/number animation
- Video background with scroll-controlled playback
- Dark mode toggle with GSAP color transition

---

## Not Planned

- Backend / API
- Authentication
- Testing
- Production deployment pipeline
- CMS
