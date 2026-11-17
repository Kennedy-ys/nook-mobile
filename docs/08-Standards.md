# Nook Mobile Standards

This file defines the engineering standards for this repository. It is intentionally grounded in the actual app architecture in this project: Expo + React Native, Zustand local state, and a motion-first dynamic island UI.

## 1. Project intent

Nook Mobile is a top-of-screen dynamic island experience for mobile devices. The app is meant to feel lightweight, fluid, and non-intrusive while surfacing active music, calls, timers, downloads, and transient system notifications.

The codebase should preserve that intent in every change:

- keep the island subtle when idle
- keep interactions fast and spring-driven
- avoid heavy, blocking UI work on the JS thread
- prefer local-first state over cloud/database complexity unless the feature explicitly requires it

## 2. Architecture and responsibilities

### 2.1 Feature boundaries

Use the existing structure from the repo as the default layout:

- `src/components/island/` for the floating island FSM and overlay shell
- `src/components/cards/` for expanded activity cards like music, calls, and timers
- `src/components/ui/` for reusable surface primitives
- `src/hooks/` for animation and interaction hooks
- `src/store/` for Zustand state and persistence
- `src/services/` for mock or event-driven app logic
- `src/theme/` for animation and visual configuration
- `src/utils/` for helper functions

Do not introduce a server architecture or backend folder unless the task specifically needs it. This repo is not built around a full API stack; it is a client-side, local-first mobile app.

### 2.2 State flow

- Store state lives in Zustand stores under `src/store/`.
- Persisted settings should use the same pattern as `useSettingsStore.ts` and `useActivityStore.ts`.
- Event-driven flows should pass through actions and store updates rather than ad hoc component-local state when the value affects the island UI or app-wide behavior.
- Components should render from state, not own long-lived business logic.

## 3. TypeScript and React Native standards

- Keep TypeScript strict mode enabled; do not weaken `tsconfig.json`.
- Do not use `any`. Use `unknown` and narrow when necessary.
- Do not use `enum`; prefer string unions and `as const` objects.
- Use `type` for data models and `interface` for component props and public contracts.
- Type all function boundaries: props, hook returns, service inputs/outputs, store actions, and mock event payloads.
- Handle async errors explicitly; never allow unhandled promise rejections.
- Keep values predictable and small. Prefer explicit, serializable payloads for island events and settings updates.

## 4. Naming conventions

- Components and files use PascalCase, such as `DynamicIsland.tsx` and `MusicCard.tsx`.
- Hooks, helpers, and services use camelCase and start with `use` when they are hooks, such as `useSpringPhysics.ts`.
- Store files use the repo's current naming pattern: `useSettingsStore.ts` and `useActivityStore.ts`.
- Keep file names aligned with the module's role; do not create broad generic names like `utils.ts` for feature logic.

## 5. Import and code organization

- Prefer the repo's existing relative structure over introducing new architecture layers.
- Keep imports clean and intentional.
- Import types with `import type` when possible.
- Avoid deep cross-layer coupling. A component should not reach into unrelated stores or service internals that do not define its behavior.
- Keep features co-located when possible inside the existing folders: island logic with island UI, card logic with card UI, settings logic with settings store.

## 6. UI and animation standards

### 6.1 Motion-first design

This project is built around motion as a feature, not as decoration.

- Use `react-native-reanimated` for island transitions and spring-driven UI behavior.
- Keep animation logic in dedicated hooks or component-local animation code rather than burying it inside render logic.
- Favor spring-based transitions that preserve the smooth top-screen sensation.
- Avoid expensive work on every frame when the island is idle or collapsed.

### 6.2 Component behavior

- Components should render UI; they should not own app-state orchestration unless the logic is local and minimal.
- Keep reusable UI atoms in `src/components/ui/` and keep feature-specific widgets in `src/components/cards/`.
- The island should remain lightweight and non-blocking; interactions should not force the rest of the app to re-render unnecessarily.

### 6.3 Styling

- Use React Native `StyleSheet` and theme-driven values where the repo already defines them.
- Keep visuals consistent with the existing glassmorphism and translucent look.
- Do not add ad hoc design tokens without a clear reason or a matching use in the island UI.

## 7. State and persistence standards

- Treat local persistence as a first-class part of the app, not a convenience layer.
- Settings and activity state should be stored in the same patterns used by `persist`-based Zustand stores.
- Use small, explicit store slices rather than one giant global state object.
- Keep event payloads simple and serializable so they are easy to test and easy to debug.

## 8. Services and mock data

- Place app-side behavior in services only when it is reusable, testable, and not UI-only.
- The `MockEventSimulator.ts` pattern is the repo's model for demo and simulation flows.
- Services should be deterministic enough to be exercised in Jest tests when possible.
- Do not add network or auth layers unless the feature explicitly requires them.

## 9. Testing and validation

Before declaring work complete, run the checks the repo already expects:

```bash
npx expo lint
npx tsc --noEmit
npx jest
npm run check:integrity
```

If a change affects island animation, store behavior, or visual state transitions, add or update focused tests in the relevant area.

## 10. Security and integrity

This repo includes an integrity guard and pre-commit enforcement. Treat those as required:

- keep `scripts/check-integrity.mjs` effective and avoid weakening it for convenience
- do not add suspicious runtime code patterns or hidden execution paths
- do not log secrets, tokens, or user-sensitive state
- keep changes explicit and reviewable

## 11. Contribution expectations

- Keep changes scoped to the relevant feature.
- Update the related docs when behavior changes materially.
- Match the repo's current naming and organization before inventing new abstractions.
- Prefer small, surgical edits over large rewrites unless the task clearly demands it.

## 12. Working rules for this repo

When making changes in nook-mobile:

1. Keep the product mobile-first and ambient.
2. Preserve the motion and glassmorphism language.
3. Prefer existing Zustand + Reanimated patterns over new frameworks.
4. Validate with the repo's lint, typecheck, and Jest flow.
5. Do not drift into unrelated web or backend conventions that do not fit this project.

These standards are not a generic app rulebook. They are the rules for building and maintaining this Expo React Native dynamic island product without losing its compact, elegant user experience.
