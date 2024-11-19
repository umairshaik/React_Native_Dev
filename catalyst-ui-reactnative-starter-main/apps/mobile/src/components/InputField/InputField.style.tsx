import {TextInput, View} from 'react-native';
import styled from 'styled-components/native';

export const StyledText = styled(TextInput).attrs(props => ({
  placeholderTextColor: props.theme.colors.outline,
  color: props.theme.colors.tertiary,
}))`
  height: 43px;
  font-size: 14px;
  background-color: #fff;
  margin: 5px;
`;
export const Container = styled(View)`
  border-color: #aaa;
  border-radius: 5px;
  border-width: 1px;
  flex-direction: row;
  background-color: #fff;
  align-items: center;
  height: 50px;
`;
export const Contain = styled(View)`
  align-self: center;
  padding-left: 10px;
`;
