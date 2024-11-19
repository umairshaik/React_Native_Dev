import {NavigationContainer} from '@react-navigation/native';
import {render} from '../utilities/test-util';
import AuthNavigation from './AuthNavigation';

describe('[Navigation] - [AuthNavigation]', () => {
  test('should render login screen', async () => {
    const {findByText, findAllByAccessibilityHint} = render(
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>,
    );
    const loginScreen = await findByText('WELCOME_TEXT');
    const userNameComponent = await findAllByAccessibilityHint(
      'enter your username',
    );
    expect(loginScreen).toBeTruthy();
    expect(userNameComponent).toBeTruthy();
  });
});
