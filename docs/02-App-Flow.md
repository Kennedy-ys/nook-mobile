# 02. App Flow & State Machine — Nook Mobile

## 1. Overall System Architecture & Navigation Flow

The app architecture consists of two main visual layers:
1. **The Floating Overlay (Nook Island):** A persistent native window layer running on top of all application contexts.
2. **The App Dashboard & Sandbox:** A full-screen React Native application for configuration, activity management, and live interactive previews.

```
+-----------------------------------------------------------------------+
|                           Nook Mobile App                             |
+-----------------------------------------------------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
+-----------------------+                       +-----------------------+
|  Top Island Overlay   |                       | Settings & Sandbox    |
| (Always On Top HUD)   |                       |  Configuration App    |
+-----------------------+                       +-----------------------+
  | (Morph States)                                | (Tab Navigation)
  +---> Idle / Hidden                             +---> Live Preview
  +---> Compact Pill                              +---> Activities Toggle
  +---> Multi-Bubble                              +---> Physics Customizer
  +---> Expanded Card                             +---> Permissions Wizard
  +---> Transient HUD Toast                       +---> Appearance & Notch
```

---

## 2. Dynamic Island State Machine

The island behaves as a finite state machine (FSM) governed by active application events, user gestures, and activity priority rules.

```
       [ No Active Tasks ]
               |
               v
         +-----------+    Event Arrives    +------------------+
         |   IDLE    | ------------------> |   COMPACT PILL   |
         +-----------+                     +------------------+
               ^                                  |      |
               | Dismiss                          |      | 2nd Activity Starts
               |                                  |      v
         +-----------+    Swipe Up / Timeout     |  +------------------+
         | TRANSIENT | <-------------------------+  | MULTI-SPLIT BUBBLE|
         | HUD TOAST |                              +------------------+
         +-----------+                                   |
               ^                                         | Long Press / Tap
               | Hardware Key Press                      v
               +---------------------------------- +------------------+
                                                   |  EXPANDED CARD   |
                                                   +------------------+
```

### State Matrix Definitions

| State Name | Trigger / Condition | Visual Representation | Interaction & Gesture |
|---|---|---|---|
| **IDLE** | No active background task & Smart Mode enabled | Invisible or 8px thin dot at notch | Tap to activate manual quick cards |
| **COMPACT PILL** | 1 active activity (Music, Call, or Timer) | Rounded black pill (`40px` height) with icon, text & visualizer | Tap → Small Expansion<br>Long Press → Full Card |
| **MULTI-SPLIT BUBBLE** | 2+ active activities simultaneously | Primary activity in main pill (`180px` wide), Secondary in detached bubble (`40px` circle) | Tap main → Main Card<br>Tap bubble → Secondary Card |
| **EXPANDED CARD** | User tap/long-press on pill | Large floating card (`200px`-`320px` height) with full controls | Swipe Left/Right → Change Tabs<br>Swipe Up → Collapse to Pill |
| **TRANSIENT HUD** | System trigger (Volume, Battery, Wi-Fi, Clipboard) | Medium banner expanding downwards from top notch for 2 seconds | Auto-dismisses after timeout or Swipe Up |

---

## 3. User Journeys

### Journey 1: Controlling Background Music
1. User starts playing music in Spotify / Apple Music.
2. Nook Island detects active media session via native listener.
3. Island smoothly expands into **Compact Music Pill** with extracted album art accent colors and Skia equalizer.
4. User **long-presses** the pill → Island morphs into **Expanded Music Card** showing track scrubber, volume control, and playback controls.
5. User adjusts volume slider, taps **Next Track**, then **swipes up** → Card collapses back into Compact Pill.

### Journey 2: Concurrent Call and Timer (Multi-Split Mode)
1. User receives an incoming call → Island surfaces **Call Pill** with live duration timer.
2. While on the call, user starts a 5-minute tea timer.
3. Priority Engine assigns **Call** to Main Pill (Left) and **Timer** to Secondary Detached Bubble (Right).
4. Tapping the Timer bubble opens the **Timer Control Card**; tapping outside collapses it back to split mode.

### Journey 3: Adjusting Island Motion Physics in Sandbox
1. User opens the Nook Settings app.
2. User selects the **Motion Feel** tab.
3. A live interactive test island renders at the top of the preview area.
4. User switches between `Smooth`, `Lively`, and `Bouncy` options.
5. User taps "Trigger Test Call" button → Sandbox triggers mock call animation using the active physics parameters in real time.

---

## 4. Gesture Rules & Touch Pass-Through
- **Pill Touch Region:** Only the exact bounds of the active island pill register touch gestures.
- **Background Touch Region (`pointerEvents="box-none"`):** All empty space around the island passes touches directly to underlying apps (home screen, web browser, games).
- **Horizontal Swipe on Expanded Card:** Switches between active card modules (Music ↔ Timer ↔ Today/Weather ↔ Downloads).
- **Vertical Swipe Up on Any Card:** Immediately collapses expanded card back to compact pill state with spring damping.
