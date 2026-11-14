import { motionPresets, getSpringConfig } from './physics';

describe('motionPresets', () => {
  describe('Smooth preset', () => {
    it('has damping 20', () => {
      expect(motionPresets.Smooth.damping).toBe(20);
    });

    it('has stiffness 90', () => {
      expect(motionPresets.Smooth.stiffness).toBe(90);
    });

    it('has mass 1', () => {
      expect(motionPresets.Smooth.mass).toBe(1);
    });
  });

  describe('Lively preset', () => {
    it('has damping 14', () => {
      expect(motionPresets.Lively.damping).toBe(14);
    });

    it('has stiffness 140', () => {
      expect(motionPresets.Lively.stiffness).toBe(140);
    });

    it('has mass 0.8', () => {
      expect(motionPresets.Lively.mass).toBe(0.8);
    });
  });

  describe('Bouncy preset', () => {
    it('has damping 8', () => {
      expect(motionPresets.Bouncy.damping).toBe(8);
    });

    it('has stiffness 180', () => {
      expect(motionPresets.Bouncy.stiffness).toBe(180);
    });

    it('has mass 0.6', () => {
      expect(motionPresets.Bouncy.mass).toBe(0.6);
    });
  });
});

describe('getSpringConfig', () => {
  it('returns Smooth config by default', () => {
    const config = getSpringConfig();
    expect(config).toEqual(motionPresets.Smooth);
  });

  it('returns correct config for each preset', () => {
    expect(getSpringConfig('Smooth')).toEqual(motionPresets.Smooth);
    expect(getSpringConfig('Lively')).toEqual(motionPresets.Lively);
    expect(getSpringConfig('Bouncy')).toEqual(motionPresets.Bouncy);
  });
});