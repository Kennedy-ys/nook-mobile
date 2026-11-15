const store = {};

module.exports = {
  getItem: jest.fn((key) => Promise.resolve(store[key] || null)),
  setItem: jest.fn((key, value) => {
    store[key] = value;
    return Promise.resolve();
  }),
  removeItem: jest.fn((key) => {
    delete store[key];
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    Object.keys(store).forEach((key) => delete store[key]);
    return Promise.resolve();
  }),
  getAllKeys: jest.fn(() => Promise.resolve(Object.keys(store))),
  getMultiple: jest.fn((keys) => {
    const result = {};
    keys.forEach((key) => {
      if (store[key] !== undefined) result[key] = store[key];
    });
    return Promise.resolve(result);
  }),
};