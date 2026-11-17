# 04. Front-end Guidelines — Nook Mobile

## 1. Design System & Tokens

This file captures the intended front-end direction for the product. It should be read as the design target for the experience, not as a literal description of every current runtime dependency.

### 1.1 Core Principles
**Glassmorphism-first UI:** Translucent frosted glass blur (`expo-blur` / `react-native-skia BlurMask`) with layered shadows creates the floating island effect.

**Motion-driven UX:** Animations are first-class features. Every state transition uses `react-native-reanimated` spring physics rather than easing curves.

**Dynamic Color:** The settings UI uses a fixed, theme-aware palette (dark and light, see 1.2). Colour that changes at runtime is limited to the island itself: it derives from media content (album art) or system state (call active, timer warning).

### 1.2 Color Tokens
Tokens mirror the approved mobile designs: every surface is frosted glass over a soft colour-blob backdrop, and every token has a **dark** and a **light** value. Components read colours from `useTheme()` (driven by the OS colour scheme) and never hard-code hex values.

```ts
// theme/colors.ts
export const theme = {
  dark: {
    base: '#0A0F1F',                      // screen background under the blobs
    blobs: ['rgba(60,110,255,0.55)', 'rgba(150,80,255,0.40)', 'rgba(20,200,180,0.30)'],
    glass: 'rgba(255,255,255,0.08)',      // card / button fill
    border: 'rgba(255,255,255,0.18)',
    shadow: 'rgba(0,0,0,0.35)',           // 0 8 32 blur
    text: '#F4F6FB',
    subtext: '#CDD3E1',
    accent: '#8DBBFF',
    onAccent: '#0A0F1F',               // text/icons on an accent fill
    accentSelected: 'rgba(90,160,255,0.20)', // selected option card fill
    toggleOn: '#34C759',
    toggleOff: 'rgba(255,255,255,0.24)',
    segmentTrack: 'rgba(0,0,0,0.32)',
    segmentActive: 'rgba(255,255,255,0.20)',
    danger: '#FFC4BD',
    previewScene: ['#0B1F4D', '#1C4A9C', '#0A1330'], // island preview backdrop, top to bottom
  },
  light: {
    base: '#E8EEFC',
    blobs: ['rgba(90,140,255,0.45)', 'rgba(200,130,255,0.40)', 'rgba(60,210,190,0.35)'],
    glass: 'rgba(255,255,255,0.55)',
    border: 'rgba(255,255,255,0.85)',
    shadow: 'rgba(50,70,140,0.14)',
    text: '#14182A',
    subtext: '#3A4257',
    accent: '#1757C2',
    onAccent: '#FFFFFF',
    accentSelected: 'rgba(27,99,214,0.14)',
    toggleOn: '#1B8F42',
    toggleOff: 'rgba(20,24,42,0.26)',
    segmentTrack: 'rgba(20,24,42,0.08)',
    segmentActive: 'rgba(255,255,255,0.95)',
    danger: '#8A1B14',
    previewScene: ['#5B93EA', '#A9CDFF', '#DBE9FF'],
  },
};

// Glass recipe (both themes): blur radius 24, saturation 1.6, 1px `border`, `shadow` below.
// With expo-blur, tune `intensity` until it visually matches a 24px blur.
export const blur = { radius: 24, saturation: 1.6 };

// The island itself is a physical black pill in both themes.
export const island = {
  pill: '#000000',
  pillText: '#FFFFFF',
  camera: '#15171D',
  cameraBorder: '#2A2D36',
};

// Live-activity colours. Tile = icon colour in settings (rendered at 20% opacity behind the icon).
// Pill = colour used inside the island while the activity is running.
export const state = {
  music:     { tile: '#EC4F7C', pill: '#FF9F0A', orb: ['#FFB347', '#FF5A1F'] }, // pill colours are the default; album-art colours override them
  call:      { tile: '#2FBF5B', pill: '#34C759' },
  timer:     { tile: '#F29A1F', pill: '#FF9F0A' },
  download:  { tile: '#2F86F0', pill: '#34C759', pillBg: '#1C5A2F' },            // check badge on completion
  clipboard: { tile: '#A45CF0', pill: '#A45CF0' },
  keyLocks:  { tile: '#6C7A92', pill: '#FFFFFF' },
  battery:   { tile: '#B58900', pill: '#FFD60A' },
  weather:   { tile: '#FFD60A', pill: '#FFD60A' },
};

// Connection status (header chip, status card, Connection screen)
export const connection = {
  connected: '#34C759',
  unreachable: '#FF9F0A',
};

// Island background styles (Appearance screen): accent edge/glow for "Edge + activity tint"
export const islandTint = { edge: '#2BD35C', fill: '#15351F' };
```
**Extracted Palette Logic:** Album artwork still passes through `react-native-image-colors` to generate primary / secondary / tertiary colors. Those override `state.music.pill` and `state.music.orb` at runtime; the values above are the fallbacks when no artwork is available. Settings chrome (`theme.*`) does not change with media.

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
- Minimum contrast ratio 4.5:1 for text on blurred backgrounds, 3:1 for icons and controls. The 1.2 tokens were checked against their worst case: glass over the base colour and over the centre of each backdrop blob. Verified pairs: `text`, `subtext` and `danger` on glass and base (4.5:1 or better); `onAccent` on `accent` (6.6:1 or better); `accent` and `toggleOn` on glass (3:1 or better). Re-run this check whenever a token changes.
- `accent` is for icons, borders and focus only; use `text` for anything readable. `danger` may be used as text.
- Haptic feedback on button presses and card expansions (`expo-haptics`).
- Respect OS Reduced Motion settings: fallback to instant transitions if enabled.

### 1.6 Performance Guidelines
- Offload all animation work to UI thread via Reanimated.
- Lazy-load Skia visualizers; pause Skia draw loops when not visible.
- Avoid re-renders using `useDerivedValue` and `useAnimatedStyle` in Reanimated.