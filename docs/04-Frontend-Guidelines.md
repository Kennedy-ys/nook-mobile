# 04. Front-end Guidelines — Nook Mobile

## 1. Design System & Tokens

### 1.1 Core Principles
**Glassmorphism-first UI:** Translucent frosted glass blur (`expo-blur` / `react-native-skia BlurMask`) with layered shadows creates the floating island effect.

**Motion-driven UX:** Animations are first-class features. Every state transition uses `react-native-reanimated` spring physics rather than easing curves.

**Dynamic Color:** No static branding palette. Primary accent colors derive real-time from media content (album art) or system state (call active, timer warning).

### 1.2 Color Tokens
```ts
// theme/colors.ts
export const glass = {
  background: 'rgba(20, 20, 22, 0.35)',
  border: 'rgba(255, 255, 255, 0.12)',
  shadow: 'rgba(0, 0, 0, 0.45)',
};

export const state = {
  active: '#0A84FF',   // blue
  timer: '#FF375F',    // red
  music: '#30D158',    // green
  call: '#0A84FF',
  download: '#BF5AF2', // purple
};
```
**Extracted Palette Logic:** Album artwork passes through `react-native-image-colors` to generate primary / secondary / tertiary colors for seamless blend.

### 1.3 Typography
```ts
// theme/typography.ts
export const font = {
  // System fonts for native performance
  family: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  size: {
    pill: 14,
    cardTitle: 18,
    cardBody: 14,
  },
  weight: { regular: '400', medium: '500', semibold: '600' },
};
```

### 1.4 Component Hierarchy & Reusability
- **Atoms:** `GlassView`, `SpringButton`, `CustomSlider`, `ProgressRing`.
- **Composite:** `CompactPill`, `SplitBubble`, `ExpandedCardDeck`.
- **Templates:** `MusicCard`, `CallCard`, `TimerCard`.

All UI components accept `physicsPreset` prop → `{ damping, stiffness, mass }` to inherit motion feel from the global settings.

### 1.5 Accessibility
- Screen reader labels for all interactive elements (`accessibilityLabel`, `accessibilityHint`).
- Minimum contrast ratio 4.5:1 for text on blurred backgrounds.
- Haptic feedback on button presses and card expansions (`expo-haptics`).
- Respect OS Reduced Motion settings: fallback to instant transitions if enabled.

### 1.6 Performance Guidelines
- Offload all animation work to UI thread via Reanimated.
- Lazy-load Skia visualizers; pause Skia draw loops when not visible.
- Avoid re-renders using `useDerivedValue` and `useAnimatedStyle` in Reanimated.

