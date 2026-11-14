# 03. Tech Stack & Architecture — Nook Mobile

## 1. Technology Selection Matrix

| Layer | Technology | Justification |
|---|---|---|
| **Core Framework** | **React Native + Expo SDK 52** | Cross-platform flexibility, fast iteration, modern native architecture (New Architecture / Fabric ready). |
| **Animation Engine** | **`react-native-reanimated` v3** | Drives 60/120fps physics-based spring animations directly on the UI thread without crossing the JS bridge. |
| **Graphics & Audio FX** | **`@shopify/react-native-skia`** | Enables hardware-accelerated real-time audio visualizers, smooth waveforms, and dynamic gradient blurs. |
| **Gesture Management** | **`react-native-gesture-handler`** | Handles multi-touch pan, swipe, tap, and long-press interactions with native responsiveness. |
| **Color Extraction** | **`react-native-image-colors`** | Extracts primary/secondary color palettes from artwork thumbnails in real-time for dynamic tinting. |
| **Haptic Feedback** | **`expo-haptics`** | Delivers tactile feedback for button presses, card expansions, and slider snaps. |
| **State & Persistence** | **Zustand + `react-native-mmkv`** | Ultra-fast synchronous key-value storage for settings, custom physics params, and widget states. |
| **Icons & Typography** | **`@expo/vector-icons` (Lucide / Feather)** | Crisp, modern vector icon set tailored for dark glassmorphic UI cards. |

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

## 3. Environment Variables & Storage Keys

### Storage Keys (`react-native-mmkv`)
- `NOOK_SETTINGS_V1`: User preferences (visibility mode, active modules, notch offset).
- `NOOK_PHYSICS_PRESET`: Active spring preset (`smooth` | `lively` | `bouncy`).
- `NOOK_THEME_CUSTOM`: Custom glassmorphism opacity, blur intensity, and border color.

---

## 4. Native Development Setup Commands

```bash
# Initialize Expo project with TypeScript template
npx create-expo-app@latest . --template blank-typescript

# Install Reanimated, Gesture Handler, Skia, Haptics, and MMKV
npx expo install react-native-reanimated react-native-gesture-handler @shopify/react-native-skia expo-haptics expo-blur react-native-mmkv

# Install icon sets and image palette extractor
npm install @expo/vector-icons react-native-image-colors zustand
```
