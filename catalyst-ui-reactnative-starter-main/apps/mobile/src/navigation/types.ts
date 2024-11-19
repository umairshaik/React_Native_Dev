import {AppRoutes, AuthRoutes} from './routes';

/*
We can use StackParamList as shown below for props Type of components
Example: If we want to use navigation prop in Profile Screen component
Create prop type like this:
type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;
and add this to your component prop type, that's all.

The type takes 3 generics:

The param list object we defined below(AuthStackParamList)
The name of the route the screen belongs to
The ID of the navigator (optional)
*/

export type AuthStackParamList = {
  [AuthRoutes.LOGIN]: undefined;
};

export type AppStackParamList = {
  [AppRoutes.HOME]: undefined;
};
