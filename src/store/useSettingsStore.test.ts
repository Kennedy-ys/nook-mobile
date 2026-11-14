import { useSettingsStore } from './useSettingsStore';

beforeEach(() => {
  useSettingsStore.setState({
    visibilityMode: 'Smart',
    motionPreset: 'Smooth',
    translucency: 40,
    notchOffset: 0,
    hapticsEnabled: true,
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
    it('defaults to 40', () => {
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
});