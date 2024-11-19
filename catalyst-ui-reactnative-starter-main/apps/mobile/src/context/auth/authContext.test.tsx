import {Pressable, Text} from 'react-native';
import {act, fireEvent, render, screen} from '../../utilities/test-util';
import {AuthProvider, useAuthContext} from './authContext';

const mockInput = {
  username: 'dummy_user',
  password: 'dummy_pass',
};
const mockToken = 'dummy_token';
const mockLogIn = jest.fn();
const mockLogOut = jest.fn();

jest.mock('../../hooks/auth/useAuth', () => ({
  __esModule: true,
  default: () => ({
    authMethods: {
      logIn: mockLogIn,
      logOut: mockLogOut,
    },
    authState: {
      loading: true,
      userToken: mockToken,
      user: {
        userName: mockInput.username,
      },
    },
  }),
}));

// test ids for mock component
const logInBtnTestID = 'jest-auth-context-login-btn';
const logOutBtnTestID = 'jest-auth-context-log-out-btn';
const loadingTestID = 'jest-auth-context-loading';
const userTokenTestID = 'jest-auth-context-user-token';
const userTestID = 'jest-auth-context-user';

const AuthContextComponent = () => {
  const {logIn, logOut, loading, userToken, user} = useAuthContext();

  return (
    <>
      <Text testID={loadingTestID}>{loading ? 'true' : 'false'}</Text>
      <Text testID={userTokenTestID}>{userToken}</Text>
      <Text testID={userTestID}>{user?.userName}</Text>
      <Pressable testID={logInBtnTestID} onPress={() => logIn?.(mockInput)}>
        <Text>LogIn</Text>
      </Pressable>

      <Pressable testID={logOutBtnTestID} onPress={logOut}>
        <Text>Log Out</Text>
      </Pressable>
    </>
  );
};

describe('[Context] - [AuthContext]', () => {
  test('should call logIn method when login button is pressed', () => {
    render(
      <AuthProvider>
        <AuthContextComponent />
      </AuthProvider>,
    );

    act(() => {
      fireEvent.press(screen.getByTestId(logInBtnTestID));
    });

    expect(mockLogIn).toBeCalledTimes(1);
    expect(mockLogIn).toBeCalledWith(mockInput);
  });
  test('should call logOut method when log-out button is pressed', () => {
    render(
      <AuthProvider>
        <AuthContextComponent />
      </AuthProvider>,
    );

    act(() => {
      fireEvent.press(screen.getByTestId(logOutBtnTestID));
    });
    expect(mockLogOut).toBeCalledTimes(1);
  });
  test('authState should take the prev value', () => {
    render(
      <AuthProvider>
        <AuthContextComponent />
      </AuthProvider>,
    );

    expect(screen.getByTestId(loadingTestID).props.children).toBe('true');
    expect(screen.getByTestId(userTokenTestID).props.children).toBe(mockToken);
    expect(screen.getByTestId(userTestID).props.children).toBe(
      mockInput.username,
    );
  });
});

export default AuthContextComponent;
