import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';
import { triggerHaptic } from '../../utils/haptics';

interface RadioOptionCardProps {
  title: string;
  subtitle: string;
  isSelected: boolean;
  onSelect: () => void;
  renderIllustration?: () => React.ReactNode;
}

export const RadioOptionCard: React.FC<RadioOptionCardProps> = ({
  title,
  subtitle,
  isSelected,
  onSelect,
  renderIllustration,
}) => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const { colors, isDark } = useTheme(themeMode);

  const handlePress = () => {
    if (hapticsEnabled) {
      triggerHaptic('selection');
    }
    onSelect();
  };

  return (
    <TouchableOpacity
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`${title}, ${subtitle}`}
      activeOpacity={0.8}
      onPress={handlePress}
      style={[
        styles.card,
        {
          backgroundColor: isSelected ? colors.accentSelected : colors.glass,
          borderColor: isSelected ? colors.accent : colors.border,
        },
      ]}
    >
      {renderIllustration && (
        <View style={styles.illustrationContainer}>{renderIllustration()}</View>
      )}

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.subtext }]}>{subtitle}</Text>
      </View>

      <View
        style={[
          styles.radioCircle,
          isSelected
            ? { backgroundColor: colors.accent, borderColor: colors.accent }
            : {
                backgroundColor: 'transparent',
                borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.25)',
              },
        ]}
      >
        {isSelected && (
          <Ionicons
            name="checkmark"
            size={14}
            color={colors.onAccent}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    marginHorizontal: 16,
    marginBottom: 10,
    gap: 14,
  },
  illustrationContainer: {
    width: 64,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textContainer: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
