import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MotionPreset } from '../theme/physics';

export type VisibilityMode = 'Smart' | 'Fixed' | 'Hidden';
export type IslandBackground = 'black' | 'edge_shadow' | 'edge_tint';
export type DisplayTarget = 'main' | 'cursor';
export type ClickAction = 'open_card' | 'none';
export type WeatherUnits = 'C' | 'F';
export type ThemeSetting = 'system' | 'dark' | 'light';

export interface ActivitiesConfig {
  music: boolean;
  keepMusicVisible: boolean;
  calls: boolean;
  timer: boolean;
  downloads: boolean;
  clipboard: boolean;
  keyLocks: boolean;
  battery: boolean;
}

interface SettingsState {
  // Existing core settings
  visibilityMode: VisibilityMode;
  motionPreset: MotionPreset;
  translucency: number;
  notchOffset: number;
  hapticsEnabled: boolean;

  // Design additions
  themeMode: ThemeSetting;
  showCallsInFullscreen: boolean;
  launchAtLogin: boolean;
  displayTarget: DisplayTarget;
  showTrayIcon: boolean;
  islandBackground: IslandBackground;
  translucentPill: boolean;
  clickAction: ClickAction;
  activities: ActivitiesConfig;
  hideSystemVolumeHUD: boolean;
  scrollVolumeControl: boolean;
  weatherLocation: string;
  weatherUnits: WeatherUnits;
  showWeatherInIsland: boolean;
  computerName: string;
  isConnected: boolean;
  reconnectAutomatically: boolean;

  // Setters
  setVisibilityMode: (mode: VisibilityMode) => void;
  setMotionPreset: (preset: MotionPreset) => void;
  setTranslucency: (val: number) => void;
  setNotchOffset: (offset: number) => void;
  setHapticsEnabled: (enabled: boolean) => void;

  setThemeMode: (mode: ThemeSetting) => void;
  setShowCallsInFullscreen: (val: boolean) => void;
  setLaunchAtLogin: (val: boolean) => void;
  setDisplayTarget: (target: DisplayTarget) => void;
  setShowTrayIcon: (val: boolean) => void;
  setIslandBackground: (bg: IslandBackground) => void;
  setTranslucentPill: (val: boolean) => void;
  setClickAction: (action: ClickAction) => void;
  setActivityEnabled: (activity: keyof ActivitiesConfig, enabled: boolean) => void;
  setHideSystemVolumeHUD: (val: boolean) => void;
  setScrollVolumeControl: (val: boolean) => void;
  setWeatherLocation: (location: string) => void;
  setWeatherUnits: (units: WeatherUnits) => void;
  setShowWeatherInIsland: (val: boolean) => void;
  setComputerName: (name: string) => void;
  setIsConnected: (connected: boolean) => void;
  setReconnectAutomatically: (val: boolean) => void;
}

export const defaultActivities: ActivitiesConfig = {
  music: true,
  keepMusicVisible: true,
  calls: true,
  timer: true,
  downloads: true,
  clipboard: true,
  keyLocks: true,
  battery: true,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      visibilityMode: 'Smart',
      motionPreset: 'Smooth',
      translucency: 85,
      notchOffset: 0,
      hapticsEnabled: true,

      themeMode: 'system',
      showCallsInFullscreen: true,
      launchAtLogin: false,
      displayTarget: 'main',
      showTrayIcon: true,
      islandBackground: 'edge_tint',
      translucentPill: true,
      clickAction: 'open_card',
      activities: defaultActivities,
      hideSystemVolumeHUD: true,
      scrollVolumeControl: true,
      weatherLocation: 'San Francisco',
      weatherUnits: 'C',
      showWeatherInIsland: true,
      computerName: 'MacBook Pro',
      isConnected: true,
      reconnectAutomatically: true,

      setVisibilityMode: (visibilityMode) => set({ visibilityMode }),
      setMotionPreset: (motionPreset) => set({ motionPreset }),
      setTranslucency: (translucency) => set({ translucency }),
      setNotchOffset: (notchOffset) => set({ notchOffset }),
      setHapticsEnabled: (hapticsEnabled) => set({ hapticsEnabled }),

      setThemeMode: (themeMode) => set({ themeMode }),
      setShowCallsInFullscreen: (showCallsInFullscreen) => set({ showCallsInFullscreen }),
      setLaunchAtLogin: (launchAtLogin) => set({ launchAtLogin }),
      setDisplayTarget: (displayTarget) => set({ displayTarget }),
      setShowTrayIcon: (showTrayIcon) => set({ showTrayIcon }),
      setIslandBackground: (islandBackground) => set({ islandBackground }),
      setTranslucentPill: (translucentPill) => set({ translucentPill }),
      setClickAction: (clickAction) => set({ clickAction }),
      setActivityEnabled: (activity, enabled) =>
        set((state) => ({
          activities: {
            ...state.activities,
            [activity]: enabled,
          },
        })),
      setHideSystemVolumeHUD: (hideSystemVolumeHUD) => set({ hideSystemVolumeHUD }),
      setScrollVolumeControl: (scrollVolumeControl) => set({ scrollVolumeControl }),
      setWeatherLocation: (weatherLocation) => set({ weatherLocation }),
      setWeatherUnits: (weatherUnits) => set({ weatherUnits }),
      setShowWeatherInIsland: (showWeatherInIsland) => set({ showWeatherInIsland }),
      setComputerName: (computerName) => set({ computerName }),
      setIsConnected: (isConnected) => set({ isConnected }),
      setReconnectAutomatically: (reconnectAutomatically) => set({ reconnectAutomatically }),
    }),
    {
      name: 'nook-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
