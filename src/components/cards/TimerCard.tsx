import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated as RNAnimated } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useActivityStore } from '../../store/useActivityStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = 160;

interface TimerCardProps {
  onClose?: () => void;
}

export const TimerCard: React.FC<TimerCardProps> = ({ onClose }) => {
  const primaryActivity = useActivityStore((s) => s.primaryActivity);
  const secondaryActivity = useActivityStore((s) => s.secondaryActivity);

  const timerActive = primaryActivity?.type === 'timer';
  const stopwatchActive = secondaryActivity?.type === 'timer' || primaryActivity?.type === 'timer';

  if (!timerActive && !stopwatchActive) {
    return null;
  }

  const timerRemaining = primaryActivity?.payload?.remaining || 0;
  const stopwatchElapsed = primaryActivity?.payload?.elapsed || secondaryActivity?.payload?.elapsed || 0;

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
        <TimerDisplay remaining={timerRemaining} active={timerActive} />
        <View style={styles.divider} />
        <StopwatchDisplay elapsed={stopwatchElapsed} active={stopwatchActive} />
      </View>

      <View style={styles.controls}>
        <ControlButton icon="▶" label="Start" onPress={() => {}} />
        <ControlButton icon="⏸" label="Pause" onPress={() => {}} />
        <ControlButton icon="⏹" label="Reset" onPress={() => {}} />
        <ControlButton icon="+1m" label="+1m" onPress={() => {}} />
      </View>

      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

function TimerDisplay({ remaining, active }: { remaining: number; active: boolean }) {
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <View style={styles.timerDisplay}>
      <Text style={[styles.timerLabel, active && styles.activeDisplay]}>Timer</Text>
      <Text style={[styles.timerValue, active && styles.activeDisplay]}>{display}</Text>
    </View>
  );
}

function StopwatchDisplay({ elapsed, active }: { elapsed: number; active: boolean }) {
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return (
    <View style={styles.timerDisplay}>
      <Text style={[styles.timerLabel, active && styles.activeDisplay]}>Stopwatch</Text>
      <Text style={[styles.timerValue, active && styles.activeDisplay]}>{display}</Text>
    </View>
  );
}

function ControlButton({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.controlButton}>
      <Text style={styles.controlIcon}>{icon}</Text>
      <Text style={styles.controlLabel}>{label}</Text>
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
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  timerDisplay: {
    alignItems: 'center',
  },
  timerLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  timerValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    fontFamily: ' monospace',
  },
  activeDisplay: {
    color: '#0A84FF',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 16,
  },
  controlButton: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  controlIcon: {
    fontSize: 22,
    color: '#ffffff',
  },
  controlLabel: {
    fontSize: 10,
    color: '#aaaaaa',
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