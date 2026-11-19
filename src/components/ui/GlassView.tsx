import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSettingsStore } from '../../store/useSettingsStore';

interface GlassViewProps extends ViewProps {
  intensity?: number;
  borderRadius?: number;
}

export const GlassView: React.FC<GlassViewProps> = ({
  children,
  style,
  intensity = 50,
  borderRadius = 24,
  ...props
}) => {
  const translucency = useSettingsStore((state) => state.translucency);
  const effectiveIntensity = Math.round((intensity * translucency) / 50);

  return (
    <View style={[{ borderRadius, overflow: 'hidden' }, style]} {...props}>
      <BlurView
        intensity={effectiveIntensity}
        tint="dark"
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.innerBorder, { borderRadius }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerBorder: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(15, 15, 18, 0.55)',
  },
});
