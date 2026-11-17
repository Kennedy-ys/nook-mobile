import { useColorScheme } from 'react-native';

export interface ThemeTokens {
  readonly base: string;
  readonly blobs: readonly string[];
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
    base: '#0A0F1F', // screen background under the blobs
    blobs: ['rgba(60,110,255,0.55)', 'rgba(150,80,255,0.40)', 'rgba(20,200,180,0.30)'],
    glass: 'rgba(255,255,255,0.08)', // card / button fill
    border: 'rgba(255,255,255,0.18)',
    shadow: 'rgba(0,0,0,0.35)', // 0 8 32 blur
    text: '#F4F6FB',
    subtext: '#CDD3E1',
    accent: '#8DBBFF',
    onAccent: '#0A0F1F', // text/icons on an accent fill
    accentSelected: 'rgba(90,160,255,0.20)', // selected option card fill
    toggleOn: '#34C759',
    toggleOff: 'rgba(255,255,255,0.24)',
    segmentTrack: 'rgba(0,0,0,0.32)',
    segmentActive: 'rgba(255,255,255,0.20)',
    danger: '#FFC4BD',
    previewScene: ['#0B1F4D', '#1C4A9C', '#0A1330'], // island preview backdrop, top to bottom
  },
  light: {
    base: '#E8EEFC',
    blobs: ['rgba(90,140,255,0.45)', 'rgba(200,130,255,0.40)', 'rgba(60,210,190,0.35)'],
    glass: 'rgba(255,255,255,0.55)',
    border: 'rgba(255,255,255,0.85)',
    shadow: 'rgba(50,70,140,0.14)',
    text: '#14182A',
    subtext: '#3A4257',
    accent: '#1757C2',
    onAccent: '#FFFFFF',
    accentSelected: 'rgba(27,99,214,0.14)',
    toggleOn: '#1B8F42',
    toggleOff: 'rgba(20,24,42,0.26)',
    segmentTrack: 'rgba(20,24,42,0.08)',
    segmentActive: 'rgba(255,255,255,0.95)',
    danger: '#8A1B14',
    previewScene: ['#5B93EA', '#A9CDFF', '#DBE9FF'],
  },
};

export type ThemeMode = 'dark' | 'light';

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
