import { useActivityStore } from './useActivityStore';

beforeEach(() => {
  useActivityStore.setState({
    currentState: 'idle',
    activeActivities: [],
    primaryActivity: null,
    secondaryActivity: null,
    transientMessage: null,
  });
});

describe('useActivityStore', () => {
  describe('currentState', () => {
    it('defaults to idle', () => {
      expect(useActivityStore.getState().currentState).toBe('idle');
    });

    it('can be set to compact', () => {
      useActivityStore.getState().setIslandState('compact');
      expect(useActivityStore.getState().currentState).toBe('compact');
    });

    it('can be set to expanded', () => {
      useActivityStore.getState().setIslandState('expanded');
      expect(useActivityStore.getState().currentState).toBe('expanded');
    });

    it('can be set to split', () => {
      useActivityStore.getState().setIslandState('split');
      expect(useActivityStore.getState().currentState).toBe('split');
    });
  });

  describe('addActivity', () => {
    it('adds activity and sets state to compact', () => {
      useActivityStore.getState().addActivity({
        id: 'test-1',
        type: 'music',
        title: 'Test Song',
        accentColor: '#30D158',
      });

      expect(useActivityStore.getState().activeActivities).toHaveLength(1);
      expect(useActivityStore.getState().primaryActivity?.title).toBe('Test Song');
      expect(useActivityStore.getState().currentState).toBe('compact');
    });

    it('sets state to split when 2 activities exist', () => {
      useActivityStore.getState().addActivity({
        id: 'test-1',
        type: 'music',
        title: 'Song 1',
      });

      useActivityStore.getState().addActivity({
        id: 'test-2',
        type: 'call',
        title: 'Call 1',
      });

      expect(useActivityStore.getState().currentState).toBe('split');
      // Call has higher priority, so it's primary
      expect(useActivityStore.getState().primaryActivity?.title).toBe('Call 1');
      expect(useActivityStore.getState().secondaryActivity?.title).toBe('Song 1');
    });

    it('replaces an existing activity of the same type', () => {
      useActivityStore.getState().addActivity({
        id: 'test-1',
        type: 'music',
        title: 'Song 1',
      });

      useActivityStore.getState().addActivity({
        id: 'test-2',
        type: 'music',
        title: 'Song 2',
      });

      expect(useActivityStore.getState().activeActivities).toHaveLength(1);
      expect(useActivityStore.getState().primaryActivity?.title).toBe('Song 2');
    });

    it('sorts activities by priority (call before music)', () => {
      useActivityStore.getState().addActivity({
        id: 'test-1',
        type: 'music',
        title: 'Song 1',
      });

      useActivityStore.getState().addActivity({
        id: 'test-2',
        type: 'call',
        title: 'Call 1',
      });

      expect(useActivityStore.getState().primaryActivity?.title).toBe('Call 1');
      expect(useActivityStore.getState().secondaryActivity?.title).toBe('Song 1');
    });
  });

  describe('removeActivity', () => {
    it('removes activity and updates primary', () => {
      useActivityStore.getState().addActivity({
        id: 'test-1',
        type: 'music',
        title: 'Song 1',
      });

      useActivityStore.getState().addActivity({
        id: 'test-2',
        type: 'call',
        title: 'Call 1',
      });

      useActivityStore.getState().removeActivity('test-1');

      expect(useActivityStore.getState().activeActivities).toHaveLength(1);
      expect(useActivityStore.getState().primaryActivity?.title).toBe('Call 1');
    });

    it('sets state to idle when last activity is removed', () => {
      useActivityStore.getState().addActivity({
        id: 'test-1',
        type: 'music',
        title: 'Song 1',
      });

      useActivityStore.getState().removeActivity('test-1');

      expect(useActivityStore.getState().currentState).toBe('idle');
    });
  });

  describe('clearActivities', () => {
    it('clears all activities', () => {
      useActivityStore.getState().addActivity({
        id: 'test-1',
        type: 'music',
        title: 'Song 1',
      });

      useActivityStore.getState().clearActivities();

      expect(useActivityStore.getState().activeActivities).toHaveLength(0);
      expect(useActivityStore.getState().primaryActivity).toBeNull();
      expect(useActivityStore.getState().secondaryActivity).toBeNull();
      expect(useActivityStore.getState().currentState).toBe('idle');
    });
  });

  describe('transient messages', () => {
    it('shows a transient message and sets state to transient', () => {
      useActivityStore.getState().showTransient('Volume: 50%');

      expect(useActivityStore.getState().transientMessage).toBe('Volume: 50%');
      expect(useActivityStore.getState().currentState).toBe('transient');
    });

    it('hides the transient message and returns to compact', () => {
      useActivityStore.getState().showTransient('Volume: 50%');
      useActivityStore.getState().hideTransient();

      expect(useActivityStore.getState().transientMessage).toBeNull();
      expect(useActivityStore.getState().currentState).toBe('compact');
    });
  });

  describe('reorderActivities', () => {
    it('reorders activities by the given id list', () => {
      useActivityStore.getState().addActivity({
        id: 'test-1',
        type: 'music',
        title: 'Song 1',
      });

      useActivityStore.getState().addActivity({
        id: 'test-2',
        type: 'call',
        title: 'Call 1',
      });

      useActivityStore.getState().reorderActivities(['test-1', 'test-2']);

      expect(useActivityStore.getState().primaryActivity?.title).toBe('Song 1');
      expect(useActivityStore.getState().secondaryActivity?.title).toBe('Call 1');
    });

    it('drops unknown ids from the reorder', () => {
      useActivityStore.getState().addActivity({
        id: 'test-1',
        type: 'music',
        title: 'Song 1',
      });

      useActivityStore.getState().reorderActivities(['unknown', 'test-1']);

      expect(useActivityStore.getState().activeActivities).toHaveLength(1);
      expect(useActivityStore.getState().primaryActivity?.title).toBe('Song 1');
    });
  });
});