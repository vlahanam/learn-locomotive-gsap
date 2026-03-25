# Phase 01 — Audit & Fix

**Parent plan:** [plan.md](./plan.md)
**File:** `src/components/Demo/section-storytelling.tsx`

---

## Overview
- **Date:** 2026-03-25
- **Priority:** Medium
- **Status:** 🔴 Pending

---

## Full Animation Audit

### ✅ Animations with correct scrollTrigger

| Location | Animation | Trigger | Notes |
|----------|-----------|---------|-------|
| Hero chars | `fromTo` y/rotationX | `heroTitleRef top 85%` | OK |
| Hero subtitle | `fromTo` y/opacity | `heroSub top 85%` | Has `delay: 1.2` — acceptable for hero |
| Hero lines | `fromTo` scaleX | `.hero-line top 85%` | OK |
| Hero star | `fromTo` scale/rotation | `.hero-star top 85%` | OK |
| CH1 img parallax | `fromTo` y (-60→60) | `ch1 scrub:3` | OK |
| CH1 grayscale | `fromTo` filter | `ch1 scrub:3` | OK |
| CH1 img entrance | `fromTo` scale/opacity | `ch1 top 80%` | OK |
| CH2 text block | `fromTo` x/opacity | `ch2 top 75%` | OK |
| CH2 image | `fromTo` x/rotation/opacity | `ch2 top 72%` | OK |
| CH2 parallax | `fromTo` y | `ch2 scrub:3` | OK |
| CH3 clip-path reveal | `fromTo` clipPath/scale/blur | `ch3 top 72%` | OK |
| CH3 text block | `fromTo` x/opacity | `ch3 top 70%` | OK |
| CH3 parallax | `fromTo` y | `ch3 scrub:3` | OK |
| CH4 grayscale | `fromTo` filter | `ch4 scrub:3` | OK |
| CH4 overlay | `fromTo` opacity/y | `ch4 top 55%` | OK |
| CH4 parallax | `fromTo` y | `ch4 scrub:3` | OK |
| CH5 img entrance | `fromTo` x/rotation | `ch5 top 75%` | OK |
| CH5 grayscale | `fromTo` filter | `ch5 scrub:3` | OK |
| CH5 text block | `fromTo` x/opacity | `ch5 top 72%` | OK |
| CH6 img entrance | `fromTo` y/rotation/opacity | `ch6 top 75%` | OK |
| CH6 blur | `fromTo` filter | `ch6 top 72%` | OK |
| CH6 parallax | `fromTo` y | `ch6 scrub:3` | OK |
| CH6 text block | `fromTo` x/opacity | `ch6 top 70%` | OK |
| CH7 circle reveal | `fromTo` clipPath | `ch7 top 72%` | OK |
| CH7 grayscale | `fromTo` filter | `ch7 scrub:3` | OK |
| CH7 parallax | `fromTo` y | `ch7 scrub:3` | OK |
| CH8 bookLeft/Right | `fromTo` rotationY | `ch8 scrub:1.5` | OK |
| CH9 spin | `fromTo` rotation/scale | `ch9 top 75%` | OK |
| CH9 grayscale | `fromTo` filter | `ch9 scrub:3` | OK |
| CH9 text block | `fromTo` x/opacity | `ch9 top 68%` | OK |
| CH10 splitL/R | `fromTo` x | `ch10 scrub:1.5` | OK |
| CH11 image | `fromTo` y/opacity/scale | `ch11 top 75%` | OK |
| CH11 star | `fromTo` scale/rotation | `.end-star top 90%` | OK |
| `animDecLine` (ch2,3,5,6,7,9) | `fromTo` scaleX | `parent top 80%` | OK |

---

## 🔴 Bugs Found

### Bug 1 — CH8: animTitleWords + animBody fire inside hidden container

**Problem:**
- `bookInner` (the container with title + body text) starts at `opacity: 0`
- It only becomes visible when trigger fires at `"top 55%"`
- `animTitleWords(ch8)` fires at `"top 80%"` — **before `bookInner` is visible**
- `animBody(ch8)` fires at `"top 78%"` — same issue
- Result: word animations complete while invisible → words appear already in final state when `bookInner` fades in

**Fix:** Remove `animTitleWords(ch8)` and `animBody(ch8)` calls. The `bookInner` `fromTo` already handles the reveal of the full content block.

---

### Bug 2 — CH10: animTitleWords + animBody fire inside hidden container

**Problem:** Identical to Bug 1.
- `splitInner` starts at `opacity: 0`, triggers at `"top 45%"`
- `animTitleWords(ch10)` fires at `"top 80%"` — inside invisible `splitInner`
- `animBody(ch10)` fires at `"top 78%"` — same

**Fix:** Remove `animTitleWords(ch10)` and `animBody(ch10)` calls.

---

### Bug 3 — CH4: animBody not called (minor)

**Problem:**
- `animBody(ch4)` is never called
- Body text words (`.ch-body-word`) inside `ch4-overlay` won't have the typewriter animation
- The overlay itself fades in via `ov4` `fromTo`, bringing all content with it

**Assessment:** Acceptable as-is since `ch4-overlay` handles the reveal. However, inconsistent with other chapters.

**Fix (optional):** Add `animBody(ch4)` after `animTitleWords(ch4)`. Words inside the overlay will animate as the overlay itself fades in — they'll be initially invisible (opacity 0 from GSAP set) until the overlay's opacity is high enough to see them.

---

## Implementation Steps

1. In `section-storytelling.tsx`, find CH8 block → remove calls to `animTitleWords(ch8)` and `animBody(ch8)`
2. Find CH10 block → remove calls to `animTitleWords(ch10)` and `animBody(ch10)`
3. (Optional) Find CH4 block → add `animBody(ch4)` after `animTitleWords(ch4)`

**Lines to change:**
- CH8 block: remove 2 lines (`animTitleWords(ch8)` + `animBody(ch8)`)
- CH10 block: remove 2 lines (`animTitleWords(ch10)` + `animBody(ch10)`)
- CH4 block: add 1 line (`animBody(ch4)`)

---

## Success Criteria
- CH8 book-open animation: content reveals smoothly with the container, no pre-animated words
- CH10 split animation: same
- No animation fires while its container is hidden

---

## Risk Assessment
- **Low risk** — only removing redundant calls and adding one optional call
- No structural changes to JSX or animation logic
