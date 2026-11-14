const GestureHandler = {
  PanGestureHandler: ({ children }) => children,
  State: {
    UNDETERMINED: 0,
    BEGAN: 1,
    ACTIVE: 2,
    END: 3,
    FAILED: 4,
    CANCELLED: 5,
  },
};

export default GestureHandler;