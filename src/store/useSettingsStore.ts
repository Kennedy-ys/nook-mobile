import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MotionPreset } from '../theme/physics';

export type VisibilityMode = 'Smart' | 'Fixed' | 'Hidden';

interface SettingsState {
  visibilityMode: VisibilityMode;
  motionPreset: MotionPreset;
  translucency: number;
  notchOffset: number;
  hapticsEnabled: boolean;
  setVisibilityMode: (mode: VisibilityMode) => void;
  setMotionPreset: (preset: MotionPreset) => void;
  setTranslucency: (val: number) => void;
  setNotchOffset: (offset: number) => void;
  setHapticsEnabled: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      visibilityMode: 'Smart',
      motionPreset: 'Smooth',
      translucency: 40,
      notchOffset: 0,
      hapticsEnabled: true,
      setVisibilityMode: (visibilityMode) => set({ visibilityMode }),
      setMotionPreset: (motionPreset) => set({ motionPreset }),
      setTranslucency: (translucency) => set({ translucency }),
      setNotchOffset: (notchOffset) => set({ notchOffset }),
      setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),
    }),
    {
      name: 'nook-settings',
      storage: createJSONStorage(() => {
        // MMKV will be provided by the mock in tests
        return {
          getItem: (name: string) => {
            try {
              const storage = require('react-native-mmkv').MMKV;
              return storage.getString(name) || null;
            } catch {
              return null;
            }
          },
          setItem: (name: string, value: string) => {
            try {
              const storage = require('react-native-mmkv').MMKV;
              storage.set(name, value);
            } catch {
              // Ignore in test environment
            }
          },
          removeItem: (name: string) => {
            try {
              const storage = require('react-native-mmkv').MMKV;
              storage.delete(name);
            } catch {
              // Ignore
            }
          },
        };
      }),
    }
  )
);
