import MockAdapter from '@core/network/MockAdapter';
import {NavigationContainer} from '@react-navigation/native';
import {render} from '../utilities/test-util';
import {AuthState} from '../hooks/auth/types';
import AppNavigation from './AppNavigation';

const axiosMock = new MockAdapter().mockAxios;

const mockContext: AuthState = {
  loading: false,
  userToken: null,
};
jest.mock('../context/auth/authContext', () => ({
  useAuthContext: () => mockContext,
}));

afterAll(() => {
  axiosMock.restore();
});

describe('[Navigation] - [AppNavigation]', () => {
  test('should render login screen', async () => {
    const {findByText, findByTestId} = render(
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>,
    );
    mockContext.userToken = 'dummy_token';
    axiosMock
      .onGet(`https://jsonplaceholder.typicode.com/users/1`)
      .reply(200, {name: 'dummy_user'});
    const homeScreen = await findByText('HOME');
    const userNameComponent = await findByTestId('welcome-user');
    expect(homeScreen).toBeTruthy();
    expect(userNameComponent).toBeTruthy();
  });
});
