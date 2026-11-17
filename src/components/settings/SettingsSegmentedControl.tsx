import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';
import { triggerHaptic } from '../../utils/haptics';

interface SegmentOption<T extends string> {
  label: string;
  value: T;
}

interface SettingsSegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
}

export function SettingsSegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SettingsSegmentedControlProps<T>) {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const { colors } = useTheme(themeMode);

  const handleSelect = (val: T) => {
    if (val !== value) {
      if (hapticsEnabled) {
        triggerHaptic('selection');
      }
      onChange(val);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.segmentTrack }]}>
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => handleSelect(opt.value)}
            style={[
              styles.option,
              isActive && [
                styles.optionActive,
                { backgroundColor: colors.segmentActive },
              ],
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isActive ? colors.text : colors.subtext,
                  fontWeight: isActive ? '700' : '500',
                },
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 3,
    marginVertical: 6,
  },
  option: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionActive: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  label: {
    fontSize: 14,
  },
});
