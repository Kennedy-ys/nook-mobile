import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';

interface SettingsGroupCardProps {
  children: React.ReactNode;
}

export const SettingsGroupCard: React.FC<SettingsGroupCardProps> = ({ children }) => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const { colors } = useTheme(themeMode);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.glass,
          borderColor: colors.border,
        },
      ]}
    >
      {children}
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
            ? 'rgba(255, 255, 255, 0.08)'
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
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    marginLeft: 16,
  },
});
