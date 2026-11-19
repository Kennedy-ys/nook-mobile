import { useColorScheme } from 'react-native';

export interface ThemeTokens {
  readonly base: string;
  readonly glass: string;
  readonly border: string;
  readonly shadow: string;
  readonly text: string;
  readonly subtext: string;
  readonly accent: string;
  readonly onAccent: string;
  readonly accentSelected: string;
  readonly toggleOn: string;
  readonly toggleOff: string;
  readonly segmentTrack: string;
  readonly segmentActive: string;
  readonly danger: string;
  readonly previewScene: readonly string[];
}

export const theme: { dark: ThemeTokens; light: ThemeTokens } = {
  dark: {
    base: '#1C1D20', // plain charcoal screen background
    glass: 'rgba(255,255,255,0.07)', // card / button fill
    border: 'rgba(255,255,255,0.13)',
    shadow: 'rgba(0,0,0,0.40)', // 0 8 32 blur, plus a 1px inner top highlight rgba(255,255,255,0.08)
    text: '#F2F3F5',
    subtext: '#CDD3E1',
    accent: '#6AA8FF',
    onAccent: '#0A0F1F', // text/icons on an accent fill
    accentSelected: 'rgba(90,160,255,0.20)', // selected option card fill
    toggleOn: '#34C759',
    toggleOff: 'rgba(255,255,255,0.24)',
    segmentTrack: 'rgba(0,0,0,0.30)',
    segmentActive: 'rgba(255,255,255,0.16)',
    danger: '#FF6B61',
    previewScene: ['#0B1F4D', '#1C4A9C', '#0A1330'], // island preview backdrop, top to bottom
  },
  light: {
    base: '#EEF0F3', // plain light grey screen background
    glass: 'rgba(255,255,255,0.65)',
    border: 'rgba(20,24,42,0.10)', // dark hairline: a white border disappears on a light base
    shadow: 'rgba(20,24,42,0.10)', // 0 8 24 blur, plus a 1px inner top highlight rgba(255,255,255,0.9)
    text: '#14182A',
    subtext: '#3A4257',
    accent: '#1B63D6',
    onAccent: '#FFFFFF',
    accentSelected: 'rgba(27,99,214,0.14)',
    toggleOn: '#1B8F42',
    toggleOff: 'rgba(20,24,42,0.26)',
    segmentTrack: 'rgba(20,24,42,0.07)',
    segmentActive: 'rgba(255,255,255,0.95)',
    danger: '#C9302A',
    previewScene: ['#5B93EA', '#A9CDFF', '#DBE9FF'],
  },
};

export type ThemeMode = 'dark' | 'light';

// Glass recipe (both themes): translucent `glass` fill, blur radius 24, saturation 1.6, 1px `border`, `shadow` below.
// On a flat base the blur is only visible where content sits behind the glass (scrolling lists, the island preview), so `border`, `shadow` and the inner highlight carry the glass look.
// With expo-blur, tune `intensity` until it visually matches a 24px blur.
export const blur = { radius: 24, saturation: 1.6 };

export const island = {
  pill: '#000000',
  pillText: '#FFFFFF',
  camera: '#15171D',
  cameraBorder: '#2A2D36',
} as const;

export const state = {
  music: { tile: '#EC4F7C', pill: '#FF9F0A', orb: ['#FFB347', '#FF5A1F'] },
  call: { tile: '#2FBF5B', pill: '#34C759' },
  timer: { tile: '#F29A1F', pill: '#FF9F0A' },
  download: { tile: '#2F86F0', pill: '#34C759', pillBg: '#1C5A2F' },
  clipboard: { tile: '#A45CF0', pill: '#A45CF0' },
  keyLocks: { tile: '#6C7A92', pill: '#FFFFFF' },
  battery: { tile: '#B58900', pill: '#FFD60A' },
  weather: { tile: '#FFD60A', pill: '#FFD60A' },
} as const;

export const connection = {
  connected: '#34C759',
  unreachable: '#FF9F0A',
} as const;

export const islandTint = { edge: '#2BD35C', fill: '#15351F' } as const;

export function useTheme(forcedMode?: 'dark' | 'light' | 'system'): {
  mode: ThemeMode;
  colors: ThemeTokens;
  isDark: boolean;
} {
  const systemScheme = useColorScheme();
  let mode: ThemeMode = systemScheme === 'light' ? 'light' : 'dark';

  if (forcedMode === 'dark' || forcedMode === 'light') {
    mode = forcedMode;
  }

  return {
    mode,
    colors: theme[mode],
    isDark: mode === 'dark',
  };
}
