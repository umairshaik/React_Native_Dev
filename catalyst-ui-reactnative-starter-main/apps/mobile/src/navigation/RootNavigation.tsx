import {useEffect, useRef, useState} from 'react';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer,
  StackActions,
} from '@react-navigation/native';
import SplashScreen from 'react-native-lottie-splash-screen';

import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import {useAuthContext} from '../context/auth/authContext';
import {useThemeContext} from '../context/theme/themeContext';

export const navigationRef = createNavigationContainerRef();

export const navigate = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate({name, params} as never);
  }
};

export const replace = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace({name, params} as never));
  }
};

const RootNavigation = () => {
  const {loading, userToken} = useAuthContext();
  const [hideSplash, setHideSplash] = useState(false);
  const {theme} = useThemeContext();
  const themeRef = useRef({
    ...DefaultTheme,
  });
  themeRef.current = {
    dark: theme.mode === 'dark',
    colors: {
      background: theme.colors.background,
      border: theme.colors.outline,
      card: theme.colors.background,
      notification: theme.colors.primary,
      primary: theme.colors.primary,
      text: theme.colors.onBackground,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setHideSplash(true);
    }, 1000);
  }, []);
  useEffect(() => {
    if (!loading && hideSplash) {
      SplashScreen?.hide();
    }
  }, [loading, hideSplash]);

  return (
    <NavigationContainer theme={themeRef.current} ref={navigationRef}>
      {userToken ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
