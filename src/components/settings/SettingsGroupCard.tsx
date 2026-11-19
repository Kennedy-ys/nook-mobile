
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

import { useTheme } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';

interface SettingsGroupCardProps {
  children: React.ReactNode;
}

export const SettingsGroupCard: React.FC<
  SettingsGroupCardProps
> = ({ children }) => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const { isDark, colors } = useTheme(themeMode);

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <BlurView
        intensity={isDark ? 25 : 40}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.cardInner,
          {
            backgroundColor: colors.glass,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
};

export const SettingsDivider: React.FC = () => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const { isDark } = useTheme(themeMode);

  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: isDark
            ? 'rgba(255, 255, 255, 0.14)'
            : 'rgba(0, 0, 0, 0.06)',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 3,
  },

  cardInner: {
    flex: 1,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    marginLeft: 16,
  },
});
