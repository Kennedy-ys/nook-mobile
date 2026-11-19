import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSettingsStore, DisplayTarget } from '../../store/useSettingsStore';
import { useAppTheme } from '../../theme/useAppTheme';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { SettingsGroupCard, SettingsDivider } from '../../components/settings/SettingsGroupCard';
import { SettingsToggleRow } from '../../components/settings/SettingsToggleRow';
import { SettingsSegmentedControl } from '../../components/settings/SettingsSegmentedControl';
import { RadioOptionCard } from '../../components/settings/RadioOptionCard';

export default function GeneralSettings() {
  const { colors, isDark } = useAppTheme();
  const visibilityMode = useSettingsStore((s) => s.visibilityMode);
  const setVisibilityMode = useSettingsStore((s) => s.setVisibilityMode);
  const showCallsInFullscreen = useSettingsStore((s) => s.showCallsInFullscreen);
  const setShowCallsInFullscreen = useSettingsStore((s) => s.setShowCallsInFullscreen);
  const launchAtLogin = useSettingsStore((s) => s.launchAtLogin);
  const setLaunchAtLogin = useSettingsStore((s) => s.setLaunchAtLogin);
  const displayTarget = useSettingsStore((s) => s.displayTarget);
  const setDisplayTarget = useSettingsStore((s) => s.setDisplayTarget);
  const showTrayIcon = useSettingsStore((s) => s.showTrayIcon);
  const setShowTrayIcon = useSettingsStore((s) => s.setShowTrayIcon);

  return (
    <SettingsPage title="General" preview="notch">
      <Text
        accessibilityRole="header"
        style={[styles.sectionTitle, { color: colors.subtext }]}
      >
        Island visibility
      </Text>

      <RadioOptionCard
        title="Smart"
        subtitle="Visible over the desktop and windowed apps; hides when an app is maximized."
        isSelected={visibilityMode === 'Smart'}
        onSelect={() => setVisibilityMode('Smart')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={[styles.miniDesktopPill, { backgroundColor: isDark ? '#1C2438' : '#D0DBF0' }]}>
              <View style={styles.miniIslandBlack} />
            </View>
            <View style={[styles.miniAppWindow, { backgroundColor: isDark ? '#2D3748' : '#FFFFFF' }]}>
              <View style={styles.miniIslandBlack} />
            </View>
          </View>
        )}
      />

      <RadioOptionCard
        title="Fixed"
        subtitle="Always visible (hidden in fullscreen)."
        isSelected={visibilityMode === 'Fixed'}
        onSelect={() => setVisibilityMode('Fixed')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={[styles.miniDesktopPill, { backgroundColor: isDark ? '#1C2438' : '#D0DBF0' }]}>
              <View style={styles.miniIslandBlack} />
            </View>
            <View style={[styles.miniAppWindow, { backgroundColor: isDark ? '#2D3748' : '#FFFFFF' }]}>
              <View style={styles.miniIslandBlack} />
            </View>
          </View>
        )}
      />

      <RadioOptionCard
        title="Hidden"
        subtitle="Stays hidden until you move to the top edge."
        isSelected={visibilityMode === 'Hidden'}
        onSelect={() => setVisibilityMode('Hidden')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View
              style={[
                styles.miniDesktopPill,
                { backgroundColor: isDark ? '#1C2438' : '#D0DBF0', borderStyle: 'dashed' },
              ]}
            >
              <View style={[styles.miniIslandBlack, { opacity: 0.3 }]} />
            </View>
            <View
              style={[
                styles.miniAppWindow,
                { backgroundColor: isDark ? '#2D3748' : '#FFFFFF', borderStyle: 'dashed' },
              ]}
            >
              <View style={[styles.miniIslandBlack, { opacity: 0.3 }]} />
            </View>
          </View>
        )}
      />

      <Text style={[styles.sectionCaption, { color: colors.subtext }]}>
        Calls and mic/camera stay visible in fullscreen apps and games.
      </Text>

      <SettingsGroupCard>
        <SettingsToggleRow
          title="Show calls and mic/camera in fullscreen"
          subtitle="Everything else stays hidden in fullscreen apps and games."
          value={showCallsInFullscreen}
          onValueChange={setShowCallsInFullscreen}
        />
        <SettingsDivider />
        <SettingsToggleRow
          title="Launch at login"
          subtitle="Managed in your system’s startup settings"
          value={launchAtLogin}
          onValueChange={setLaunchAtLogin}
        />
        <SettingsDivider />
        <View style={styles.segmentedRow}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>Show the island on</Text>
          <SettingsSegmentedControl<DisplayTarget>
            options={[
              { label: 'Main display', value: 'main' },
              { label: 'Display with cursor', value: 'cursor' },
            ]}
            value={displayTarget}
            onChange={setDisplayTarget}
          />
        </View>
        <SettingsDivider />
        <SettingsToggleRow
          title="Show icon in the tray"
          subtitle="Settings are always in the app menu too."
          value={showTrayIcon}
          onValueChange={setShowTrayIcon}
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
  sectionCaption: {
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 14,
  },
  miniIllustration: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  miniDesktopPill: {
    width: 38,
    height: 24,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    paddingTop: 3,
  },
  miniAppWindow: {
    width: 38,
    height: 24,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    paddingTop: 3,
  },
  miniIslandBlack: {
    width: 18,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#000000',
  },
  segmentedRow: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 8,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
});
