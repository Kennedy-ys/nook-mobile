export type IslandState = 'idle' | 'compact' | 'split' | 'expanded' | 'transient';

export type ActivityType = 'music' | 'call' | 'timer' | 'download' | 'weather';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  subtitle?: string;
  iconName?: string;
  accentColor?: string;
}

import { create } from 'zustand';

interface ActivityStoreState {
  currentState: IslandState;
  activeActivities: Activity[];
  primaryActivity: Activity | null;
  secondaryActivity: Activity | null;
  setIslandState: (state: IslandState) => void;
  addActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
  clearActivities: () => void;
}

export const useActivityStore = create<ActivityStoreState>((set, get) => ({
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
  setIslandState: (currentState) => set({ currentState }),
  addActivity: (activity) => {
    const current = get().activeActivities;
    const exists = current.some((a) => a.id === activity.id);
    const updated = exists ? current : [...current, activity];

    let state: IslandState = 'compact';
    if (updated.length === 0) state = 'idle';
    else if (updated.length >= 2) state = 'split';

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
}));
