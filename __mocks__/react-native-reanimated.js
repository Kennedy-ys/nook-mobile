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
  Easing: {
    linear: jest.fn(),
    ease: jest.fn(),
  },
  Extrapolate: {},
  interpolate: jest.fn(),
  add: jest.fn(),
  multiply: jest.fn(),
  divide: jest.fn(),
  clamp: jest.fn(),
};

export default Reanimated;