import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ThemeSwitch from '../components/ThemeSwitch/ThemeSwitch';
import Login from '../screens/Login/Login';
import {AuthRoutes} from './routes';
import {AuthStackParamList} from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerRight: ThemeSwitch,
      }}
      name={AuthRoutes.LOGIN}
      component={Login}
    />
  </Stack.Navigator>
);

export default AuthNavigation;
