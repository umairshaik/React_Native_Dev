import React from 'react';
import {CatalystButton, ButtonText} from './Button.style';
import {ButtonProps} from './types';

const Button = ({
  text,
  style,
  accessibleProps,
  textStyle,
  onPress,
  icon,
  type = 'filled',
}: ButtonProps) => (
  <CatalystButton
    onPress={onPress}
    type={type}
    style={style}
    testID={accessibleProps}
    accessibilityHint={`click to ${accessibleProps}`}
    accessibilityValue={{
      text: accessibleProps,
    }}>
    <ButtonText style={textStyle || {}} type={type}>
      {icon}
      {text}
    </ButtonText>
  </CatalystButton>
);
export default Button;
