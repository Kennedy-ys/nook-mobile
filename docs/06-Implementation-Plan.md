# 06. Implementation Plan & Roadmap — Nook Mobile

## Overview
This document breaks the development of Nook Mobile into manageable phases, each with task IDs, deliverables, and milestone checkpoints.

---

## Phase 1: Foundation & Island Skeleton (Weeks 1-2)
**Goal:** Build the core island UI skeleton with Reanimated physics engine.

| ID | Task | Deliverable |
|---|---|---|
| P1-01 | Initialize Expo project with TypeScript, React Native Reanimated v3, Gesture Handler, Skia. | Working blank app with Expo start. |
| P1-02 | Design `DynamicIsland.tsx` wrapper component & finite state machine (FSM). | Island state transitions (idle → compact → expanded). |
| P1-03 | Implement physics engine hook `useSpringPhysics`. | Smooth / Lively / Bouncy presets. |
| P1-04 | Build `GlassView` component with `expo-blur`. | Glassmorphism test card. |
| **Milestone 1:** Island prototype rendering with dummy pills. |

---

## Phase 2: Music Activity MVP (Weeks 3-4)
**Goal:** Functional music module with visualizers.

| ID | Task | Deliverable |
|---|---|---|
| P2-01 | Implement `MusicCard` expanded card with Skia equalizer bars. | Live animated bars with dummy data. |
| P2-02 | Integrate `react-native-image-colors` for dynamic palette extraction. | Album color tint test. |
| P2-03 | Build `MockEventSimulator` for media change events. | Auto-rotating mock tracks demo. |
| **Milestone 2:** Fully working music pill & card demo. |

---

## Phase 3: Multi-Activity & Gesture System (Weeks 5-6)
**Goal:** Multi-split bubble logic, swipe navigation, gesture pass-through.

| ID | Task | Deliverable |
|---|---|---|
| P3-01 | Implement multi-activity priority engine in `useActivityStore.ts`. | Multi-split bubble demo. |
| P3-02 | Build swipeable `ExpandedCardDeck` for horizontal card navigation. | Card swipe between Music / Timer / Today. |
| P3-03 | Add transient HUD toast renderer for system events. | Volume change HUD demo. |
| **Milestone 3:** Multi-activity split mode functioning. |

---

## Phase 4: Full Feature Integration & Settings Sandbox (Weeks 7-8)
**Goal:** Integrate timer/stopwatch, calls, downloads, and full settings preview.

| ID | Task | Deliverable |
|---|---|---|
| P4-01 | Build `TimerCard` with dual timer + stopwatch support. | Functional countdown & lap timer. |
| P4-02 | Build `CallCard` with live duration and voice wave visualizer. | Call mock demo. |
| P4-03 | Build Settings app with Live Preview of island. | Settings app rendering mock island. |
| P4-04 | Integrate haptics for state transitions. | Haptic feedback polish. |
| **Milestone 4:** Fully integrated app with demo sandbox. |

---

## Phase 5: Polish, Testing & Release Prep (Weeks 9-10)
- Accessibility pass (screen readers, contrast, reduced motion).
- Battery & CPU profiling using Expo Dev Tools.
- Beta testing with real devices.

