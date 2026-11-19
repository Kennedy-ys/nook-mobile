import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
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
          borderColor: isSelected ? colors.accent : colors.border,
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
          styles.contentWrapper,
          {
            backgroundColor: isSelected ? colors.accentSelected : colors.glass,
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1.5,
    marginHorizontal: 16,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 2,
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
