import {ReactElement} from 'react';
import {PressableProps, StyleProp} from 'react-native';

export type ButtonType = 'filled' | 'outlined' | 'text';

export type ButtonProps = PressableProps & {
  text?: string;
  icon?: ReactElement;
  type?: ButtonType;
  textStyle?: StyleProp<Text>;
  accessibleProps: string;
};
