import {render} from '../../utilities/test-util';
import LoginDivider from './LoginDivider';

describe('[component]-[LoginDivider]', () => {
  test('should render the LoginDivider component', () => {
    const Box = render(<LoginDivider />);
    expect(Box).toMatchSnapshot();
  });
});
