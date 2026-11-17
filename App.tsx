import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSettingsStore } from './src/store/useSettingsStore';
import { useActivityStore } from './src/store/useActivityStore';
import { DynamicIsland } from './src/components/island/DynamicIsland';
import { MockEventSimulator } from './src/services/MockEventSimulator';
import SettingsScreen from './src/app/settings';
import { useTheme } from './src/theme/colors';

export default function App() {
  const [activeTab, setActiveTab] = useState<'settings' | 'sandbox'>('settings');
  const visibilityMode = useSettingsStore((s) => s.visibilityMode);
  const themeMode = useSettingsStore((s) => s.themeMode);
  const { colors, isDark } = useTheme(themeMode);

  const shouldShowIsland =
    visibilityMode === 'Fixed' ||
    (visibilityMode === 'Smart' && true);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {activeTab === 'settings' ? (
        <View style={styles.fullScreen}>
          <SettingsScreen onExit={() => setActiveTab('sandbox')} />
          {/* Quick toggle pill to switch to Sandbox */}
          <TouchableOpacity
            style={[
              styles.floatingTabToggle,
              { backgroundColor: colors.glass, borderColor: colors.border },
            ]}
            onPress={() => setActiveTab('sandbox')}
          >
            <Ionicons name="flask-outline" size={16} color={colors.text} />
            <Text style={[styles.floatingTabText, { color: colors.text }]}>Sandbox</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.base }]}>
          <View style={styles.topBar}>
            <Text style={[styles.topBarTitle, { color: colors.text }]}>Nook Sandbox</Text>
            <TouchableOpacity
              style={[
                styles.openSettingsBtn,
                { backgroundColor: colors.glass, borderColor: colors.border },
              ]}
              onPress={() => setActiveTab('settings')}
            >
              <Ionicons name="settings-outline" size={16} color={colors.text} />
              <Text style={[styles.openSettingsBtnText, { color: colors.text }]}>Settings</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.islandPlaceholder}>
            {shouldShowIsland && <DynamicIsland />}
          </View>

          <SandboxControls />
        </SafeAreaView>
      )}
    </GestureHandlerRootView>
  );
}

function SandboxControls() {
  const visibilityMode = useSettingsStore((s) => s.visibilityMode);

  const addMusic = () => {
    useActivityStore.getState().addActivity({
      id: 'demo-music',
      type: 'music',
      title: 'Demo Track',
      subtitle: 'Demo Artist',
      accentColor: '#30D158',
      payload: { albumArt: 'https://picsum.photos/200' },
    });
  };

  const addCall = () => {
    MockEventSimulator.startCallSimulation(15000);
  };

  const addTimer = () => {
    useActivityStore.getState().addActivity({
      id: 'demo-timer',
      type: 'timer',
      title: 'Demo Timer',
      accentColor: '#FF3B30',
      payload: { remaining: 60000, active: true, startTime: Date.now() },
    });
  };

  const addDownload = () => {
    MockEventSimulator.startDownloadSimulation();
  };

  const clearAll = () => {
    useActivityStore.getState().clearActivities();
  };

  const expand = () => {
    useActivityStore.getState().setIslandState('expanded');
  };

  const showTransient = () => {
    useActivityStore.getState().showTransient('Volume: 50%');
  };

  const setVisibilityMode = (mode: 'Smart' | 'Fixed' | 'Hidden') => {
    useSettingsStore.getState().setVisibilityMode(mode);
  };

  return (
    <View style={styles.sandboxContainer}>
      <Text style={styles.sandboxTitle}>Island Controls & Triggers</Text>

      <View style={styles.buttonRow}>
        <SandboxButton label="Music" onPress={addMusic} color="#30D158" />
        <SandboxButton label="Call" onPress={addCall} color="#0A84FF" />
        <SandboxButton label="Timer" onPress={addTimer} color="#FF3B30" />
        <SandboxButton label="Download" onPress={addDownload} color="#AF52DE" />
      </View>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Island Actions</Text>
      <View style={styles.buttonRow}>
        <SandboxButton label="Expand" onPress={expand} color="#0A84FF" />
        <SandboxButton label="HUD Toast" onPress={showTransient} color="#AF52DE" />
      </View>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>Visibility Mode</Text>
      <View style={styles.modeRow}>
        {(['Smart', 'Fixed', 'Hidden'] as const).map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.modeButton,
              visibilityMode === mode && styles.activeModeButton,
            ]}
            onPress={() => setVisibilityMode(mode)}
          >
            <Text style={[styles.modeText, visibilityMode === mode && styles.activeModeText]}>
              {mode}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <SandboxButton label="Clear All" onPress={clearAll} color="#FF3B30" />
    </View>
  );
}

function SandboxButton({ label, onPress, color }: { label: string; onPress: () => void; color: string }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.sandboxButton, { backgroundColor: color }]}
    >
      <Text style={styles.sandboxButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  openSettingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  openSettingsBtnText: {
    fontSize: 13,
    fontWeight: '600',
  },
  floatingTabToggle: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    gap: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingTabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  islandPlaceholder: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sandboxContainer: {
    padding: 16,
    gap: 12,
  },
  sandboxTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  sandboxButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sandboxButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: 12,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeModeButton: {
    backgroundColor: 'rgba(10, 132, 255, 0.3)',
  },
  modeText: {
    color: '#888',
    fontSize: 13,
  },
  activeModeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
