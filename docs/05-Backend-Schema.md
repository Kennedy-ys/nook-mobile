# 05. Backend Schema & Architecture — Nook Mobile

## 1. Overview
This document defines the backend architecture, local storage schema, and event handling patterns for Nook Mobile. The mobile app currently operates client-side with mock event simulation. Backend integration is prepared for future synchronization (settings across devices, activity analytics, etc.).

---

## 2. Data Storage (Current Local-First Architecture)

The live app persists state with Zustand + `@react-native-async-storage/async-storage`. No secure token store is currently active in this repo; that remains a future enhancement.

### 2.1 Settings Schema (current Zustand store)
```ts
interface Settings {
  visibilityMode: 'Smart' | 'Fixed' | 'Hidden';
  motionPreset: 'Smooth' | 'Lively' | 'Bouncy';
  translucency: number;    // 0 - 100
  notchOffset: number;    // px offset from top
  hapticsEnabled: boolean;
}
```

This is implemented by `useSettingsStore.ts` and persisted under the key `nook-settings`.

### 2.2 Activity Queue Schema
```ts
interface ActivityItem {
  id: string;
  type: 'music' | 'call' | 'timer' | 'download' | 'weather';
  title: string;
  subtitle?: string;
  iconName?: string;
  accentColor?: string;
  payload?: Record<string, unknown>;
}
```

This is implemented by `useActivityStore.ts` and persisted under the key `nook-activity`.

---

## 3. Event Flow Architecture

The current repo does not use a separate `EventBus.ts` service. Instead, activity transitions are driven by Zustand actions and mock events from `MockEventSimulator.ts`.

```ts
MockEventSimulator
  -> useActivityStore.addActivity / showTransient
  -> island render state (idle / compact / split / expanded / transient)
```

This keeps the runtime simple and mobile-first while still supporting state-driven update flows.

---

## 4. Future Backend Integration

This remains aspirational and not implemented in the current application:
- **Supabase / Firebase:** possible future sync layer for cross-device settings.
- **Real-time Activities:** telemetry or notification sync from a backend.
- **Authentication:** possible `expo-secure-store` usage for tokens if the app later adds auth.

The current repo intentionally stays local-first and client-only.

---

## 5. Mock Event Simulator

The `MockEventSimulator.ts` service generates mock music metadata, call events, and timer ticks for sandbox testing in Expo Go.

### Mock Event Engine Capabilities:
- Auto-rotate mock music tracks for the island preview.
- Simulated call and download activities.
- Transient toast events for testing HUD behavior.
- Activity actions that feed the live Zustand store without requiring native OS listeners.

