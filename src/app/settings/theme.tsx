import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useAppTheme } from '../../theme/useAppTheme';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { RadioOptionCard } from '../../components/settings/RadioOptionCard';

export default function ThemeSettings() {
  const { colors, isDark } = useAppTheme();
  const themeMode = useSettingsStore((s) => s.themeMode);
  const setThemeMode = useSettingsStore((s) => s.setThemeMode);

  return (
    <SettingsPage title="Theme">
      {/* Top Split Theme Preview Card */}
      <View style={[styles.themePreviewCard, { borderColor: colors.border }]}>
        {/* Light Half */}
        <View style={styles.themeHalfLight}>
          <View style={styles.previewIsland} />
          <View style={styles.previewControlsRow}>
            <View style={styles.previewPillDark} />
            <View style={styles.previewToggleGreen} />
          </View>
        </View>

        {/* Dark Half */}
        <View style={styles.themeHalfDark}>
          <View style={styles.previewIsland} />
          <View style={styles.previewControlsRow}>
            <View style={styles.previewPillLight} />
            <View style={styles.previewToggleGreenBright} />
          </View>
        </View>
      </View>

      <RadioOptionCard
        title="System"
        subtitle="Match your phone’s appearance setting."
        isSelected={themeMode === 'system'}
        onSelect={() => setThemeMode('system')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={styles.miniCardSplit}>
              <View style={styles.miniSplitLeft} />
              <View style={styles.miniSplitRight} />
            </View>
          </View>
        )}
      />

      <RadioOptionCard
        title="Light"
        subtitle="Always use the light theme."
        isSelected={themeMode === 'light'}
        onSelect={() => setThemeMode('light')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={[styles.miniCardSolid, { backgroundColor: '#FFFFFF' }]}>
              <View style={[styles.miniCardPill, { backgroundColor: '#D0D4DC' }]} />
            </View>
          </View>
        )}
      />

      <RadioOptionCard
        title="Dark"
        subtitle="Always use the dark theme."
        isSelected={themeMode === 'dark'}
        onSelect={() => setThemeMode('dark')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={[styles.miniCardSolid, { backgroundColor: '#1C1D20', borderColor: 'rgba(255, 255, 255, 0.2)' }]}>
              <View style={[styles.miniCardPill, { backgroundColor: '#3A3F4A' }]} />
            </View>
          </View>
        )}
      />

      {/* Info Card */}
      <View style={[styles.infoCard, { borderColor: colors.border }]}>
        <BlurView
          intensity={isDark ? 25 : 40}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.infoCardInner, { backgroundColor: colors.glass }]}>
          <Ionicons name="information-circle-outline" size={20} color={colors.subtext} />
          <Text style={[styles.infoText, { color: colors.subtext }]}>
            With System selected, Nook switches between light and dark when your phone does.
          </Text>
        </View>
      </View>
    </SettingsPage>
  );
}

const styles = StyleSheet.create({
  themePreviewCard: {
    height: 140,
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  themeHalfLight: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 12,
  },
  themeHalfDark: {
    flex: 1,
    backgroundColor: '#1C1D20',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 12,
  },
  previewIsland: {
    width: 90,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#000000',
  },
  previewControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  previewPillDark: {
    width: 50,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2D313A',
  },
  previewPillLight: {
    width: 50,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  previewToggleGreen: {
    width: 32,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1B8F42',
  },
  previewToggleGreenBright: {
    width: 32,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#34C759',
  },
  miniIllustration: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniCardSplit: {
    width: 44,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    flexDirection: 'row',
  },
  miniSplitLeft: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  miniSplitRight: {
    flex: 1,
    backgroundColor: '#1C1D20',
  },
  miniCardSolid: {
    width: 44,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 6,
  },
  miniCardPill: {
    width: 24,
    height: 6,
    borderRadius: 3,
  },
  infoCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 6,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 2,
  },
  infoCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
