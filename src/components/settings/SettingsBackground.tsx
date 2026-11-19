import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';

interface SettingsBackgroundProps {
  children: React.ReactNode;
}

export const SettingsBackground: React.FC<
  SettingsBackgroundProps
> = ({ children }) => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const { colors, isDark } = useTheme(themeMode);

  // Subtle linear gradient for depth (visible where content scrolls behind glass)
  const gradientColors = isDark
    ? ['#1C1D20', '#25282C', '#1A1C20'] as const
    : ['#EEF0F3', '#F0F4FA', '#E8EDF5'] as const;

  return (
    <View style={[styles.container, { backgroundColor: colors.base }]}>
      {/* Gradient provides subtle depth */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  content: {
    flex: 1,
  },
});