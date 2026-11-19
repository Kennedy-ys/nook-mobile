import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useAppTheme } from '../../theme/useAppTheme';

type GlassCardProps = {
  children: React.ReactNode;
  radius?: number;
  /** Inner padding. Use 0 when children are full-width rows. */
  padding?: number;
  style?: StyleProp<ViewStyle>;
  /** Makes the whole card tappable (adds button role + pressed state). */
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

/**
 * Two layers on purpose:
 *  - outer: carries the shadow (iOS drops shadows on views with overflow: 'hidden')
 *  - inner: clips the blur to the rounded corners
 * The outer view needs a fill or iOS draws no shadow, so it gets colors.glass.
 */
export function GlassCard({
  children,
  radius = 24,
  padding = 16,
  style,
  onPress,
  accessibilityLabel,
  accessibilityHint,
}: GlassCardProps) {
  const { colors, isDark } = useAppTheme();

  const body = (
    <View style={[styles.clip, { borderRadius: radius, borderColor: colors.border }]}>
      <BlurView
        intensity={isDark ? 30 : 45}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ padding }}>{children}</View>
    </View>
  );

  const outer = [
    styles.shadow,
    { borderRadius: radius, backgroundColor: colors.glass },
    style,
  ];

  if (!onPress) return <View style={outer}>{body}</View>;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      style={({ pressed }) => [outer, pressed && styles.pressed]}
    >
      {body}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {
    marginHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  clip: {
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth * 2,
  },
  pressed: { opacity: 0.85 },
});