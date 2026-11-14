const MMKV = {
  MMKV: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    getNumber: jest.fn(),
    getBoolean: jest.fn(),
    delete: jest.fn(),
    clearAll: jest.fn(),
  })),
  useMMKVObject: jest.fn(),
  useMMKVString: jest.fn(),
  useMMKVNumber: jest.fn(),
  useMMKVBoolean: jest.fn(),
};

export default MMKV;