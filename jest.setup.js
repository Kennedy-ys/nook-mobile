// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = {
    useSharedValue: jest.fn((initial) => ({ value: initial })),
    useAnimatedStyle: jest.fn(() => ({})),
    withSpring: jest.fn((to, config) => to),
    withTiming: jest.fn((to, config) => to),
    withDelay: jest.fn((delay, animation) => animation),
    withRepeat: jest.fn((animation, times, reverse) => animation),
    withSequence: jest.fn((...animations) => animations[animations.length - 1]),
    useAnimatedGestureHandler: jest.fn(() => ({})),
    runOnJS: jest.fn((fn) => fn),
    Easing: { linear: jest.fn(), ease: jest.fn() },
    Extrapolate: {},
    interpolate: jest.fn(),
    add: jest.fn(),
    multiply: jest.fn(),
    divide: jest.fn(),
    clamp: jest.fn(),
  };
  return Reanimated;
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  return {
    PanGestureHandler: ({ children }) => children,
    State: {},
  };
});

// Mock expo-blur
jest.mock('expo-blur', () => {
  return {
    BlurView: ({ children }) => children,
  };
});

// Mock expo-haptics
jest.mock('expo-haptics', () => {
  return {
    impactAsync: jest.fn(),
    notificationAsync: jest.fn(),
  };
});

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => {
  return {
    MMKV: jest.fn().mockImplementation(() => ({
      set: jest.fn(),
      getString: jest.fn(),
      getNumber: jest.fn(),
      getBoolean: jest.fn(),
      delete: jest.fn(),
    })),
    useMMKVObject: jest.fn(),
    useMMKVString: jest.fn(),
  };
});