import React from 'react';
import { StyleSheet, View } from 'react-native';

interface BlurredGlowOrbProps {
  color: string; // e.g. 'rgba(60, 110, 255, 0.55)' or hex or rgb
  size: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  maxOpacity?: number;
}

export const BlurredGlowOrb: React.FC<BlurredGlowOrbProps> = ({
  color,
  size,
  top,
  left,
  right,
  bottom,
  maxOpacity = 0.5,
}) => {
  // Extract rgb components if available
  const rgbMatch = color.match(/\d+[\s,]+\d+[\s,]+\d+/);
  const rgb = rgbMatch ? rgbMatch[0] : '100, 140, 255';

  // Generate 16 concentric layers with smooth Gaussian falloff
  const layerCount = 16;
  const layers = Array.from({ length: layerCount }, (_, i) => {
    const step = (i + 1) / layerCount; // 1/16 to 1
    const layerSize = size * step;
    // Gaussian-like falloff: outer layers have tiny incremental opacity
    const alpha = (maxOpacity / layerCount) * Math.pow(1 - step * 0.5, 0.8);

    return {
      size: layerSize,
      backgroundColor: `rgba(${rgb}, ${alpha.toFixed(4)})`,
    };
  });

  return (
    <View
      pointerEvents="none"
      style={[
        styles.container,
        {
          width: size,
          height: size,
          top: top as number | undefined,
          left: left as number | undefined,
          right: right as number | undefined,
          bottom: bottom as number | undefined,
        },
      ]}
    >
      {layers.reverse().map((layer, index) => (
        <View
          key={index}
          style={[
            styles.circle,
            {
              width: layer.size,
              height: layer.size,
              borderRadius: layer.size / 2,
              backgroundColor: layer.backgroundColor,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
  },
});
