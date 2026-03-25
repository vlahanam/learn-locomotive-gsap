# Animation Audit — SectionStorytelling

**Date:** 2026-03-25
**Status:** 📋 Ready for review

## Objective
Audit every GSAP animation in `section-storytelling.tsx`. Ensure all scroll-triggered animations fire at the correct scroll position and are visible when they animate.

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Audit & Fix — scrollTrigger bugs](./phase-01-audit-and-fix.md) | 🔴 Pending |
| 2 | [Reduce all durations to ≤ 1.5s](./phase-02-reduce-durations.md) | 🔴 Pending |

## Key Findings (summary)
- All animations already have `scrollTrigger` — no naked tweens missing triggers
- **3 bugs found** where animations fire inside hidden containers (ch8, ch10) or are missing (ch4)
- **28 `duration` values** exceed 1.5s and need to be reduced
- See each phase for full breakdown
