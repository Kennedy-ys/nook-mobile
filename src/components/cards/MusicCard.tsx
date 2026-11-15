import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  withDelay,
  SharedValue,
} from 'react-native-reanimated';
import { useActivityStore } from '../../store/useActivityStore';
import { useSettingsStore } from '../../store/useSettingsStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_HEIGHT = 220;

interface MusicCardProps {
  onClose?: () => void;
}

export const MusicCard: React.FC<MusicCardProps> = ({ onClose }) => {
  const primaryActivity = useActivityStore((s) => s.primaryActivity);
  const translucency = useSettingsStore((s) => s.translucency);

  const barHeights = useSharedValue([0, 0, 0, 0, 0]);

  // Animate equalizer bars
  React.useEffect(() => {
    const animateBars = () => {
      barHeights.value = [
        withRepeat(withTiming(Math.random() * 40 + 20, { duration: 300 }), -1, true),
        withDelay(100, withRepeat(withTiming(Math.random() * 40 + 20, { duration: 300 }), -1, true)),
        withDelay(200, withRepeat(withTiming(Math.random() * 40 + 20, { duration: 300 }), -1, true)),
        withDelay(150, withRepeat(withTiming(Math.random() * 40 + 20, { duration: 300 }), -1, true)),
        withDelay(50, withRepeat(withTiming(Math.random() * 40 + 20, { duration: 300 }), -1, true)),
      ];
    };
    animateBars();
  }, [barHeights]);

  if (!primaryActivity || primaryActivity.type !== 'music') {
    return null;
  }

  const accentColor = primaryActivity.accentColor || '#0A84FF';
  const albumArt = (primaryActivity.payload?.albumArt as string) || 'https://picsum.photos/200';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          backgroundColor: `rgba(20, 20, 24, ${translucency / 100})`,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <Image source={{ uri: albumArt }} style={styles.albumArt} />
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>{primaryActivity.title}</Text>
          {primaryActivity.subtitle && (
            <Text style={styles.artistName}>{primaryActivity.subtitle}</Text>
          )}
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.equalizerSection}>
        <EqualizerBars heights={barHeights} accentColor={accentColor} />
      </View>

      <View style={styles.controls}>
        <ControlButton icon="⏮" onPress={() => {}} />
        <ControlButton icon="⏯" onPress={() => {}} />
        <ControlButton icon="⏭" onPress={() => {}} />
      </View>
    </Animated.View>
  );
};

function EqualizerBars({ heights, accentColor }: { heights: SharedValue<number[]>; accentColor: string }) {
  return (
    <View style={styles.equalizerContainer}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Animated.View
          key={i}
          style={[
            styles.barContainer,
            {
              height: heights.value[i],
              backgroundColor: accentColor,
            },
          ]}
        />
      ))}
    </View>
  );
}

function ControlButton({ icon, onPress }: { icon: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.controlButton}>
      <Text style={styles.controlIcon}>{icon}</Text>
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
  albumArt: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  artistName: {
    fontSize: 13,
    color: '#aaaaaa',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#888',
  },
  equalizerSection: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  equalizerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
    height: 50,
  },
  barContainer: {
    width: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
    paddingBottom: 16,
  },
  controlButton: {
    padding: 12,
  },
  controlIcon: {
    fontSize: 24,
    color: '#ffffff',
  },
});