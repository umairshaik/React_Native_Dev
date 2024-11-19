import {render} from '../../utilities/test-util';
import {ViewLoader} from './ViewSpinner';

describe('View Spinner', () => {
  test('render spinner component', () => {
    const component = render(<ViewLoader />);
    expect(component).toMatchSnapshot();
  });

  test('render spinner view', () => {
    const component = render(<ViewLoader />);
    expect(component.getByTestId('global-suspense-loader')).toBeTruthy();
  });
});
