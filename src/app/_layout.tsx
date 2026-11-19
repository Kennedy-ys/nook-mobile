import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppTheme } from '../theme/useAppTheme';

export default function RootLayout() {
  const { isDark, colors } = useAppTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.base }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="settings" options={{ presentation: 'modal' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
