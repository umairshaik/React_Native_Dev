import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Appearance} from 'react-native';
import {ThemeProvider as StyledProvider} from 'styled-components/native';
import {asyncKeyValueStore} from '@catalyst/storage';
import {Mode, Theme} from '../../theme/types';
import LightTheme from '../../theme/lightTheme';
import DarkTheme from '../../theme/darkTheme';

export type StyledTheme = Theme & {
  mode: Mode;
};

export type ThemeContextState = {
  theme: StyledTheme;
  toggleTheme: () => void;
};
const getDarkTheme = (): StyledTheme => ({mode: 'dark', ...DarkTheme});
const getLightTheme = (): StyledTheme => ({mode: 'light', ...LightTheme});
const getDefaultTheme = (): StyledTheme =>
  Appearance.getColorScheme() === 'dark' ? getDarkTheme() : getLightTheme();

const updateThemeInStorage = async (mode: Mode) => {
  if (Appearance.getColorScheme() === mode)
    await asyncKeyValueStore.deleteItem('@themeMode');
  else {
    await asyncKeyValueStore.setItem('@themeMode', mode);
  }
};

export const ThemeContext = React.createContext({} as ThemeContextState);

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const [theme, setTheme] = useState<StyledTheme>(getDefaultTheme());

  const getStoredTheme = useCallback(async () => {
    const themeValue = await asyncKeyValueStore.getItem('@themeMode');
    if (themeValue !== null) {
      if (themeValue === 'dark') setTheme(getDarkTheme());
      else setTheme(getLightTheme());
    }
  }, []);
  useEffect(() => {
    getStoredTheme();
  }, [getStoredTheme]);

  useEffect(() => {
    updateThemeInStorage(theme.mode);
  }, [theme]);

  const toggleTheme = useCallback(async () => {
    setTheme(prev => (prev.mode === 'dark' ? getLightTheme() : getDarkTheme()));
  }, []);

  const providerState = useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={providerState}>
      <StyledProvider theme={theme}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
};
export const useThemeContext = () => useContext(ThemeContext);
