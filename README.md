# Nook Mobile

Mobile version of Nook by Adarzh - a Dynamic Island widget for Windows, rebuilt with React Native + Expo.

## Overview

A mobile application featuring:

- **Dynamic Island** - FSM-driven animated island with spring physics
- **Card System** - Music, Call, and Timer cards with equalizer and waveform visualizations
- **Glassmorphism UI** - Expo Blur for translucent glass effects
- **State Management** - Zustand stores for activity tracking and settings
- **Security** - Tripwire integrity checker for code integrity verification

## SDK & Dependencies

- Expo SDK 52
- React Native with TypeScript
- Reanimated v3 for UI-thread animations
- Zustand for state management
- MMKV for fast local persistence
- Expo Blur for glassmorphism

## Available Scripts

```bash
npx expo start          # start the dev server
npx expo lint           # lint
npx tsc --noEmit        # typecheck
npx jest                # run tests
npx expo-doctor         # diagnose dependency and config issues
```

## Testing

All 29 Jest tests pass across 3 test suites:
- `useSettingsStore` — 12 tests (visibilityMode, motionPreset, translucency, hapticsEnabled)
- `useActivityStore` — 10 tests (island state FSM, activity management)
- `physics` — 7 tests (motion presets: Smooth, Lively, Bouncy)

## Security

Tripwire integrity checker scans for injected code patterns (eval, atob, hidden unicode, long blobs, etc.). Pre-commit hook runs the check before every commit.

## License

MIT License (see LICENSE file)