/**
 * @format
 */

const asMock = {
  __INTERNAL_MOCK_STORAGE__: {},

  setItem: jest.fn(_set),

  getItem: jest.fn(async (key, callback) => {
    const getResult = await asMock.multiGet([key], undefined);

    const result = getResult[0] ? getResult[0][1] : null;

    callback && callback(null, result);
    return result;
  }),

  deleteItem: jest.fn(_deleteItem),

  multiGet: jest.fn(_multiGet),
  getAllItems: jest.fn(_getAllItems),

  clear: jest.fn(_clear),
};

async function _set(key, value, callback) {
  asMock.__INTERNAL_MOCK_STORAGE__[key] = value;
  callback && callback(null, value);

  return null;
}

async function _multiGet(keys, callback) {
  const values = keys.map(key => [
    key,
    asMock.__INTERNAL_MOCK_STORAGE__[key] || null,
  ]);
  callback && callback(null, values);

  return values;
}

async function _deleteItem(key, callback) {
  if (asMock.__INTERNAL_MOCK_STORAGE__[key]) {
    delete asMock.__INTERNAL_MOCK_STORAGE__[key];
  }

  callback && callback(null);

  return null;
}

async function _getAllItems(callback) {
  const keys = Object.keys(asMock.__INTERNAL_MOCK_STORAGE__);
  const values = keys.map(key => [
    key,
    asMock.__INTERNAL_MOCK_STORAGE__[key] || null,
  ]);
  callback && callback(null, values);

  return values;
}

async function _clear(callback) {
  asMock.__INTERNAL_MOCK_STORAGE__ = {};

  callback && callback(null);

  return null;
}

export default {asyncKeyValueStore: asMock, secureKeyValueStore: asMock};
