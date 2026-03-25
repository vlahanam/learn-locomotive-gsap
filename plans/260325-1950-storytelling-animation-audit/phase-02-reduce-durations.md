# Phase 02 — Reduce All Durations to ≤ 1.5s

**Parent plan:** [plan.md](./plan.md)
**File:** `src/components/Demo/section-storytelling.tsx`

---

## Overview
- **Date:** 2026-03-25
- **Priority:** Medium
- **Status:** 🔴 Pending
- **Scope:** Change every `duration` > 1.5 to `1.5`. Leave `duration` ≤ 1.5 untouched.

---

## Complete Duration Inventory

### 🔴 Must change (28 occurrences, all → `1.5`)

| Line | Location | Current | Action |
|------|----------|---------|--------|
| 168 | Hero chars (`rotationX`) | `3.5` | → 1.5 |
| 185 | Hero subtitle (has `delay: 1.2`) | `4` | → 1.5 |
| 200 | Hero lines (`scaleX`) | `3.5` | → 1.5 |
| 217 | Hero star | `3.5` | → 1.5 |
| 266 | CH1 img entrance | `4` | → 1.5 |
| 286 | CH2 text block | `3.5` | → 1.5 |
| 301 | CH2 image | `4` | → 1.5 |
| 339 | CH3 clip-path reveal | `4.5` | → 1.5 |
| 352 | CH3 text block | `3.5` | → 1.5 |
| 405 | CH4 overlay | `4` | → 1.5 |
| 442 | CH5 image entrance | `4` | → 1.5 |
| 470 | CH5 text block | `3.5` | → 1.5 |
| 493 | CH6 image entrance | `4.5` | → 1.5 |
| 504 | CH6 blur | `3.5` | → 1.5 |
| 533 | CH6 text block | `3.5` | → 1.5 |
| 554 | CH7 circle reveal | `4.5` | → 1.5 |
| 606 | CH8 bookLeft rotationY (scrub*) | `4` | → 1.5 |
| 624 | CH8 bookRight rotationY (scrub*) | `4` | → 1.5 |
| 643 | CH8 bookInner reveal | `4` | → 1.5 |
| 664 | CH9 spin rotation | `4.5` | → 1.5 |
| 693 | CH9 text block | `3.5` | → 1.5 |
| 714 | CH10 splitLeft (scrub*) | `4` | → 1.5 |
| 732 | CH10 splitRight (scrub*) | `4` | → 1.5 |
| 752 | CH10 splitInner reveal | `4` | → 1.5 |
| 773 | CH11 image | `3.5` | → 1.5 |
| 788 | CH11 closing star | `3.5` | → 1.5 |
| 805 | `animTitleWords` helper | `2.5` | → 1.5 |
| 838 | `animDecLine` helper | `2.5` | → 1.5 |

> *scrub animations: `duration` is overridden by scroll distance, but normalize anyway for consistency.

### ✅ Keep unchanged (1 occurrence)

| Line | Location | Value | Reason |
|------|----------|-------|--------|
| 822 | `animBody` word stagger | `0.3` | Already < 1.5 |

---

## Implementation Steps

**Approach:** Bulk replace via editor. All target values are `3.5`, `4`, `4.5`, or `2.5` — replace each to `1.5`.

Since `duration: 0.3` is the only value ≤ 1.5, safe approach:
1. Replace `duration: 3.5` → `duration: 1.5` (all occurrences in file)
2. Replace `duration: 4` → `duration: 1.5` (all occurrences)
3. Replace `duration: 4.5` → `duration: 1.5` (all occurrences)
4. Replace `duration: 2.5` → `duration: 1.5` (all occurrences)
5. Verify `duration: 0.3` is untouched

> Note: Other files may have `duration: 4` etc — apply changes ONLY to `section-storytelling.tsx`

---

## Success Criteria
- No `duration` value > 1.5 remains in `section-storytelling.tsx`
- `duration: 0.3` (animBody) unchanged
- Animations still trigger on scroll correctly
- `stagger` values unaffected

---

## Risk Assessment
- **Low** — duration is purely cosmetic speed; no logic changes
- Scrub animations are unaffected functionally (scroll distance controls timing)
- `delay: 1.2` on hero subtitle is NOT a duration — leave untouched
