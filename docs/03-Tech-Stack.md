# 03. Tech Stack & Architecture — Nook Mobile

## 1. Technology Selection Matrix

| Layer | Technology | Justification |
|---|---|---|
| **Core Framework** | **React Native + Expo ~58.0.25** | Current project uses the installed Expo 58 toolchain with a modern React Native 0.88 runtime. |
| **Animation Engine** | **`react-native-reanimated` v4** | Runs spring-driven transitions on the UI thread and matches the current repo implementation (`4.7.1`). |
| **Graphics & Audio FX** | **Planned / optional visual layer** | The repo currently keeps the island lightweight; visual effects are implemented through lightweight UI and motion patterns rather than a full Skia stack at this moment. |
| **Gesture Management** | **`react-native-gesture-handler`** | Handles tap and gesture-based island interactions in the current app shell. |
| **Color Extraction** | **Planned / optional enhancement** | Dynamic palette extraction is part of the product vision, but it is not the active runtime dependency in this codebase today. |
| **Haptic Feedback** | **`expo-haptics`** | Delivers tactile feedback for state changes and activity actions. |
| **State & Persistence** | **Zustand + `@react-native-async-storage/async-storage`** | The live app persists settings and activity state through AsyncStorage via Zustand middleware. |
| **Icons & Typography** | **`@expo/vector-icons`** | Used for crisp, modern vector icons in the glass UI. |

---

## 2. Directory & File Organization

```
DynamicBar/
├── assets/                  # App icons, splash screen, audio samples, static images
│   ├── icon.png
│   ├── splash.png
│   └── adaptive-icon.png
├── docs/                    # Project documentation suite
│   ├── 01-PRD.md
│   ├── 02-App-Flow.md
│   ├── 03-Tech-Stack.md
│   ├── 04-Frontend-Guidelines.md
│   ├── 05-Backend-Schema.md
│   ├── 06-Implementation-Plan.md
│   └── STATUS.md
├── src/                     # Application source code
│   ├── components/          # Reusable UI components
│   │   ├── island/          # Island core components
│   │   │   ├── DynamicIsland.tsx      # Main wrapper & FSM container
│   │   │   ├── CompactPill.tsx        # Single activity pill
│   │   │   ├── SplitBubble.tsx        # Secondary detached bubble
│   │   │   ├── ExpandedCardDeck.tsx   # Card container & horizontal swipe
│   │   │   └── TransientToast.tsx     # System HUD toast overlay
│   │   ├── cards/           # Expanded card content views
│   │   │   ├── MusicCard.tsx          # Expanded media player
│   │   │   ├── CallCard.tsx           # Active call dashboard
│   │   │   ├── TimerCard.tsx          # Dual timer & stopwatch
│   │   │   ├── TodayCard.tsx          # Weather & date overview
│   │   │   └── DownloadCard.tsx       # Download manager
│   │   ├── visualizers/     # Skia graphics & animation helpers
│   │   │   ├── EqualizerBars.tsx      # Audio visualizer bars
│   │   │   └── VoiceWaveform.tsx      # Call microphone wave
│   │   └── ui/              # Atom UI elements (buttons, sliders, toggles)
│   │       ├── GlassView.tsx          # Blur container wrapper
│   │       ├── SpringButton.tsx       # Interactive tactile button
│   │       └── CustomSlider.tsx       # Smooth range slider
│   ├── hooks/               # Custom React hooks
│   │   ├── useIslandState.ts          # State machine coordinator
│   │   ├── useSpringPhysics.ts        # Dynamic reanimated spring configs
│   │   ├── useMediaSession.ts         # Mock/native media events
│   │   ├── useTimerEngine.ts          # Timer & stopwatch state
│   │   └── useColorPalette.ts         # Image color extraction
│   ├── services/            # Native services & mock event generators
│   │   ├── EventBus.ts                # App-wide event emitter
│   │   ├── MockEventSimulator.ts      # Demo activity trigger engine
│   │   └── SystemNotificationService.ts # HUD toast event queue
│   ├── store/               # Global Zustand state stores
│   │   ├── useSettingsStore.ts        # Customization preferences & physics
│   │   └── useActivityStore.ts        # Active tasks queue & priorities
│   ├── theme/               # Design tokens, colors & typography
│   │   ├── colors.ts                  # Color palettes & gradients
│   │   ├── physics.ts                 # Spring physics presets
│   │   └── typography.ts              # Font scales & line heights
│   └── utils/               # Helper utilities & formatters
│       ├── formatTime.ts              # MM:SS timer formatters
│       └── layout.ts                  # Notch dimensions & status bar height
├── App.tsx                  # Root app entry & sandbox container
├── app.json                 # Expo config manifest
├── package.json             # NPM dependencies & scripts
├── tsconfig.json            # TypeScript compiler configuration
└── babel.config.js          # Babel config (Reanimated plugin setup)
```

---

## 3. Current persistence model

The live app uses Zustand with `persist` + `AsyncStorage` for local state. The project has `react-native-mmkv` installed, but the active implementation stores values through `@react-native-async-storage/async-storage` in the current Zustand stores.

### Storage keys in current implementation
- `nook-settings`: persisted settings including visibility mode, motion preset, translucency, notch offset, and haptics preferences.
- `nook-activity`: persisted island state and active activity list.

---

## 4. Native Development Setup Commands

```bash
# Initialize or refresh an Expo app
npx expo install react-native-reanimated react-native-gesture-handler expo-haptics expo-blur react-native-safe-area-context @react-native-async-storage/async-storage

# Add the app state layer and icon package used in this repo
npx expo install zustand @expo/vector-icons
```
