# 05. Backend Schema & Architecture — Nook Mobile

## 1. Overview
This document defines the backend architecture, local storage schema, and event handling patterns for Nook Mobile. The mobile app currently operates client-side with mock event simulation. Backend integration is prepared for future synchronization (settings across devices, activity analytics, etc.).

---

## 2. Data Storage (Local-First Architecture)

We will use `react-native-mmkv` for synchronous local persistence and `Expo SecureStore` for sensitive user preferences (notifications permission tokens).

### 2.1 Settings Schema (`settings.json` stored in MMKV)
```ts
interface Settings {
  visibilityMode: 'Smart' | 'Fixed' | 'Hidden';
  motionPreset: 'Smooth' | 'Lively' | 'Bouncy';
  translucency: number;    // 0 - 100
  activeModules: {
    music: boolean;
    calls: boolean;
    timer: boolean;
    downloads: boolean;
    weather: boolean;
  };
  notchOffset: number;     // px offset from top
  hapticsEnabled: boolean;
  reducedMotionRespect: boolean;
}
```

### 2.2 Activity Queue Schema
```ts
interface ActivityItem {
  id: string;               // uuid
  type: 'Music' | 'Call' | 'Timer' | 'Download' | 'System';
  priority: number;         // 1 = Highest
  payload: Record<string, any>;
  createdAt: number;        // timestamp ms
  expiresAt?: number;
}
```

### 2.3 Secure Preferences
- Authentication tokens, notification channels → `expo-secure-store`.

---

## 3. Event Bus Architecture

All system-level events (music change, timer tick, call incoming) are emitted through a central `EventBus.ts` service.

```ts
export type AppEvent =
  | { type: 'MEDIA_CHANGED', payload: MediaMetadata }
  | { type: 'CALL_STARTED', payload: CallDetails }
  | { type: 'CALL_ENDED' }
  | { type: 'TIMER_TICK', payload: { remaining: number } }
  | { type: 'TIMER_COMPLETED' }
  | { type: 'SYSTEM_HUD', payload: { text: string } }
  | { type: 'DOWNLOAD_PROGRESS', payload: { percent: number } };
```

**Event Flow:**
`Native Listener` → `EventBridge` → `Zustand Store` → `Island FSM Renderer`.

---

## 4. Future Backend Integration

When cloud synchronization is required:
- **Supabase / Firebase:** Store user settings JSON in a single `user_settings` row per user.
- **Real-time Activities:** Activity telemetry pushed to an analytics endpoint.
- **Authentication:** Supabase Auth with JWT tokens (`expo-secure-store` persistence).

**File Structure for Future Backend:**
```
backend/
├── schema.sql         # Supabase / Postgres schema definitions
├── auth.js            # Auth service wrapper
└── api/               # API service layer for sync
```

---

## 5. Mock Event Simulator

The `MockEventSimulator.ts` service generates mock music metadata, call events, and timer ticks for sandbox testing in Expo Go (which doesn't support native OS listeners in the emulator).

### Mock Event Engine Capabilities:
- Auto-rotate music track every 30 seconds.
- Random call simulation (incoming call every 2-5 minutes).
- Timer auto-start presets for quick demos.

