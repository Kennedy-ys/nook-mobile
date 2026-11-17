import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, island, islandTint } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useSpringPhysics } from '../../hooks/useSpringPhysics';
import { triggerHaptic } from '../../utils/haptics';

export type PreviewVariant =
  | 'notch'
  | 'island'
  | 'appearance'
  | 'motion'
  | 'sound'
  | 'weather';

interface IslandPreviewCardProps {
  variant?: PreviewVariant;
  onReplay?: () => void;
}

export const IslandPreviewCard: React.FC<IslandPreviewCardProps> = ({
  variant = 'notch',
  onReplay,
}) => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const islandBackground = useSettingsStore((s) => s.islandBackground);
  const translucency = useSettingsStore((s) => s.translucency);
  const translucentPill = useSettingsStore((s) => s.translucentPill);
  const hapticsEnabled = useSettingsStore((s) => s.hapticsEnabled);
  const physics = useSpringPhysics();
  const { colors, isDark } = useTheme(themeMode);

  // Animated scale and translateY for motion replay
  const islandScale = useSharedValue(1);
  const islandTranslateY = useSharedValue(0);

  const triggerMotionAnimation = () => {
    if (hapticsEnabled) {
      triggerHaptic('medium');
    }

    islandScale.value = withSequence(
      withSpring(0.92, { damping: physics.damping, stiffness: physics.stiffness, mass: physics.mass }),
      withSpring(1.05, { damping: physics.damping, stiffness: physics.stiffness, mass: physics.mass }),
      withSpring(1, { damping: physics.damping, stiffness: physics.stiffness, mass: physics.mass })
    );

    islandTranslateY.value = withSequence(
      withSpring(-6, { damping: physics.damping, stiffness: physics.stiffness, mass: physics.mass }),
      withSpring(2, { damping: physics.damping, stiffness: physics.stiffness, mass: physics.mass }),
      withSpring(0, { damping: physics.damping, stiffness: physics.stiffness, mass: physics.mass })
    );

    if (onReplay) {
      onReplay();
    }
  };

  const animatedIslandStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: islandScale.value },
      { translateY: islandTranslateY.value },
    ],
  }));

  // Background style based on appearance settings
  const pillOpacity = translucentPill ? translucency / 100 : 1;
  const getPillContainerStyle = () => {
    if (variant === 'appearance') {
      if (islandBackground === 'edge_tint') {
        return {
          backgroundColor: `rgba(0, 0, 0, ${pillOpacity})`,
          borderWidth: 1.5,
          borderColor: islandTint.edge,
          shadowColor: islandTint.edge,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowRadius: 8,
        };
      }
      if (islandBackground === 'edge_shadow') {
        return {
          backgroundColor: `rgba(0, 0, 0, ${pillOpacity})`,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.25)',
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.45,
          shadowRadius: 10,
        };
      }
      return {
        backgroundColor: island.pill,
        borderWidth: 0,
      };
    }

    return {
      backgroundColor: translucentPill ? `rgba(0, 0, 0, ${pillOpacity})` : island.pill,
      borderWidth: islandBackground === 'edge_tint' ? 1.5 : 1,
      borderColor:
        islandBackground === 'edge_tint'
          ? 'rgba(43, 211, 92, 0.4)'
          : 'rgba(255, 255, 255, 0.15)',
    };
  };

  return (
    <View
      style={[
        styles.previewContainer,
        {
          borderColor: colors.border,
          backgroundColor: colors.previewScene[0],
        },
      ]}
    >
      {/* Scene Backdrop gradient simulation */}
      <View
        style={[
          styles.sceneLayer,
          {
            backgroundColor: colors.previewScene[1],
            opacity: isDark ? 0.6 : 0.8,
          },
        ]}
      />

      {/* Dynamic Island Centered Preview */}
      <View style={styles.islandCenterWrapper}>
        <Animated.View style={[styles.animatedWrapper, animatedIslandStyle]}>
          {variant === 'notch' && (
            <View style={[styles.notchPill, getPillContainerStyle()]}>
              <View style={styles.cameraCutout} />
            </View>
          )}

          {variant === 'island' && (
            <View style={[styles.downloadPill, getPillContainerStyle()]}>
              <View style={styles.downloadCheck}>
                <Ionicons name="checkmark-sharp" size={12} color="#000000" />
              </View>
              <Text style={styles.downloadText}>design-assets.zip</Text>
              <Ionicons name="open-outline" size={14} color="#FFFFFF" style={styles.downloadIcon} />
            </View>
          )}

          {variant === 'appearance' && (
            <View style={styles.splitRow}>
              <View style={[styles.appearanceMainPill, getPillContainerStyle()]}>
                <View style={styles.orangeDot} />
                <View style={styles.equalizerBars}>
                  <View style={[styles.bar, { height: 14 }]} />
                  <View style={[styles.bar, { height: 8 }]} />
                  <View style={[styles.bar, { height: 16 }]} />
                  <View style={[styles.bar, { height: 10 }]} />
                  <View style={[styles.bar, { height: 12 }]} />
                </View>
              </View>
              <View style={[styles.appearanceBubble, getPillContainerStyle()]}>
                <Text style={styles.bubbleText}>0:38</Text>
              </View>
            </View>
          )}

          {variant === 'motion' && (
            <View style={styles.splitRow}>
              <View style={[styles.appearanceMainPill, getPillContainerStyle()]}>
                <View style={styles.orangeDot} />
                <View style={styles.equalizerBars}>
                  <View style={[styles.bar, { height: 14 }]} />
                  <View style={[styles.bar, { height: 8 }]} />
                  <View style={[styles.bar, { height: 16 }]} />
                  <View style={[styles.bar, { height: 10 }]} />
                  <View style={[styles.bar, { height: 12 }]} />
                </View>
              </View>
              <View style={[styles.appearanceBubble, getPillContainerStyle()]}>
                <Text style={styles.bubbleText}>0:38</Text>
              </View>
            </View>
          )}

          {variant === 'sound' && (
            <View style={[styles.soundPill, getPillContainerStyle()]}>
              <Ionicons name="volume-high" size={15} color="#FFFFFF" />
              <View style={styles.volumeTrack}>
                <View style={[styles.volumeFill, { width: '68%' }]} />
              </View>
              <Text style={styles.soundText}>68</Text>
            </View>
          )}

          {variant === 'weather' && (
            <View style={[styles.weatherPill, getPillContainerStyle()]}>
              <Ionicons name="sunny" size={16} color="#FFD60A" />
              <Text style={styles.weatherText}>Weather</Text>
            </View>
          )}
        </Animated.View>
      </View>

      {/* Replay Button for Motion Variant */}
      {variant === 'motion' && (
        <TouchableOpacity
          onPress={triggerMotionAnimation}
          style={[
            styles.replayButton,
            {
              backgroundColor: isDark ? 'rgba(15, 23, 42, 0.75)' : 'rgba(255, 255, 255, 0.8)',
              borderColor: colors.border,
            },
          ]}
        >
          <Ionicons name="reload" size={13} color={colors.text} />
          <Text style={[styles.replayText, { color: colors.text }]}>Replay</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    height: 154,
    borderRadius: 24,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sceneLayer: {
    ...StyleSheet.absoluteFill,
  },
  islandCenterWrapper: {
    position: 'absolute',
    top: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  animatedWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notchPill: {
    width: 120,
    height: 36,
    borderRadius: 18,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
  },
  cameraCutout: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: island.camera,
    borderWidth: 1.5,
    borderColor: island.cameraBorder,
  },
  downloadPill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    paddingHorizontal: 10,
    borderRadius: 19,
    gap: 8,
  },
  downloadCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  downloadIcon: {
    marginLeft: 4,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  appearanceMainPill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    gap: 8,
  },
  orangeDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF9500',
  },
  equalizerBars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2.5,
  },
  bar: {
    width: 3,
    borderRadius: 1.5,
    backgroundColor: '#FF9500',
  },
  appearanceBubble: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    color: '#FF9500',
    fontSize: 12,
    fontWeight: '700',
  },
  soundPill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    width: 200,
    paddingHorizontal: 12,
    borderRadius: 18,
    gap: 10,
  },
  volumeTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    overflow: 'hidden',
  },
  volumeFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  soundText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  weatherPill: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 18,
    gap: 8,
  },
  weatherText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  replayButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    gap: 5,
  },
  replayText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
