import {Text} from 'react-native';
import InputField from './InputField';
import {render} from '../../utilities/test-util';

describe('[Component] - [InputField] ', () => {
  const mockLogo = () => <Text> hello</Text>;
  test('should render text input correctly', () => {
    const input = render(
      <InputField
        placeholder="Username"
        logo={mockLogo()}
        accessiblilityProps="dummy-button"
        value="dummy"
        onChangeText={() => jest.fn()}
      />,
    );
    expect(input).toMatchSnapshot();
  });
});
