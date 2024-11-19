import MockAdapter from '@core/network/MockAdapter';
import {renderHook, act} from '../../utilities/test-util';
import useAuth from './useAuth';

const axiosMock = new MockAdapter().mockAxios;

axiosMock
  .onPost(`/login`)
  .reply(200, {accessToken: 'dummy_token', name: 'dummy_user'});

const mockSetLoadingTrue = jest.fn();
const mockSetLoadingFalse = jest.fn();
jest.mock('../../context/spinner/spinnerContext', () => ({
  ...jest.requireActual('../../context/spinner/spinnerContext'),
  useSpinnerContext: jest.fn().mockImplementation(() => ({
    setLoadingTrue: mockSetLoadingTrue,
    setLoadingFalse: mockSetLoadingFalse,
  })),
}));

afterAll(() => {
  axiosMock.reset();
});

describe('[Hooks] - [useAuth]', () => {
  test('should update the auth state after login', async () => {
    const {result} = renderHook(() => useAuth());
    await act(async () =>
      result.current.authMethods.logIn?.({
        username: 'dummy_user',
        password: 'dummy_pass',
      }),
    );
    const {authState: state} = result.current;
    expect(mockSetLoadingTrue).toBeCalledTimes(1);
    expect(mockSetLoadingFalse).toBeCalledTimes(1);
    expect(state.userToken).toBe('dummy_token');
  });
  test('should update the auth state after logout', async () => {
    const {result} = renderHook(() => useAuth());
    await act(async () =>
      result.current.authMethods.logIn?.({
        username: 'dummy_user',
        password: 'dummy_pass',
      }),
    );
    await act(async () => result.current.authMethods.logOut?.());
    const {authState: state} = result.current;
    expect(state.userToken).toBeNull();
  });
});
