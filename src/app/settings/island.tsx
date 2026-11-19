import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettingsStore, ClickAction } from '../../store/useSettingsStore';
import { useAppTheme } from '../../theme/useAppTheme';
import { state } from '../../theme/colors';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { SettingsGroupCard, SettingsDivider } from '../../components/settings/SettingsGroupCard';
import { SettingsToggleRow } from '../../components/settings/SettingsToggleRow';
import { SettingsSegmentedControl } from '../../components/settings/SettingsSegmentedControl';

export default function IslandSettings() {
  const { colors } = useAppTheme();
  const activities = useSettingsStore((s) => s.activities);
  const setActivityEnabled = useSettingsStore((s) => s.setActivityEnabled);
  const clickAction = useSettingsStore((s) => s.clickAction);
  const setClickAction = useSettingsStore((s) => s.setClickAction);

  return (
    <SettingsPage title="Island" preview="island">
      <Text
        accessibilityRole="header"
        style={[styles.sectionTitle, { color: colors.subtext }]}
      >
        Live Activities
      </Text>

      <SettingsGroupCard>
        <SettingsToggleRow
          title="Music"
          subtitle="Cover and bars while something plays"
          value={activities.music}
          onValueChange={(v) => setActivityEnabled('music', v)}
          iconTile={{
            icon: <Ionicons name="musical-notes" size={18} color={state.music.tile} />,
            color: state.music.tile,
          }}
        />
        <SettingsDivider />
        <SettingsToggleRow
          title="Keep music visible"
          subtitle="Show the music pill over apps in Smart mode"
          value={activities.keepMusicVisible}
          onValueChange={(v) => setActivityEnabled('keepMusicVisible', v)}
        />
        <SettingsDivider />
        <SettingsToggleRow
          title="Calls"
          subtitle="Teams, Zoom, Discord and others"
          value={activities.calls}
          onValueChange={(v) => setActivityEnabled('calls', v)}
          iconTile={{
            icon: <Ionicons name="call" size={18} color={state.call.tile} />,
            color: state.call.tile,
          }}
        />
        <SettingsDivider />
        <SettingsToggleRow
          title="Timer & stopwatch"
          subtitle="Countdown at a glance"
          value={activities.timer}
          onValueChange={(v) => setActivityEnabled('timer', v)}
          iconTile={{
            icon: <Ionicons name="timer-outline" size={18} color={state.timer.tile} />,
            color: state.timer.tile,
          }}
        />
        <SettingsDivider />
        <SettingsToggleRow
          title="Downloads"
          subtitle="Progress, then Open when done"
          value={activities.downloads}
          onValueChange={(v) => setActivityEnabled('downloads', v)}
          iconTile={{
            icon: <Ionicons name="download-outline" size={18} color={state.download.tile} />,
            color: state.download.tile,
          }}
        />
        <SettingsDivider />
        <SettingsToggleRow
          title="Clipboard"
          subtitle='A quick "Copied" note'
          value={activities.clipboard}
          onValueChange={(v) => setActivityEnabled('clipboard', v)}
          iconTile={{
            icon: <Ionicons name="clipboard-outline" size={18} color={state.clipboard.tile} />,
            color: state.clipboard.tile,
          }}
        />
        <SettingsDivider />
        <SettingsToggleRow
          title="Caps Lock & Num Lock"
          subtitle="Shows when you press them"
          value={activities.keyLocks}
          onValueChange={(v) => setActivityEnabled('keyLocks', v)}
          iconTile={{
            icon: <Ionicons name="keypad-outline" size={18} color={state.keyLocks.tile} />,
            color: state.keyLocks.tile,
          }}
        />
        <SettingsDivider />
        <SettingsToggleRow
          title="Battery & charging"
          subtitle="Plugged in, full and low"
          value={activities.battery}
          onValueChange={(v) => setActivityEnabled('battery', v)}
          iconTile={{
            icon: <Ionicons name="battery-charging" size={18} color={state.battery.tile} />,
            color: state.battery.tile,
          }}
        />
      </SettingsGroupCard>

      <Text
        accessibilityRole="header"
        style={[styles.sectionTitle, { color: colors.subtext, marginTop: 22, marginBottom: 10 }]}
      >
        Clicking the Island
      </Text>

      <SettingsGroupCard>
        <View style={styles.segmentedRow}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>When you click</Text>
          <SettingsSegmentedControl<ClickAction>
            options={[
              { label: 'Opens the card', value: 'open_card' },
              { label: 'Does nothing', value: 'none' },
            ]}
            value={clickAction}
            onChange={setClickAction}
          />
        </View>
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