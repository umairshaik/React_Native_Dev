import {render} from '../../utilities/test-util';
import {ScreenLoader} from './ModalSpinner';

describe('Modal Spinner', () => {
  test('render spinner component', () => {
    const component = render(<ScreenLoader />);
    expect(component).toMatchSnapshot();
  });

  test('render spinner view', () => {
    const component = render(<ScreenLoader />);
    expect(component.getByTestId('global-loader-modal')).toBeTruthy();
  });
});
