let dummyStorage = {};

export const keychainMock = {
  SECURITY_LEVEL_ANY: 'MOCK_SECURITY_LEVEL_ANY',
  SECURITY_LEVEL_SECURE_SOFTWARE: 'MOCK_SECURITY_LEVEL_SECURE_SOFTWARE',
  SECURITY_LEVEL_SECURE_HARDWARE: 'MOCK_SECURITY_LEVEL_SECURE_HARDWARE',
  setGenericPassword: jest.fn(
    (username, password, {service}) =>
      new Promise(resolve => {
        dummyStorage[service || username] = password;
        resolve(true);
      }),
  ),
  getGenericPassword: jest.fn(
    ({service}) =>
      new Promise(resolve => {
        resolve(
          dummyStorage[service] !== undefined
            ? {username: service, password: dummyStorage[service]}
            : false,
        );
      }),
  ),
  resetGenericPassword: jest.fn(
    () =>
      new Promise(resolve => {
        dummyStorage = {};
        resolve(true);
      }),
  ),
  getAllGenericPasswordServices: jest.fn(
    () =>
      new Promise(resolve => {
        resolve(Object.keys(dummyStorage));
      }),
  ),
};

export default keychainMock;
