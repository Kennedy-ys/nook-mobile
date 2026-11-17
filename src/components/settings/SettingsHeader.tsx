import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, connection } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';
import { triggerHaptic } from '../../utils/haptics';

interface SettingsHeaderProps {
  title: string;
  onBack?: () => void;
  showStatus?: boolean;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  onBack,
  showStatus = true,
}) => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const isConnected = useSettingsStore((s) => s.isConnected);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const { colors, isDark } = useTheme(themeMode);

  const handleBack = () => {
    if (hapticsEnabled) {
      triggerHaptic('selection');
    }
    if (onBack) {
      onBack();
    }
  };

  if (!onBack) {
    return (
      <View style={styles.mainHeader}>
        <Text style={[styles.mainTitle, { color: colors.text }]}>{title}</Text>
      </View>
    );
  }

  return (
    <View style={styles.subHeader}>
      <TouchableOpacity
        accessibilityLabel="Go back"
        accessibilityRole="button"
        onPress={handleBack}
        style={[
          styles.backButton,
          {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.06)',
            borderColor: colors.border,
          },
        ]}
      >
        <Ionicons name="chevron-back" size={20} color={colors.text} />
      </TouchableOpacity>

      <Text style={[styles.subTitle, { color: colors.text }]}>{title}</Text>

      {showStatus && (
        <View
          style={[
            styles.statusChip,
            {
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isConnected ? connection.connected : connection.unreachable },
            ]}
          />
          <Text style={[styles.statusText, { color: colors.text }]}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainHeader: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 12 : 20,
    paddingBottom: 16,
  },
  mainTitle: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 18,
    paddingBottom: 16,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  subTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
