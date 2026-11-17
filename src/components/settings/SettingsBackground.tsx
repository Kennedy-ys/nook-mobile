import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme/colors';
import { useSettingsStore } from '../../store/useSettingsStore';

interface SettingsBackgroundProps {
  children: React.ReactNode;
}

export const SettingsBackground: React.FC<SettingsBackgroundProps> = ({ children }) => {
  const themeMode = useSettingsStore((s) => s.themeMode);
  const { colors, isDark } = useTheme(themeMode);

  return (
    <View style={[styles.container, { backgroundColor: colors.base }]}>
      {/* Ambient background glowing color blobs */}
      <View style={styles.blobsContainer} pointerEvents="none">
        {/* Top right blue-violet blob */}
        <View
          style={[
            styles.blob,
            {
              top: -60,
              right: -40,
              width: 280,
              height: 280,
              backgroundColor: colors.blobs[0],
              opacity: isDark ? 0.45 : 0.6,
            },
          ]}
        />
        {/* Middle purple blob */}
        <View
          style={[
            styles.blob,
            {
              top: '35%',
              left: -80,
              width: 320,
              height: 320,
              backgroundColor: colors.blobs[1],
              opacity: isDark ? 0.35 : 0.5,
            },
          ]}
        />
        {/* Lower teal/cyan blob */}
        <View
          style={[
            styles.blob,
            {
              bottom: 40,
              right: -60,
              width: 260,
              height: 260,
              backgroundColor: colors.blobs[2],
              opacity: isDark ? 0.3 : 0.45,
            },
          ]}
        />
      </View>

      {/* Screen Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  blobsContainer: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
  },
  content: {
    flex: 1,
  },
});
