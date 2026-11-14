# 01. Product Requirements Document (PRD) — Nook Mobile

## 1. Overview & Vision
**Nook Mobile** brings the fluid, non-intrusive "Dynamic Island / Top Bar" experience from desktop software (Nook by Adarzh) to mobile devices. It acts as an ambient HUD (Heads-Up Display) positioned at the top of the screen that dynamically expands, morphs, and splits to surface live activities, system notifications, media controls, and quick status utilities without interrupting the user's current app context.

---

## 2. Problem Statement
Mobile users constantly context-switch between full-screen applications to control background music, view active timer countdowns, check call durations, monitor downloads, or adjust system volume and battery states. Standard notification bars are static, text-heavy, and lack fluid interactive controls.

**Nook Mobile** solves this by offering an intelligent, gesture-driven, spring-animated island interface that stays out of the way when idle and expands into contextual control cards when interacted with.

---

## 3. Goals & Key Success Metrics
- **Fluidity:** Maintain a solid 60fps / 120fps animation pipeline driven on the native UI thread using React Native Reanimated v3.
- **Micro-Interactions:** Sub-50ms morphing response when switching between compact pills, multi-activity split bubbles, and expanded cards.
- **Customization:** Flexible physics presets (Smooth, Lively, Bouncy), visibility modes (Smart, Fixed, Hidden), and dynamic color extraction from album artwork.
- **Zero Overhead:** Pass-through touch events outside the active pill bounds so underlying mobile apps remain 100% interactive.

---

## 4. Target Audience & Personas
1. **Power Users & Multitaskers:** Want quick access to timers, media playback, and active call mute buttons without switching apps.
2. **Customization Enthusiasts:** Enjoy tailoring UI themes, motion elasticity, translucency, and status bar aesthetics.
3. **Audio & Podcast Listeners:** Value real-time audio visualizers, dynamic album-art palette matching, and seek controls.

---

## 5. Functional Requirements & Feature Breakdown

### 5.1 Core Island Component States
- **Idle State:** Compact pill auto-hides or shrinks to a minimal top notch indicator.
- **Single Activity Pill:** Displays ongoing activity (Music, Call, Timer, Download) with live animations.
- **Multi-Activity Split Bubble:** When 2+ activities occur simultaneously, the primary activity occupies the main pill while the secondary activity breaks off into a detached right bubble.
- **Expanded Card Deck:** Long-pressing or tapping the island opens full interactive control cards (Music Player, Call Dashboard, Timer/Stopwatch, Today/Weather).
- **Quick System Pop-up (Transient HUD):** Short 1.5s - 3.0s toast notifications (Volume change, Battery state, Wi-Fi/Bluetooth connections, Clipboard copy, Screenshot preview).

### 5.2 Activity Modules

#### A. Music & Audio Activity
- Album art thumbnail with dynamic palette tinting (`react-native-image-colors`).
- Marquee track title & artist name.
- Real-time animated equalizer bars using `@shopify/react-native-skia`.
- Expanded Card: Scrubbing track bar, play/pause, next/previous, and audio output selector.

#### B. Calls Activity
- Live call duration timer (`MM:SS`).
- Animated mic voice wave visualizer responding to voice activity.
- Quick action: Mute / Unmute microphone.
- Expanded Card: Caller ID / Service tag (WhatsApp, Teams, Zoom, Cellular), Speakerphone toggle, End Call button.

#### C. Dual Timer & Stopwatch Activity
- Side-by-side run capability.
- Primary pill displays active countdown; secondary bubble displays stopwatch.
- Expanded Card: Start/Pause/Reset, Lap splits, and quick timer presets (+1m, +5m, +10m).

#### D. Downloads Activity
- Circular progress indicator during active file downloads.
- Completion notification with "Open" and "Share" quick buttons.

### 5.3 Customization & Settings Sandbox
- **Visibility Options:**
  - `Smart`: Auto-hides when no activity is active; pops up for notifications.
  - `Fixed`: Always visible top status pill.
  - `Hidden`: Only surfaces critical system alerts.
- **Motion Physics Engine:**
  - `Smooth`: High damping, professional Apple-like response.
  - `Lively`: Snappy, medium spring frequency.
  - `Bouncy`: Elastic, high-rebound spring feedback.
- **Aesthetics:** Translucency percentage, border glow, shadow depth, and height offset to align with various physical camera notches.

---

## 6. Non-Functional Requirements
- **Performance:** CPU usage under 3% when idle; RAM footprint under 60MB.
- **Battery Efficiency:** Pause Skia canvas render loops when island is hidden or collapsed.
- **Accessibility:** High-contrast text options, screen reader accessibility labels, and haptic feedback integration (`expo-haptics`).
- **Cross-Platform Readiness:** Designed for Expo (iOS & Android) with fallback support for standard status bars.
