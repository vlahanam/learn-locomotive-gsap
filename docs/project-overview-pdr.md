# Project Overview & PDR

**Project**: learn-locomotive-gsap
**Version**: 0.1.0
**Type**: Learning / experimentation
**Status**: Early development
**Last Updated**: 2026-03-25

---

## Overview

A Next.js sandbox for exploring scroll-driven animation techniques using GSAP ScrollTrigger and Locomotive Scroll. Vietnamese landscape photography is used as visual content.

This is not a production application. The purpose is to learn animation patterns applicable to future projects.

---

## Goals

1. Learn GSAP ScrollTrigger patterns (fromTo, timelines, scrub, toggleActions)
2. Learn Locomotive Scroll setup and integration with Next.js App Router
3. Experiment with combining both libraries
4. Build reference implementations for future use

---

## Product Development Requirements

### P1 - Core (done)

| ID | Requirement | Status |
|---|---|---|
| P1-01 | GSAP ScrollTrigger demo with multiple slides | Done |
| P1-02 | Intro slide: text enter + scroll-out animation with scrub | Done |
| P1-03 | Content slide: staggered text reveals from left | Done |
| P1-04 | Content slide: image reveals with rotation + scale | Done |
| P1-05 | Locomotive Scroll basic speed demo | Done (inactive) |
| P1-06 | Proper GSAP cleanup via `gsap.context().revert()` | Done |
| P1-07 | Next.js Image optimization for all assets | Done |

### P2 - Nice to have

| ID | Requirement | Status |
|---|---|---|
| P2-01 | Combine GSAP + Locomotive Scroll in a single demo | Not started |
| P2-02 | Pin-based animations | Not started |
| P2-03 | Horizontal scroll section | Not started |
| P2-04 | Reusable animation hook | Not started |
| P2-05 | Mobile-responsive animations | Not started |

### P3 - Future exploration

| ID | Requirement | Status |
|---|---|---|
| P3-01 | GSAP SplitText character-level animations | Not started |
| P3-02 | Custom cursor with magnetic effects | Not started |
| P3-03 | SVG path draw animations | Not started |

---

## Constraints

- No backend (static/client-side only)
- Must work with Next.js App Router + React 19
- GSAP free tier only

---

## Non-Goals

- Production deployment
- Tests
- CMS or content management
- i18n beyond Vietnamese text labels
