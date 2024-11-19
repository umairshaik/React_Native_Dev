import {render} from '../../utilities/test-util';
import LanguageSelector from './LanguageSelector';

describe('Language Selector Component', () => {
  test('should render language selector', () => {
    const component = render(<LanguageSelector />);

    const selector = component.queryByTestId('language-selector');
    expect(selector).toBeTruthy();
  });

  test('snapshot match', () => {
    const component = render(<LanguageSelector />);

    expect(component).toMatchSnapshot();
  });
});
