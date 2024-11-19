import Divider from './Divider';
import {render} from '../../utilities/test-util';

describe('[component]-[Divider]', () => {
  test('should render the Divider component', () => {
    const Line = render(<Divider accessibilityProps="mock-divider" />);
    expect(Line).toMatchSnapshot();
  });
});
