import { useMemo } from 'react';
import { useSettingsStore } from '../store/useSettingsStore';
import { motionPresets, SpringConfig } from '../theme/physics';

export const useSpringPhysics = (): SpringConfig => {
  const motionPreset = useSettingsStore((state) => state.motionPreset);
  return useMemo(() => motionPresets[motionPreset], [motionPreset]);
};
