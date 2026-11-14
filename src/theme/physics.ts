export type MotionPreset = 'Smooth' | 'Lively' | 'Bouncy';

export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
}

export const motionPresets: Record<MotionPreset, SpringConfig> = {
  Smooth: { damping: 20, stiffness: 90, mass: 1 },
  Lively: { damping: 14, stiffness: 140, mass: 0.8 },
  Bouncy: { damping: 8, stiffness: 180, mass: 0.6 },
};

export const getSpringConfig = (preset: MotionPreset = 'Smooth'): SpringConfig =>
  motionPresets[preset];
