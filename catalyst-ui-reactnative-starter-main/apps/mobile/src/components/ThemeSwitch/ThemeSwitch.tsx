import {Switch} from 'react-native';
import {useThemeContext} from '../../context/theme/themeContext';

const ThemeSwitch = () => {
  const {theme, toggleTheme} = useThemeContext();

  return (
    <Switch
      testID="theme-switch"
      trackColor={{
        true: theme.colors.primaryContainer,
        false: theme.colors.primaryContainer,
      }}
      thumbColor={theme.colors.primary}
      value={theme.mode === 'dark'}
      onValueChange={toggleTheme}
    />
  );
};
export default ThemeSwitch;
