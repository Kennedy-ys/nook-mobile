import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { triggerHapticForStateChange, triggerHapticForActivity } from '../utils/haptics';

export type IslandState = 'idle' | 'compact' | 'split' | 'expanded' | 'transient';

export type ActivityType = 'music' | 'call' | 'timer' | 'download' | 'weather';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  subtitle?: string;
  iconName?: string;
  accentColor?: string;
  payload?: Record<string, unknown>;
}

/** Priority ordering for activity display — higher priority appears first in split bubbles. */
const ACTIVITY_PRIORITY: Record<ActivityType, number> = {
  call: 1,
  timer: 2,
  music: 3,
  download: 4,
  weather: 5,
};

const compareByPriority = (a: Activity, b: Activity) =>
  ACTIVITY_PRIORITY[a.type] - ACTIVITY_PRIORITY[b.type];

interface ActivityStoreState {
  currentState: IslandState;
  activeActivities: Activity[];
  primaryActivity: Activity | null;
  secondaryActivity: Activity | null;
  transientMessage: string | null;
  setIslandState: (state: IslandState) => void;
  addActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
  clearActivities: () => void;
  showTransient: (message: string) => void;
  hideTransient: () => void;
  reorderActivities: (ids: string[]) => void;
}

export const useActivityStore = create<ActivityStoreState>()(
  persist(
    (set, get) => ({
      currentState: 'compact',
      activeActivities: [
        {
          id: 'music-1',
          type: 'music',
          title: 'Midnight City',
          subtitle: 'M83',
          accentColor: '#30D158',
        },
      ],
      primaryActivity: {
        id: 'music-1',
        type: 'music',
        title: 'Midnight City',
        subtitle: 'M83',
        accentColor: '#30D158',
      },
      secondaryActivity: null,
      transientMessage: null,
      setIslandState: (currentState) => {
        const previousState = get().currentState;
        if (previousState !== currentState) {
          triggerHapticForStateChange(previousState, currentState);
        }
        set({ currentState });
      },
      addActivity: (activity) => {
        const current = get().activeActivities;
        const exists = current.some((a) => a.id === activity.id);

        // Replace an existing activity of the same type (e.g. new song, new call)
        // so the island never shows two activities of the same kind side by side.
        const sameTypeIndex = current.findIndex((a) => a.type === activity.type);
        let updated: Activity[];
        if (sameTypeIndex >= 0 && !exists) {
          updated = current.map((a, i) => (i === sameTypeIndex ? activity : a));
        } else if (exists) {
          updated = current.map((a) => (a.id === activity.id ? activity : a));
        } else {
          updated = [...current, activity];
        }

        updated.sort(compareByPriority);

        let state: IslandState = 'compact';
        if (updated.length === 0) state = 'idle';
        else if (updated.length >= 2) state = 'split';

        // Trigger haptic for new activity
        if (!exists && activity.type) {
          triggerHapticForActivity(activity.type as 'call' | 'timer' | 'music' | 'download');
        }

        set({
          activeActivities: updated,
          primaryActivity: updated[0] || null,
          secondaryActivity: updated[1] || null,
          currentState: state,
        });
      },
      removeActivity: (id) => {
        const updated = get().activeActivities.filter((a) => a.id !== id);
        let state: IslandState = 'compact';
        if (updated.length === 0) state = 'idle';
        else if (updated.length === 1) state = 'compact';

        set({
          activeActivities: updated,
          primaryActivity: updated[0] || null,
          secondaryActivity: updated[1] || null,
          currentState: state,
        });
      },
      clearActivities: () =>
        set({
          activeActivities: [],
          primaryActivity: null,
          secondaryActivity: null,
          currentState: 'idle',
        }),
      showTransient: (message) => {
        const previousState = get().currentState;
        if (previousState !== 'transient') {
          triggerHapticForStateChange(previousState, 'transient');
        }
        set({ transientMessage: message, currentState: 'transient' });
      },
      hideTransient: () => {
        const previousState = get().currentState;
        if (previousState === 'transient') {
          triggerHapticForStateChange('transient', 'compact');
        }
        set({ transientMessage: null, currentState: 'compact' });
      },
      reorderActivities: (ids) => {
        const current = get().activeActivities;
        const ordered = ids
          .map((id) => current.find((a) => a.id === id))
          .filter((a): a is Activity => a !== undefined);
        set({
          activeActivities: ordered,
          primaryActivity: ordered[0] || null,
          secondaryActivity: ordered[1] || null,
        });
      },
    }),
    {
      name: 'nook-activity',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        activeActivities: state.activeActivities,
        primaryActivity: state.primaryActivity,
        secondaryActivity: state.secondaryActivity,
        currentState: state.currentState,
      }),
    }
  )
);
