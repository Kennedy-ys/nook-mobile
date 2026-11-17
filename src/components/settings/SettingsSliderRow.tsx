import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { useTheme } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';
import { triggerHaptic } from '../../utils/haptics';

interface SettingsSliderRowProps {
  label: string;
  value: number; // 0 - 100
  onValueChange: (val: number) => void;
  suffix?: string;
}

export const SettingsSliderRow: React.FC<SettingsSliderRowProps> = ({
  label,
  value,
  onValueChange,
  suffix = '%',
}) => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const { colors, isDark } = useTheme(themeMode);

  const handleTrackPress = (e: GestureResponderEvent) => {
    const { locationX } = e.nativeEvent;
    // Assume width roughly 180-220px or proportion
    // Using simple step-friendly values
    const newPercent = Math.min(100, Math.max(10, Math.round((locationX / 170) * 100)));
    if (hapticsEnabled) {
      triggerHaptic('selection');
    }
    onValueChange(newPercent);
  };

  const stepChange = (delta: number) => {
    const newVal = Math.min(100, Math.max(10, value + delta));
    if (hapticsEnabled) {
      triggerHaptic('selection');
    }
    onValueChange(newVal);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>

      <View style={styles.sliderControls}>
        <TouchableOpacity
          onPress={() => stepChange(-5)}
          style={[
            styles.stepButton,
            {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
            },
          ]}
        >
          <Text style={[styles.stepText, { color: colors.text }]}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleTrackPress}
          style={[
            styles.track,
            {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)',
            },
          ]}
        >
          <View
            style={[
              styles.fill,
              {
                width: `${value}%`,
                backgroundColor: colors.accent,
              },
            ]}
          />
          <View
            style={[
              styles.thumb,
              {
                left: `${Math.min(96, Math.max(0, value - 4))}%`,
                backgroundColor: '#FFFFFF',
              },
            ]}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => stepChange(5)}
          style={[
            styles.stepButton,
            {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
            },
          ]}
        >
          <Text style={[styles.stepText, { color: colors.text }]}>+</Text>
        </TouchableOpacity>

        <Text style={[styles.valueText, { color: colors.text }]}>
          {value}
          {suffix}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  sliderControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 18,
  },
  track: {
    width: 130,
    height: 6,
    borderRadius: 3,
    position: 'relative',
    justifyContent: 'center',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  valueText: {
    width: 44,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
});
