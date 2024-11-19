import MockAdapter from '@core/network/MockAdapter';
import {AuthState} from '../hooks/auth/types';
import {render, screen} from '../utilities/test-util';
import RootNavigation from './RootNavigation';

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
describe('[Navigation] - [RootNavigation]', () => {
  test('should render authNavigation if userToken is empty', async () => {
    const {findByText} = render(<RootNavigation />);
    const loginScreen = await findByText('WELCOME_TEXT');
    expect(loginScreen).toBeTruthy();
  });

  test('should render appNavigation if userToken is not empty', async () => {
    mockContext.userToken = 'dummy_token';
    axiosMock
      .onGet(`https://jsonplaceholder.typicode.com/users/1`)
      .reply(200, {name: 'dummy_user'});

    render(<RootNavigation />);
    const homeScreen = await screen.findByText('HOME');
    expect(homeScreen).toBeTruthy();
  });
});
