import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

export const StyledSafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
`;
export const StyledLogoText = styled.Text`
  font-size: ${props => props.theme.fonts.displaySmall.fontSize}px;
  font-weight: ${props => props.theme.fonts.displaySmall.fontWeight};
  color: ${props => props.theme.colors.onBackground};
  margin-top: 150px;
  margin-bottom: 30px;
  text-align: center;
`;
export const StyledIcon = styled(Icon).attrs(props => ({
  color: props.theme.colors.outline,
  size: props.theme.fonts.headlineMedium.fontSize,
}))``;
