import {fireEvent, render} from '../../utilities/test-util';
import ThemeSwitch from './ThemeSwitch';
import * as themeContext from '../../context/theme/themeContext';

describe('[Component] - [ThemeSwitch]', () => {
  const mockToggleTheme = jest.fn();
  jest.spyOn(themeContext, 'useThemeContext').mockImplementation(
    jest.fn().mockReturnValue({
      toggleTheme: mockToggleTheme,
      theme: {
        colors: {
          label: '#BABABA',
        },
      },
    }),
  );

  test('should render ThemeSwitch component correctly', () => {
    const themeSwitch = render(<ThemeSwitch />);
    const switchComponent = themeSwitch.getByTestId('theme-switch');
    expect(mockToggleTheme).not.toHaveBeenCalled();
    fireEvent(switchComponent, 'valueChange', true);
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
