import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useActivityStore } from '../../store/useActivityStore';
import { useSpringPhysics } from '../../hooks/useSpringPhysics';
import { MusicCard } from '../cards/MusicCard';
import { CallCard } from '../cards/CallCard';
import { TimerCard } from '../cards/TimerCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

interface ExpandedCardDeckProps {
  onClose?: () => void;
}

export const ExpandedCardDeck: React.FC<ExpandedCardDeckProps> = ({ onClose }) => {
  const primaryActivity = useActivityStore((s) => s.primaryActivity);
  const physics = useSpringPhysics();

  const activeTab = useSharedValue(0);
  const tabs = ['Today', 'Music', 'Call', 'Timer', 'Download'];

  const renderCard = () => {
    if (!primaryActivity) return null;

    switch (primaryActivity.type) {
      case 'music':
        return <MusicCard />;
      case 'call':
        return <CallCard />;
      case 'timer':
        return <TimerCard />;
      default:
        return (
          <View style={styles.defaultCard}>
            <Text style={styles.defaultTitle}>{primaryActivity.title}</Text>
            <Text style={styles.defaultSubtitle}>No expanded view yet</Text>
          </View>
        );
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: CARD_WIDTH,
        },
      ]}
    >
      <View style={styles.tabs}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => {
              activeTab.value = index;
            }}
          >
            <Text style={[styles.tabText, activeTab.value === index && styles.activeTab]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.cardContent}>{renderCard()}</View>

      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
    left: '50%',
    transform: [{ translateX: -width / 2 + 24 }],
    backgroundColor: 'rgba(20, 20, 24, 0.95)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  tabs: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  activeTab: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  defaultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  defaultSubtitle: {
    fontSize: 13,
    color: '#888',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    padding: 8,
  },
  closeText: {
    fontSize: 18,
    color: '#888',
  },
});