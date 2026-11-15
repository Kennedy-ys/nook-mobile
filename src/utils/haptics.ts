import {
  impactAsync,
  notificationAsync,
  selectionAsync,
  ImpactFeedbackStyle,
  NotificationFeedbackType,
} from 'expo-haptics';

export type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

export async function triggerHaptic(type: HapticType): Promise<void> {
  try {
    switch (type) {
      case 'light':
        await impactAsync(ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        await impactAsync(ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        await impactAsync(ImpactFeedbackStyle.Heavy);
        break;
      case 'success':
        await notificationAsync(NotificationFeedbackType.Success);
        break;
      case 'warning':
        await notificationAsync(NotificationFeedbackType.Warning);
        break;
      case 'error':
        await notificationAsync(NotificationFeedbackType.Error);
        break;
      case 'selection':
        await selectionAsync();
        break;
    }
  } catch {
    // Ignore haptic errors (e.g., on unsupported platforms)
  }
}

export async function triggerHapticForStateChange(fromState: string, toState: string): Promise<void> {
  // Trigger haptic on island state transitions
  if (fromState === 'idle' && toState !== 'idle') {
    await triggerHaptic('light');
  } else if (fromState !== 'expanded' && toState === 'expanded') {
    await triggerHaptic('medium');
  } else if (fromState === 'expanded' && toState !== 'expanded') {
    await triggerHaptic('light');
  } else if (fromState !== 'transient' && toState === 'transient') {
    await triggerHaptic('selection');
  }
}

export async function triggerHapticForActivity(type: 'call' | 'timer' | 'music' | 'download'): Promise<void> {
  switch (type) {
    case 'call':
      await triggerHaptic('heavy');
      break;
    case 'timer':
      await triggerHaptic('success');
      break;
    case 'music':
      await triggerHaptic('light');
      break;
    case 'download':
      await triggerHaptic('medium');
      break;
  }
}