import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  Easing,
  SharedValue,
} from 'react-native-reanimated';
import { useActivityStore } from '../../store/useActivityStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = 140;

interface CallCardProps {
  onClose?: () => void;
}

export const CallCard: React.FC<CallCardProps> = ({ onClose }) => {
  const primaryActivity = useActivityStore((s) => s.primaryActivity);
  const voiceAmplitude = useSharedValue(0);

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

  if (!primaryActivity || primaryActivity.type !== 'call') {
    return null;
  }

  const accentColor = primaryActivity.accentColor || '#0A84FF';
  const duration = primaryActivity.payload?.duration || 0;
  const isMuted = primaryActivity.payload?.muted || false;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          backgroundColor: 'rgba(20, 20, 24, 0.9)',
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

      <View style={styles.callControls}>
        <ControlButton
          icon={isMuted ? '🔇' : '🔊'}
          label={isMuted ? 'Unmute' : 'Mute'}
          onPress={() => {}}
          color={accentColor}
        />
        <ControlButton
          icon="⏹"
          label="End"
          onPress={() => {}}
          color="#FF3B30"
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
  return (
    <View style={styles.waveform}>
      {Array.from({ length: barCount }).map((_, i) => {
        const barHeight = useSharedValue(0);
        React.useEffect(() => {
          barHeight.value = withTiming(Math.sin(Date.now() / 300 + i) * 0.5 + 0.5, {
            duration: 500,
          });
        }, []);
        return (
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
                  height: barHeight.value * 20 + 4,
                  backgroundColor: color,
                },
              ]}
            />
          </Animated.View>
        );
      })}
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
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
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
  },
  waveformBar: {
    width: 6,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  waveformBarFill: {
    width: 4,
    borderRadius: 2,
  },
  callControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    paddingVertical: 12,
  },
  controlButton: {
    alignItems: 'center',
  },
  controlIcon: {
    fontSize: 28,
  },
  controlLabel: {
    fontSize: 11,
    marginTop: 4,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#888',
  },
});