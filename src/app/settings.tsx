import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSettingsStore } from '../store/useSettingsStore';
import { useActivityStore } from '../store/useActivityStore';
import { DynamicIsland } from '../components/island/DynamicIsland';
import { GlassView } from '../components/ui/GlassView';

export default function SettingsScreen() {
  const visibilityMode = useSettingsStore((s) => s.visibilityMode);
  const motionPreset = useSettingsStore((s) => s.motionPreset);
  const translucency = useSettingsStore((s) => s.translucency);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const notchOffset = useSettingsStore((s) => s.notchOffset);
  const setVisibilityMode = useSettingsStore((s) => s.setVisibilityMode);
  const setMotionPreset = useSettingsStore((s) => s.setMotionPreset);
  const setHapticsEnabled = useSettingsStore((s) => s.setHapticsEnabled);
  const setNotchOffset = useSettingsStore((s) => s.setNotchOffset);

  const mockActivity = {
    id: 'preview-music',
    type: 'music' as const,
    title: 'Preview Track',
    subtitle: 'Preview Artist',
    accentColor: '#30D158',
    payload: { albumArt: 'https://picsum.photos/seed/preview/300/300' },
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nook Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Live Preview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Preview</Text>
          <GlassView style={styles.previewContainer}>
            <DynamicIsland />
          </GlassView>
          <Text style={styles.previewHint}>
            Changes apply instantly. Tap the island to expand.
          </Text>
        </View>

        {/* Visibility Mode */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visibility Mode</Text>
          <View style={styles.optionRow}>
            {(['Smart', 'Fixed', 'Hidden'] as const).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.optionButton,
                  visibilityMode === mode && styles.optionButtonActive,
                ]}
                onPress={() => setVisibilityMode(mode)}
              >
                <Text style={[styles.optionText, visibilityMode === mode && styles.optionTextActive]}>
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Motion Preset */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motion Preset</Text>
          <View style={styles.optionRow}>
            {(['Smooth', 'Lively', 'Bouncy'] as const).map((preset) => (
              <TouchableOpacity
                key={preset}
                style={[
                  styles.optionButton,
                  motionPreset === preset && styles.optionButtonActive,
                ]}
                onPress={() => setMotionPreset(preset)}
              >
                <Text style={[styles.optionText, motionPreset === preset && styles.optionTextActive]}>
                  {preset}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Translucency Slider */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Translucency: {translucency}%
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>0%</Text>
            <View style={styles.sliderTrack}>
              <View
                style={[
                  styles.sliderFill,
                  { width: `${translucency}%` },
                ]}
              />
            </View>
            <Text style={styles.sliderLabel}>100%</Text>
          </View>
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderFill,
                { width: `${translucency}%` },
              ]}
            />
          </View>
          <View style={styles.sliderHandleContainer}>
            <View
              style={[
                styles.sliderThumb,
                { left: `${translucency}%` },
              ]}
            />
          </View>
        </View>

        {/* Haptics Toggle */}
        <View style={styles.section}>
          <View style={styles.toggleRow}>
            <View>
              <Text style={styles.toggleTitle}>Haptic Feedback</Text>
              <Text style={styles.toggleSubtitle}>Vibration on state changes</Text>
            </View>
            <TouchableOpacity
              style={[
                styles.toggleTrack,
                hapticsEnabled && styles.toggleTrackActive,
              ]}
              onPress={() => setHapticsEnabled(!hapticsEnabled)}
            >
              <View
                style={[
                  styles.toggleThumb,
                  hapticsEnabled && styles.toggleThumbActive,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notch Offset */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Notch Offset: {notchOffset}px
          </Text>
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderFill,
                { width: `${((notchOffset + 20) / 60) * 100}%` },
              ]}
            />
          </View>
          <View style={styles.sliderControls}>
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={() => setNotchOffset(Math.max(-20, notchOffset - 2))}
            >
              <Text style={styles.adjustButtonText}>−</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={() => setNotchOffset(Math.min(40, notchOffset + 2))}
            >
              <Text style={styles.adjustButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Test Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Actions</Text>
          <View style={styles.buttonGrid}>
            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#30D158' }]}
              onPress={() => {
                useActivityStore.getState().addActivity(mockActivity);
                useActivityStore.getState().setIslandState('expanded');
              }}
            >
              <Text style={styles.testButtonText}>Add Music & Expand</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#0A84FF' }]}
              onPress={() => {
                useActivityStore.getState().showTransient('Volume: 75%');
              }}
            >
              <Text style={styles.testButtonText}>Show HUD Toast</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#FF3B30' }]}
              onPress={() => {
                useActivityStore.getState().clearActivities();
              }}
            >
              <Text style={styles.testButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.testButton, { backgroundColor: '#AF52DE' }]}
              onPress={() => {
                useActivityStore.getState().addActivity({
                  id: 'preview-timer',
                  type: 'timer',
                  title: 'Preview Timer',
                  accentColor: '#FF3B30',
                  payload: { remaining: 120000, duration: 120000, active: true, stopwatchActive: false, elapsed: 0 },
                });
                useActivityStore.getState().setIslandState('expanded');
              }}
            >
              <Text style={styles.testButtonText}>Add Timer & Expand</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutText}>
              Nook Mobile — Dynamic Island for React Native
            </Text>
            <Text style={styles.aboutVersion}>
              Expo SDK 52 • Reanimated v3 • Zustand • MMKV
            </Text>
            <Text style={styles.aboutVersion}>
              Built with security-first principles
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0e',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  previewContainer: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  previewHint: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionButtonActive: {
    backgroundColor: 'rgba(10, 132, 255, 0.3)',
    borderColor: '#0A84FF',
  },
  optionText: {
    fontSize: 13,
    color: '#aaa',
    fontWeight: '500',
  },
  optionTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  sliderTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    minWidth: 200,
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#0A84FF',
  },
  sliderLabel: {
    fontSize: 11,
    color: '#666',
    width: 30,
    textAlign: 'center',
  },
  sliderHandleContainer: {
    height: 24,
    position: 'relative',
  },
  sliderThumb: {
    position: 'absolute',
    top: -9,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#0A84FF',
    borderWidth: 3,
    borderColor: '#ffffff',
    transform: [{ translateX: -10 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 8,
  },
  adjustButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adjustButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  toggleTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
  toggleSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  toggleTrack: {
    width: 52,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 2,
    justifyContent: 'center',
  },
  toggleTrackActive: {
    backgroundColor: '#0A84FF',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  testButton: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  aboutCard: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  aboutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 4,
  },
  aboutVersion: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginBottom: 2,
  },
});