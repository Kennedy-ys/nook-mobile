import { useSettingsStore } from '../store/useSettingsStore';
import { useTheme } from './colors';

/**
 * One hook instead of repeating
 *   const themeMode = useSettingsStore((s) => s.themeMode);
 *   const { colors, isDark } = useTheme(themeMode);
 * in every component.
 */
export function useAppTheme() {
  const themeMode = useSettingsStore((s) => s.themeMode);
  return useTheme(themeMode);
}