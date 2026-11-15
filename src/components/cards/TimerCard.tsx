import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
} from 'react-native-reanimated';
import { useActivityStore } from '../../store/useActivityStore';
import { useSettingsStore } from '../../store/useSettingsStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = 160;

interface TimerCardProps {
  onClose?: () => void;
}

export const TimerCard: React.FC<TimerCardProps> = ({ onClose }) => {
  const primaryActivity = useActivityStore((s) => s.primaryActivity);
  const secondaryActivity = useActivityStore((s) => s.secondaryActivity);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);

  const timerActive = primaryActivity?.type === 'timer' && (primaryActivity.payload?.active as boolean);
  const stopwatchActive = (primaryActivity?.type === 'timer' || secondaryActivity?.type === 'timer') &&
    (primaryActivity?.payload?.stopwatchActive as boolean || secondaryActivity?.payload?.stopwatchActive as boolean);

  const timerRemaining = useSharedValue((primaryActivity?.payload?.remaining as number) || 0);
  const stopwatchElapsed = useSharedValue((primaryActivity?.payload?.elapsed as number) || (secondaryActivity?.payload?.elapsed as number) || 0);

  // Timer countdown
  React.useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      timerRemaining.value = Math.max(0, (timerRemaining.value || 0) - 1000);
      if (timerRemaining.value === 0) {
        useActivityStore.getState().showTransient('Timer complete!');
        if (hapticsEnabled) {
          // Haptic feedback handled in Phase 4
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive, hapticsEnabled, timerRemaining]);

  // Stopwatch count-up
  React.useEffect(() => {
    if (!stopwatchActive) return;
    const interval = setInterval(() => {
      stopwatchElapsed.value = (stopwatchElapsed.value || 0) + 1000;
    }, 1000);
    return () => clearInterval(interval);
  }, [stopwatchActive, stopwatchElapsed]);

  if (!timerActive && !stopwatchActive) {
    return null;
  }

  const handleStartTimer = () => {
    const activity = primaryActivity;
    if (activity?.type === 'timer' && activity.payload) {
      useActivityStore.getState().addActivity({
        ...activity,
        payload: { ...activity.payload, active: true },
      });
    }
  };

  const handlePauseTimer = () => {
    const activity = primaryActivity;
    if (activity?.type === 'timer' && activity.payload) {
      useActivityStore.getState().addActivity({
        ...activity,
        payload: { ...activity.payload, active: false },
      });
    }
  };

  const handleResetTimer = () => {
    const activity = primaryActivity;
    if (activity?.type === 'timer' && activity.payload) {
      useActivityStore.getState().addActivity({
        ...activity,
        payload: { ...activity.payload, remaining: activity.payload.duration || 60000, active: false },
      });
    }
  };

  const handleAddMinute = () => {
    const activity = primaryActivity;
    if (activity?.type === 'timer' && activity.payload) {
      useActivityStore.getState().addActivity({
        ...activity,
        payload: { ...activity.payload, remaining: ((activity.payload.remaining as number) || 0) + 60000 },
      });
    }
  };

  const handleStartStopwatch = () => {
    const activity = primaryActivity?.type === 'timer' ? primaryActivity : secondaryActivity;
    if (activity?.type === 'timer' && activity.payload) {
      useActivityStore.getState().addActivity({
        ...activity,
        payload: { ...activity.payload, stopwatchActive: true },
      });
    }
  };

  const handlePauseStopwatch = () => {
    const activity = primaryActivity?.type === 'timer' ? primaryActivity : secondaryActivity;
    if (activity?.type === 'timer' && activity.payload) {
      useActivityStore.getState().addActivity({
        ...activity,
        payload: { ...activity.payload, stopwatchActive: false },
      });
    }
  };

  const handleResetStopwatch = () => {
    const activity = primaryActivity?.type === 'timer' ? primaryActivity : secondaryActivity;
    if (activity?.type === 'timer' && activity.payload) {
      useActivityStore.getState().addActivity({
        ...activity,
        payload: { ...activity.payload, elapsed: 0, stopwatchActive: false },
      });
    }
  };

  const handleLapStopwatch = () => {
    // Lap functionality - could be extended
    if (hapticsEnabled) {
      // Haptic feedback
    }
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
        <TimerDisplay remaining={timerRemaining.value} active={timerActive} />
        <View style={styles.divider} />
        <StopwatchDisplay elapsed={stopwatchElapsed.value} active={stopwatchActive} />
      </View>

      <View style={styles.controls}>
        {timerActive || (primaryActivity?.type === 'timer' && !stopwatchActive) ? (
          <>
            <ControlButton icon="▶" label="Start" onPress={handleStartTimer} disabled={timerActive} />
            <ControlButton icon="⏸" label="Pause" onPress={handlePauseTimer} disabled={!timerActive} />
            <ControlButton icon="⏹" label="Reset" onPress={handleResetTimer} />
            <ControlButton icon="+1m" label="+1m" onPress={handleAddMinute} />
          </>
        ) : (
          <>
            <ControlButton icon="▶" label="Start" onPress={handleStartStopwatch} disabled={stopwatchActive} />
            <ControlButton icon="⏸" label="Pause" onPress={handlePauseStopwatch} disabled={!stopwatchActive} />
            <ControlButton icon="⏹" label="Reset" onPress={handleResetStopwatch} />
            <ControlButton icon="⏱" label="Lap" onPress={handleLapStopwatch} disabled={!stopwatchActive} />
          </>
        )}
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
  const milliseconds = Math.floor((elapsed % 1000) / 10);
  const display = `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;

  return (
    <View style={styles.timerDisplay}>
      <Text style={[styles.timerLabel, active && styles.activeDisplay]}>Stopwatch</Text>
      <Text style={[styles.timerValue, active && styles.activeDisplay]}>{display}</Text>
    </View>
  );
}

function ControlButton({ icon, label, onPress, disabled, color = '#0A84FF' }: {
  icon: string;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  color?: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.controlButton, disabled && styles.disabledButton, { backgroundColor: color }]}
    >
      <Text style={[styles.controlIcon, disabled && styles.disabledIcon]}>{icon}</Text>
      <Text style={[styles.controlLabel, disabled && styles.disabledIcon]}>{label}</Text>
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
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  timerDisplay: {
    alignItems: 'center',
    flex: 1,
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
    fontFamily: 'monospace',
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
    gap: 12,
    paddingBottom: 16,
    width: '100%',
  },
  controlButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    minWidth: 60,
  },
  disabledButton: {
    opacity: 0.4,
  },
  controlIcon: {
    fontSize: 20,
    color: '#ffffff',
  },
  disabledIcon: {
    color: '#888',
  },
  controlLabel: {
    fontSize: 10,
    color: '#ffffff',
    marginTop: 2,
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