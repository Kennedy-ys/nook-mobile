import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useAppTheme } from '../../theme/useAppTheme';
import { SettingsPage } from '../../components/settings/SettingsPage';
import { RadioOptionCard } from '../../components/settings/RadioOptionCard';

export default function MotionSettings() {
  const { colors } = useAppTheme();
  const motionPreset = useSettingsStore((s) => s.motionPreset);
  const setMotionPreset = useSettingsStore((s) => s.setMotionPreset);

  return (
    <SettingsPage title="Motion" preview="motion">
      <Text style={[styles.sectionCaption, { color: colors.subtext }]}>
        Nook Flow · one motion style for every transition
      </Text>

      <RadioOptionCard
        title="Smooth"
        subtitle="Calm, settles without overshoot"
        isSelected={motionPreset === 'Smooth'}
        onSelect={() => setMotionPreset('Smooth')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={styles.miniMotionPill} />
          </View>
        )}
      />

      <RadioOptionCard
        title="Lively"
        subtitle="Quick, with a little bounce"
        isSelected={motionPreset === 'Lively'}
        onSelect={() => setMotionPreset('Lively')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={styles.miniMotionPill} />
          </View>
        )}
      />

      <RadioOptionCard
        title="Bouncy"
        subtitle="Playful, ripples into place"
        isSelected={motionPreset === 'Bouncy'}
        onSelect={() => setMotionPreset('Bouncy')}
        renderIllustration={() => (
          <View style={styles.miniIllustration}>
            <View style={styles.miniMotionPill} />
          </View>
        )}
      />

      <View
        style={[
          styles.infoCard,
          { borderColor: colors.border },
        ]}
      >
        <View style={[styles.infoCardInner, { backgroundColor: colors.glass }]}>
          <Ionicons name="information-circle-outline" size={20} color={colors.subtext} />
          <Text style={[styles.infoText, { color: colors.subtext }]}>
            Reduced motion follows your system setting.
          </Text>
        </View>
      </View>
    </SettingsPage>
  );
}

const styles = StyleSheet.create({
  sectionCaption: {
    fontSize: 13,
    lineHeight: 18,
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 14,
  },
  miniIllustration: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniMotionPill: {
    width: 32,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
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