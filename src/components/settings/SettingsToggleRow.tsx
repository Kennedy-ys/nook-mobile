import React from 'react';
import { StyleSheet, View, Text, Switch, Platform } from 'react-native';
import { useTheme } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';
import { triggerHaptic } from '../../utils/haptics';

interface SettingsToggleRowProps {
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
  iconTile?: {
    icon: React.ReactNode;
    color: string;
  };
}

export const SettingsToggleRow: React.FC<SettingsToggleRowProps> = ({
  title,
  subtitle,
  value,
  onValueChange,
  iconTile,
}) => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const { colors, isDark } = useTheme(themeMode);

  const handleToggle = (newVal: boolean) => {
    if (hapticsEnabled) {
      triggerHaptic('selection');
    }
    onValueChange(newVal);
  };

  return (
    <View style={styles.container}>
      {iconTile && (
        <View
          style={[
            styles.iconTile,
            {
              backgroundColor: iconTile.color + '26', // ~15-20% opacity
            },
          ]}
        >
          {iconTile.icon}
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.subtext }]}>{subtitle}</Text>
        )}
      </View>

      <Switch
        value={value}
        onValueChange={handleToggle}
        trackColor={{
          false: isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.15)',
          true: colors.toggleOn,
        }}
        thumbColor={Platform.OS === 'android' ? (value ? '#FFFFFF' : '#DDDDDD') : '#FFFFFF'}
        ios_backgroundColor={isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.15)'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  iconTile: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
});
