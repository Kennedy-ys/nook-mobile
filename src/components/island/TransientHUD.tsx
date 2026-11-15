import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { useActivityStore } from '../../store/useActivityStore';
import { useSpringPhysics } from '../../hooks/useSpringPhysics';

const { width } = Dimensions.get('window');

interface TransientHUDProps {
  onDismiss?: () => void;
}

export const TransientHUD: React.FC<TransientHUDProps> = ({ onDismiss }) => {
  const transientMessage = useActivityStore((s) => s.transientMessage);
  const physics = useSpringPhysics();

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  React.useEffect(() => {
    if (transientMessage) {
      opacity.value = withTiming(1, { duration: 250 });
      translateY.value = withSpring(0, {
        damping: physics.damping,
        stiffness: physics.stiffness,
        mass: physics.mass,
      });

      const timer = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 250, easing: Easing.out(Easing.ease) }, (finished) => {
          if (finished) {
            runOnJS(useActivityStore.getState().hideTransient)();
          }
        });
        translateY.value = withSpring(-20, {
          damping: physics.damping,
          stiffness: physics.stiffness,
          mass: physics.mass,
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [transientMessage, opacity, translateY, physics]);

  if (!transientMessage) return null;

  const hudStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, hudStyle]}>
      <View style={styles.hud}>
        <Text style={styles.message} numberOfLines={1}>
          {transientMessage}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 8,
    left: '50%',
    transform: [{ translateX: -width / 2 + 24 }],
    zIndex: 200,
    pointerEvents: 'none',
  },
  hud: {
    backgroundColor: 'rgba(20, 20, 24, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  message: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});