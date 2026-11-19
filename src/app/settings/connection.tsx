import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useAppTheme } from '../../theme/useAppTheme';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { SettingsGroupCard, SettingsDivider } from '../../components/settings/SettingsGroupCard';
import { SettingsToggleRow } from '../../components/settings/SettingsToggleRow';

export default function ConnectionSettings() {
  const { colors, isDark } = useAppTheme();
  const computerName = useSettingsStore((s) => s.computerName);
  const isConnected = useSettingsStore((s) => s.isConnected);
  const setIsConnected = useSettingsStore((s) => s.setIsConnected);
  const reconnectAutomatically = useSettingsStore((s) => s.reconnectAutomatically);
  const setReconnectAutomatically = useSettingsStore((s) => s.setReconnectAutomatically);

  return (
    <SettingsPage title="Connection" preview="notch">
      <SettingsGroupCard>
        <View style={styles.connectionDetailRow}>
          <View style={styles.computerIconTile}>
            <Ionicons name="desktop-outline" size={20} color="#2FBF5B" />
          </View>
          <View style={styles.computerTextCol}>
            <Text style={[styles.computerName, { color: colors.text }]}>{computerName}</Text>
            <Text style={[styles.connectedStatus, { color: colors.subtext }]}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
        </View>

        <SettingsDivider />

        <SettingsToggleRow
          title="Reconnect automatically"
          subtitle="Link up whenever your computer is on and nearby."
          value={reconnectAutomatically}
          onValueChange={setReconnectAutomatically}
        />
      </SettingsGroupCard>

      {/* Action Buttons */}
      <View style={styles.actionButtonsCol}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.glassActionBtn,
            { backgroundColor: colors.glass, borderColor: colors.border },
          ]}
          onPress={() => {}}
        >
          <Text style={[styles.actionBtnText, { color: colors.text }]}>Switch computer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.glassActionBtn,
            { backgroundColor: colors.glass, borderColor: colors.border },
          ]}
          onPress={() => setIsConnected(!isConnected)}
        >
          <Text style={[styles.actionBtnText, { color: colors.danger }]}>
            {isConnected ? 'Disconnect' : 'Connect'}
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        accessibilityRole="header"
        style={[styles.sectionTitle, { color: colors.subtext }]}
      >
        If the connection drops
      </Text>

      <View style={[styles.reconnectCard, { borderColor: colors.border }]}>
        <BlurView
          intensity={isDark ? 30 : 45}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View style={[styles.reconnectCardInner, { backgroundColor: colors.glass }]}>
          <View style={styles.dropHeaderRow}>
            <View style={styles.warningDot} />
            <Text style={[styles.dropTitle, { color: colors.text }]}>
              Can’t reach {computerName}
            </Text>
          </View>
          <Text style={[styles.dropSubtitle, { color: colors.subtext }]}>
            Changes you make now will sync when you’re back in range.
          </Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsConnected(true)}
            style={[styles.primaryReconnectBtn, { backgroundColor: colors.accent }]}
          >
            <Text style={[styles.primaryReconnectText, { color: colors.onAccent }]}>
              Reconnect
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SettingsPage>
  );
}

const styles = StyleSheet.create({
  connectionDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
  },
  computerIconTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(47, 191, 91, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  computerTextCol: {
    flex: 1,
    gap: 2,
  },
  computerName: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  connectedStatus: {
    fontSize: 13,
  },
  actionButtonsCol: {
    gap: 10,
    marginTop: 14,
    marginHorizontal: 16,
  },
  glassActionBtn: {
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.2,
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
  reconnectCard: {
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
  reconnectCardInner: {
    padding: 18,
    gap: 10,
  },
  dropHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  warningDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF9F0A',
  },
  dropTitle: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  dropSubtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  primaryReconnectBtn: {
    marginTop: 4,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryReconnectText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
