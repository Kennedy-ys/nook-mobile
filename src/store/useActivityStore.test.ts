import { useActivityStore } from './useActivityStore';

beforeEach(() => {
  useActivityStore.setState({
    currentState: 'idle',
    activeActivities: [],
    primaryActivity: null,
    secondaryActivity: null,
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
      expect(useActivityStore.getState().secondaryActivity?.title).toBe('Call 1');
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
});