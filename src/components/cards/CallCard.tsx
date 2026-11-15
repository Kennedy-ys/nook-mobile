import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withSequence,
  withRepeat,
  SharedValue,
} from 'react-native-reanimated';
import { useActivityStore } from '../../store/useActivityStore';
import { useSettingsStore } from '../../store/useSettingsStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = 180;

interface CallCardProps {
  onClose?: () => void;
}

export const CallCard: React.FC<CallCardProps> = ({ onClose }) => {
  const primaryActivity = useActivityStore((s) => s.primaryActivity);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);

  const voiceAmplitude = useSharedValue(0);
  const callDuration = useSharedValue(0);
  const isMuted = useSharedValue(false);

  // Simulate voice amplitude for waveform
  React.useEffect(() => {
    voiceAmplitude.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.5, { duration: 800 })
      ),
      -1,
      true
    );
  }, [voiceAmplitude]);

  // Live call duration counter
  React.useEffect(() => {
    if (!primaryActivity || primaryActivity.type !== 'call' || !primaryActivity.payload?.active) return;
    const interval = setInterval(() => {
      callDuration.value += 1000;
    }, 1000);
    return () => clearInterval(interval);
  }, [callDuration, primaryActivity]);

  if (!primaryActivity || primaryActivity.type !== 'call') {
    return null;
  }

  const accentColor = primaryActivity.accentColor || '#0A84FF';

  const handleMuteToggle = () => {
    isMuted.value = !isMuted.value;
    if (primaryActivity.payload) {
      useActivityStore.getState().addActivity({
        ...primaryActivity,
        payload: { ...primaryActivity.payload, muted: isMuted.value },
      });
    }
    if (hapticsEnabled) {
      // Haptic feedback
    }
  };

  const handleEndCall = () => {
    useActivityStore.getState().removeActivity(primaryActivity.id);
    if (hapticsEnabled) {
      // Haptic feedback
    }
  };

  const formatDuration = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          backgroundColor: 'rgba(20, 20, 24, 0.95)',
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.callIcon}>
          <Text style={styles.callIconText}>📞</Text>
        </View>
        <View style={styles.callInfo}>
          <Text style={styles.callTitle}>{primaryActivity.title}</Text>
          {primaryActivity.subtitle && (
            <Text style={styles.callSubtitle}>{primaryActivity.subtitle}</Text>
          )}
        </View>
        <VoiceWaveform amplitude={voiceAmplitude} color={accentColor} />
      </View>

      <View style={styles.durationDisplay}>
        <Text style={styles.durationText}>{formatDuration(callDuration.value)}</Text>
        <Text style={styles.durationLabel}>Call Duration</Text>
      </View>

      <View style={styles.callControls}>
        <ControlButton
          icon={isMuted.value ? '🔇' : '🔊'}
          label={isMuted.value ? 'Unmute' : 'Mute'}
          onPress={handleMuteToggle}
          color={accentColor}
        />
        <ControlButton
          icon="⏹"
          label="End"
          onPress={handleEndCall}
          color="#FF3B30"
        />
        <ControlButton
          icon="🔊"
          label="Speaker"
          onPress={() => {}}
          color={accentColor}
        />
        <ControlButton
          icon="⌨"
          label="Keypad"
          onPress={() => {}}
          color={accentColor}
        />
      </View>

      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

function VoiceWaveform({ amplitude, color }: { amplitude: SharedValue<number>; color: string }) {
  const barCount = 8;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const barHeights = React.useMemo(() => Array.from({ length: barCount }, () => useSharedValue(0)), []);

  React.useEffect(() => {
    barHeights.forEach((barHeight, i) => {
      barHeight.value = withRepeat(
        withSequence(
          withTiming(Math.sin(Date.now() / 300 + i) * 0.5 + 0.5, { duration: 500 }),
          withTiming(Math.sin(Date.now() / 300 + i + 1) * 0.5 + 0.5, { duration: 500 })
        ),
        -1,
        true
      );
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View style={styles.waveform}>
      {barHeights.map((barHeight, i) => (
        <Animated.View
          key={i}
          style={[
            styles.waveformBar,
            { backgroundColor: color },
          ]}
        >
          <Animated.View
            style={[
              styles.waveformBarFill,
              {
                height: barHeight.value * 24 + 4,
                backgroundColor: color,
              },
            ]}
          />
        </Animated.View>
      ))}
    </View>
  );
}

function ControlButton({ icon, label, onPress, color }: { icon: string; label: string; onPress: () => void; color: string }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.controlButton}>
      <Text style={[styles.controlIcon, { color }]}>{icon}</Text>
      <Text style={[styles.controlLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
    left: '50%',
    transform: [{ translateX: -width / 2 + 24 }],
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  callIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0A84FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  callIconText: {
    fontSize: 20,
  },
  callInfo: {
    flex: 1,
  },
  callTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  callSubtitle: {
    fontSize: 13,
    color: '#aaaaaa',
  },
  waveform: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  waveformBar: {
    width: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 32,
  },
  waveformBarFill: {
    width: 4,
    borderRadius: 2,
  },
  durationDisplay: {
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  durationText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  durationLabel: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    width: '100%',
  },
  controlButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  controlIcon: {
    fontSize: 24,
  },
  controlLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
    zIndex: 1,
  },
  closeText: {
    fontSize: 18,
    color: '#888',
  },
});