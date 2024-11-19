import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home/Home';
import {AppRoutes} from './routes';
import {AppStackParamList} from './types';

const AppNavigationStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigation = () => (
  <AppNavigationStack.Navigator>
    <AppNavigationStack.Screen name={AppRoutes.HOME} component={Home} />
  </AppNavigationStack.Navigator>
);

export default AppNavigation;
