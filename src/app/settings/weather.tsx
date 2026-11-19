import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettingsStore, WeatherUnits } from '../../store/useSettingsStore';
import { useAppTheme } from '../../theme/useAppTheme';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { SettingsGroupCard, SettingsDivider } from '../../components/settings/SettingsGroupCard';
import { SettingsToggleRow } from '../../components/settings/SettingsToggleRow';
import { SettingsSegmentedControl } from '../../components/settings/SettingsSegmentedControl';

export default function WeatherSettings() {
  const { colors } = useAppTheme();
  const weatherLocation = useSettingsStore((s) => s.weatherLocation);
  const weatherUnits = useSettingsStore((s) => s.weatherUnits);
  const setWeatherUnits = useSettingsStore((s) => s.setWeatherUnits);
  const showWeatherInIsland = useSettingsStore((s) => s.showWeatherInIsland);
  const setShowWeatherInIsland = useSettingsStore((s) => s.setShowWeatherInIsland);

  return (
    <SettingsPage title="Weather" preview="weather">
      <SettingsGroupCard>
        <TouchableOpacity activeOpacity={0.7} style={styles.navRow}>
          <View style={styles.navRowTextCol}>
            <Text style={[styles.rowTitle, { color: colors.text }]}>Location</Text>
            <Text style={[styles.rowSubtitle, { color: colors.subtext }]}>
              Used for the forecast in the island
            </Text>
          </View>
          <View style={styles.navRowRight}>
            <Text style={[styles.locationValue, { color: colors.subtext }]}>
              {weatherLocation}
            </Text>
            <Ionicons name="chevron-forward" size={16} color={colors.subtext} />
          </View>
        </TouchableOpacity>

        <SettingsDivider />

        <View style={styles.segmentedRow}>
          <Text style={[styles.rowTitle, { color: colors.text }]}>Units</Text>
          <SettingsSegmentedControl<WeatherUnits>
            options={[
              { label: '°C', value: 'C' },
              { label: '°F', value: 'F' },
            ]}
            value={weatherUnits}
            onChange={setWeatherUnits}
          />
        </View>

        <SettingsDivider />

        <SettingsToggleRow
          title="Show weather in the island"
          subtitle="Glance at conditions without opening anything"
          value={showWeatherInIsland}
          onValueChange={setShowWeatherInIsland}
        />
      </SettingsGroupCard>
    </SettingsPage>
  );
}

const styles = StyleSheet.create({
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    gap: 12,
  },
  navRowTextCol: {
    flex: 1,
    gap: 2,
  },
  navRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationValue: {
    fontSize: 15,
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
  rowSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
});