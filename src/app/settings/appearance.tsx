import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useAppTheme } from '../../theme/useAppTheme';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { SettingsGroupCard, SettingsDivider } from '../../components/settings/SettingsGroupCard';
import { RadioOptionCard } from '../../components/settings/RadioOptionCard';
import { SettingsToggleRow } from '../../components/settings/SettingsToggleRow';
import { SettingsSliderRow } from '../../components/settings/SettingsSliderRow';

export default function AppearanceSettings() {
  const { colors, isDark } = useAppTheme();
  const islandBackground = useSettingsStore((s) => s.islandBackground);
  const setIslandBackground = useSettingsStore((s) => s.setIslandBackground);
  const translucentPill = useSettingsStore((s) => s.translucentPill);
  const setTranslucentPill = useSettingsStore((s) => s.setTranslucentPill);
  const translucency = useSettingsStore((s) => s.translucency);
  const setTranslucency = useSettingsStore((s) => s.setTranslucency);

  return (
    <SettingsPage title="Appearance" preview="appearance">
      <Text
        accessibilityRole="header"
        style={[styles.sectionTitle, { color: colors.subtext }]}
      >
        Background
      </Text>

      <RadioOptionCard
        title="Pure black"
        subtitle="Just the shape, nothing around it."
        isSelected={islandBackground === 'black'}
        onSelect={() => setIslandBackground('black')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={[styles.miniAppWindow, { backgroundColor: isDark ? '#2D3748' : '#FFFFFF' }]}>
              <View style={styles.miniIslandBlack} />
            </View>
          </View>
        )}
      />

      <RadioOptionCard
        title="Edge + shadow"
        subtitle="A fine edge and a soft shadow; lifts it off light wallpapers."
        isSelected={islandBackground === 'edge_shadow'}
        onSelect={() => setIslandBackground('edge_shadow')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={[styles.miniAppWindow, { backgroundColor: isDark ? '#2D3748' : '#FFFFFF' }]}>
              <View
                style={[
                  styles.miniIslandBlack,
                  { borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.4)' },
                ]}
              />
            </View>
          </View>
        )}
      />

      <RadioOptionCard
        title="Edge + activity tint"
        subtitle="A fine edge and a faint glow in the activity's colour."
        isSelected={islandBackground === 'edge_tint'}
        onSelect={() => setIslandBackground('edge_tint')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={[styles.miniAppWindow, { backgroundColor: isDark ? '#2D3748' : '#FFFFFF' }]}>
              <View
                style={[
                  styles.miniIslandBlack,
                  { borderWidth: 1.5, borderColor: '#2BD35C' },
                ]}
              />
            </View>
          </View>
        )}
      />

      <Text
        accessibilityRole="header"
        style={[styles.sectionTitle, { color: colors.subtext, marginTop: 22, marginBottom: 10 }]}
      >
        Transparency
      </Text>

      <SettingsGroupCard>
        <SettingsToggleRow
          title="Translucent pill"
          subtitle="Lets the wallpaper show through the island."
          value={translucentPill}
          onValueChange={setTranslucentPill}
        />
        <SettingsDivider />
        <SettingsSliderRow
          label="Opacity"
          value={translucency}
          onValueChange={setTranslucency}
        />
      </SettingsGroupCard>
    </SettingsPage>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
  },
  miniIllustration: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniAppWindow: {
    width: 26,
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    paddingTop: 3,
  },
  miniIslandBlack: {
    width: 14,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#000000',
  },
});