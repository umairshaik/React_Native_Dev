import styled from 'styled-components/native';
import {Text, View} from 'react-native';

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledText = styled(Text)`
  font-size: ${props => props.theme.fonts.displaySmall.fontSize}px;
  font-weight: ${props => props.theme.fonts.displaySmall.fontWeight};
  margin: 16px;
  margin-top: 0;
  color: ${props => props.theme.colors.onBackground};
`;
