import MockAdapter from '@core/network/MockAdapter';
import {AuthActions} from './auth';

describe('[API] - [Auth]', () => {
  const mockedLoginInput = {
    username: 'someUser',
    password: 'password',
  };
  const mockedLoginResponse = {
    accessToken: 'dummy_token',
    name: 'someUser',
  };

  const mockedAxios = new MockAdapter().mockAxios;

  afterEach(() => {
    mockedAxios.reset();
  });

  describe('Login API', () => {
    test('should resolve login response on success', async () => {
      mockedAxios.onPost('/login').reply(200, mockedLoginResponse);

      const result = await AuthActions.login(mockedLoginInput);

      expect(mockedAxios.history.post[0].url).toEqual('/login');
      expect(result).toEqual(mockedLoginResponse);
    });

    test('should reject with error on failure ', async () => {
      mockedAxios.onPost('/login').networkErrorOnce();
      await expect(AuthActions.login(mockedLoginInput)).rejects.toBeTruthy();
    });
  });

  describe('User API', () => {
    const userUrl = `https://jsonplaceholder.typicode.com/users/1`;
    test('should resolve login response on success', async () => {
      mockedAxios.onGet(userUrl).reply(200, mockedLoginResponse);

      const result = await AuthActions.getUser(1);

      expect(mockedAxios.history.get[0].url).toEqual(userUrl);
      expect(result).toEqual(mockedLoginResponse);
    });
    test('should reject with error on failure ', async () => {
      mockedAxios.onGet(userUrl).networkErrorOnce();
      await expect(AuthActions.getUser(1)).rejects.toBeTruthy();
    });
  });
});
