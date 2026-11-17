import { useSettingsStore, defaultActivities } from './useSettingsStore';

beforeEach(() => {
  useSettingsStore.setState({
    visibilityMode: 'Smart',
    motionPreset: 'Smooth',
    translucency: 40,
    notchOffset: 0,
    hapticsEnabled: true,
    themeMode: 'system',
    showCallsInFullscreen: true,
    launchAtLogin: false,
    displayTarget: 'main',
    showTrayIcon: true,
    islandBackground: 'edge_tint',
    translucentPill: true,
    clickAction: 'open_card',
    activities: { ...defaultActivities },
    hideSystemVolumeHUD: true,
    scrollVolumeControl: true,
    weatherLocation: 'San Francisco',
    weatherUnits: 'C',
    showWeatherInIsland: true,
    computerName: 'MacBook Pro',
    isConnected: true,
    reconnectAutomatically: true,
  });
});

describe('useSettingsStore', () => {
  describe('visibilityMode', () => {
    it('defaults to Smart', () => {
      expect(useSettingsStore.getState().visibilityMode).toBe('Smart');
    });

    it('can be set to Fixed', () => {
      useSettingsStore.getState().setVisibilityMode('Fixed');
      expect(useSettingsStore.getState().visibilityMode).toBe('Fixed');
    });

    it('can be set to Hidden', () => {
      useSettingsStore.getState().setVisibilityMode('Hidden');
      expect(useSettingsStore.getState().visibilityMode).toBe('Hidden');
    });
  });

  describe('motionPreset', () => {
    it('defaults to Smooth', () => {
      expect(useSettingsStore.getState().motionPreset).toBe('Smooth');
    });

    it('can be set to Lively', () => {
      useSettingsStore.getState().setMotionPreset('Lively');
      expect(useSettingsStore.getState().motionPreset).toBe('Lively');
    });

    it('can be set to Bouncy', () => {
      useSettingsStore.getState().setMotionPreset('Bouncy');
      expect(useSettingsStore.getState().motionPreset).toBe('Bouncy');
    });
  });

  describe('translucency', () => {
    it('defaults to 40 in beforeEach', () => {
      expect(useSettingsStore.getState().translucency).toBe(40);
    });

    it('can be updated', () => {
      useSettingsStore.getState().setTranslucency(80);
      expect(useSettingsStore.getState().translucency).toBe(80);
    });
  });

  describe('hapticsEnabled', () => {
    it('defaults to true', () => {
      expect(useSettingsStore.getState().hapticsEnabled).toBe(true);
    });

    it('can be disabled', () => {
      useSettingsStore.getState().setHapticsEnabled(false);
      expect(useSettingsStore.getState().hapticsEnabled).toBe(false);
    });
  });

  describe('islandBackground and appearance', () => {
    it('can update islandBackground', () => {
      useSettingsStore.getState().setIslandBackground('edge_shadow');
      expect(useSettingsStore.getState().islandBackground).toBe('edge_shadow');
    });

    it('can toggle translucentPill', () => {
      useSettingsStore.getState().setTranslucentPill(false);
      expect(useSettingsStore.getState().translucentPill).toBe(false);
    });
  });

  describe('activities and clickAction', () => {
    it('can toggle specific activity', () => {
      useSettingsStore.getState().setActivityEnabled('music', false);
      expect(useSettingsStore.getState().activities.music).toBe(false);
      expect(useSettingsStore.getState().activities.calls).toBe(true);
    });

    it('can update clickAction', () => {
      useSettingsStore.getState().setClickAction('none');
      expect(useSettingsStore.getState().clickAction).toBe('none');
    });
  });

  describe('general and connection options', () => {
    it('can toggle showCallsInFullscreen and tray', () => {
      useSettingsStore.getState().setShowCallsInFullscreen(false);
      useSettingsStore.getState().setShowTrayIcon(false);
      expect(useSettingsStore.getState().showCallsInFullscreen).toBe(false);
      expect(useSettingsStore.getState().showTrayIcon).toBe(false);
    });

    it('can update displayTarget', () => {
      useSettingsStore.getState().setDisplayTarget('cursor');
      expect(useSettingsStore.getState().displayTarget).toBe('cursor');
    });

    it('can update connection status', () => {
      useSettingsStore.getState().setIsConnected(false);
      expect(useSettingsStore.getState().isConnected).toBe(false);
    });

    it('can update weather options', () => {
      useSettingsStore.getState().setWeatherUnits('F');
      useSettingsStore.getState().setWeatherLocation('New York');
      expect(useSettingsStore.getState().weatherUnits).toBe('F');
      expect(useSettingsStore.getState().weatherLocation).toBe('New York');
    });
  });
});
