import { Stack } from 'expo-router';
import { useAppTheme } from '../../theme/useAppTheme';

// Nested stack = native swipe-back, Android back button, slide transitions,
// and deep links like myapp://settings/weather, all for free.
export default function SettingsLayout() {
  const { colors } = useAppTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false, // SettingsPage renders its own header
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.base },
      }}
    />
  );
}