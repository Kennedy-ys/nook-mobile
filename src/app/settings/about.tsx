import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { BlurView } from 'expo-blur';
import { useAppTheme } from '../../theme/useAppTheme';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { SettingsGroupCard, SettingsDivider } from '../../components/settings/SettingsGroupCard';

export default function AboutSettings() {
  const { colors, isDark } = useAppTheme();

  return (
    <SettingsPage
      title="About"
      preview="notch"
      footer={
        <Text style={[styles.aboutFooter, { color: colors.subtext }]}>
          Developed by Adarzh · <Text style={{ color: colors.danger }}>Quit Nook</Text>
        </Text>
      }
    >
      {/* App Info Card */}
      <View style={[styles.aboutAppCard, { borderColor: colors.border }]}>
        <BlurView
          intensity={isDark ? 30 : 45}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.aboutAppCardInner, { backgroundColor: colors.glass }]}>
          <View style={styles.appIconN}>
            <Text style={styles.appIconNText}>N</Text>
          </View>
          <View style={styles.appInfoTextCol}>
            <Text style={[styles.appTitle, { color: colors.text }]}>Nook</Text>
            <Text style={[styles.appSubtitle, { color: colors.subtext }]}>
              Version 0.1.4 · Test build
            </Text>
            <Text style={[styles.appSubtitle, { color: colors.subtext }]}>
              Powered by Nook Flow
            </Text>
          </View>
        </View>
      </View>

      <Text
        accessibilityRole="header"
        style={[styles.sectionTitle, { color: colors.subtext }]}
      >
        Test version
      </Text>

      <View style={[styles.testVersionCard, { borderColor: colors.border }]}>
        <BlurView
          intensity={isDark ? 25 : 40}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.testVersionCardInner, { backgroundColor: colors.glass }]}>
          <View style={styles.testVersionTextCol}>
            <Text style={[styles.testVersionTitle, { color: colors.text }]}>
              You’re using a test build
            </Text>
            <Text style={[styles.testVersionSub, { color: colors.subtext }]}>
              Thanks for trying Nook early. Licensing and updates come with the release.
            </Text>
          </View>
          <View style={[styles.versionBadge, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)' }]}>
            <Text style={[styles.versionBadgeText, { color: colors.text }]}>0.1.4</Text>
          </View>
        </View>
      </View>

      <Text
        accessibilityRole="header"
        style={[styles.sectionTitle, { color: colors.subtext }]}
      >
        Credits
      </Text>

      <SettingsGroupCard>
        <View style={styles.creditRow}>
          <Text style={[styles.creditLabel, { color: colors.text }]}>Weather data</Text>
          <Text style={[styles.creditValue, { color: colors.subtext }]}>MET Norway</Text>
        </View>
        <SettingsDivider />
        <View style={styles.creditRow}>
          <Text style={[styles.creditLabel, { color: colors.text }]}>Geocoding</Text>
          <Text style={[styles.creditValue, { color: colors.subtext }]}>
            OpenStreetMap (Nominatim)
          </Text>
        </View>
        <SettingsDivider />
        <View style={styles.creditRow}>
          <Text style={[styles.creditLabel, { color: colors.text }]}>Icons</Text>
          <Text style={[styles.creditValue, { color: colors.subtext }]}>
            Fluent UI System Icons
          </Text>
        </View>
        <SettingsDivider />
        <View style={styles.creditRow}>
          <Text style={[styles.creditLabel, { color: colors.text }]}>Typeface</Text>
          <Text style={[styles.creditValue, { color: colors.subtext }]}>Inter</Text>
        </View>
      </SettingsGroupCard>
    </SettingsPage>
  );
}

const styles = StyleSheet.create({
  aboutAppCard: {
    borderRadius: 24,
    borderWidth: 1,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 3,
  },
  aboutAppCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  appIconN: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1C1D20',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  appIconNText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
  },
  appInfoTextCol: {
    flex: 1,
    gap: 2,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  appSubtitle: {
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
  },
  testVersionCard: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 2,
  },
  testVersionCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  testVersionTextCol: {
    flex: 1,
    gap: 4,
  },
  testVersionTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  testVersionSub: {
    fontSize: 13,
    lineHeight: 18,
  },
  versionBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  versionBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  creditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  creditLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  creditValue: {
    fontSize: 14,
  },
  aboutFooter: {
    textAlign: 'center',
    fontSize: 13,
    marginTop: 28,
  },
});
