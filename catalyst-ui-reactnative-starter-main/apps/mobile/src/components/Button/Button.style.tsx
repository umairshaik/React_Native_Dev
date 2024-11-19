import {Pressable, Text} from 'react-native';
import styled from 'styled-components/native';
import {ButtonType} from './types';

type Button = {
  type: ButtonType;
};

export const CatalystButton = styled(Pressable)<Button>`
  border-radius: 5px;
  padding: 12px 15px;
  ${({type, theme}) =>
    type === 'filled' && `background-color: ${theme.colors.primary};`}
  ${({type, theme}) =>
    type === 'outlined' &&
    `
    background-color: transparent;
    border-color: ${theme.colors.secondary};
    border-width: 1px;
    color: ${theme.colors.primary}
    `}
`;
export const ButtonText = styled(Text)<Button>`
  font-weight: ${props => props.theme.fonts.titleMedium.fontWeight};
  font-size: ${props => props.theme.fonts.titleMedium.fontSize}px;
  line-height: ${props => props.theme.fonts.titleMedium.lineHeight}px;
  align-self: center;
  ${({type, theme}) => type === 'filled' && `color: ${theme.colors.onPrimary};`}
  ${({type, theme}) => type === 'outlined' && `color: ${theme.colors.primary}`}
`;
