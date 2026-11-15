import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useActivityStore } from '../../store/useActivityStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useSpringPhysics } from '../../hooks/useSpringPhysics';

const { width } = Dimensions.get('window');
const COMPACT_HEIGHT = 48;
const EXPANDED_HEIGHT = 140;
const SPLIT_BUBBLE_SIZE = 32;

export const DynamicIsland: React.FC = () => {
  const currentState = useActivityStore((s) => s.currentState);
  const primaryActivity = useActivityStore((s) => s.primaryActivity);
  const secondaryActivity = useActivityStore((s) => s.secondaryActivity);
  const notchOffset = useSettingsStore((s) => s.notchOffset);
  const translucency = useSettingsStore((s) => s.translucency);

  const physics = useSpringPhysics();

  const height = useSharedValue(COMPACT_HEIGHT);

  const islandStyle = useAnimatedStyle(() => ({
    height: height.value,
    backgroundColor: `rgba(20, 20, 24, ${translucency / 100})`,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomRightRadius: secondaryActivity ? 12 : 16,
    borderBottomLeftRadius: secondaryActivity ? 12 : 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  }));

  React.useEffect(() => {
    let targetHeight = COMPACT_HEIGHT;
    if (currentState === 'expanded') targetHeight = EXPANDED_HEIGHT;
    if (currentState === 'split') targetHeight = COMPACT_HEIGHT;

    // eslint-disable-next-line react-hooks/immutability
    height.value = withSpring(targetHeight, {
      damping: physics.damping,
      stiffness: physics.stiffness,
      mass: physics.mass,
    });
  }, [currentState, physics]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PanGestureHandler
      onGestureEvent={() => {}}
    >
      <Animated.View
        style={[
          styles.container,
          islandStyle,
          { top: notchOffset, left: width / 2, transform: [{ translateX: -width / 2 }] },
        ]}
      >
        <View style={styles.pillContent}>
          {currentState === 'compact' && primaryActivity && (
            <CompactPillActivity activity={primaryActivity} />
          )}
          {currentState === 'split' && primaryActivity && (
            <SplitBubbleActivity
              primary={primaryActivity}
              secondary={secondaryActivity}
            />
          )}
          {currentState === 'expanded' && (
            <ExpandedCardActivity activity={primaryActivity} />
          )}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

function CompactPillActivity({ activity }: { activity: { title: string; iconName?: string; accentColor?: string } }) {
  return (
    <View style={styles.compactPill}>
      <Text style={[styles.title, { color: activity.accentColor || '#ffffff' }]}>
        {activity.title}
      </Text>
    </View>
  );
}

function SplitBubbleActivity({
  primary,
  secondary,
}: {
  primary: { title: string; accentColor?: string };
  secondary: { title: string; accentColor?: string } | null;
}) {
  if (!secondary) {
    return <CompactPillActivity activity={primary} />;
  }

  const primaryWidth = (width - SPLIT_BUBBLE_SIZE - 16) / 2;

  return (
    <View style={styles.splitContainer}>
      <View style={[styles.primaryPill, { width: primaryWidth, backgroundColor: primary.accentColor || '#333' }]}>
        <Text style={styles.title}>{primary.title}</Text>
      </View>
      <View style={[styles.secondaryBubble, { backgroundColor: secondary.accentColor || '#555' }]}>
        <Text style={styles.bubbleText}>{secondary.title[0]}</Text>
      </View>
    </View>
  );
}

function ExpandedCardActivity({ activity }: { activity: { title: string } | null }) {
  if (!activity) return null;

  return (
    <View style={styles.expandedCard}>
      <Text style={styles.expandedTitle}>{activity.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  pillContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compactPill: {
    height: 36,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  splitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  primaryPill: {
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryBubble: {
    width: SPLIT_BUBBLE_SIZE,
    height: SPLIT_BUBBLE_SIZE,
    borderRadius: 16,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubbleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  expandedCard: {
    flex: 1,
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
});