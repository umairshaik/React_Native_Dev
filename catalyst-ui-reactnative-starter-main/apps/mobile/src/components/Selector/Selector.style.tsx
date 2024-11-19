import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  /* flex: 1; */
  justify-content: center;
  align-items: flex-start;
  background-color: ${props => props.theme.colors.background};
  border-color: ${props => props.theme.colors.outline};
  border-radius: 5px;
  border-width: 1px;
  height: 43px;
  margin: 10px 0;
  padding: 0 10px;
`;

export const StylediosText = styled(Text)`
  font-size: 14px;
  color: ${props => props.theme.colors.onBackground};
  /* text-align:center ; */
`;
