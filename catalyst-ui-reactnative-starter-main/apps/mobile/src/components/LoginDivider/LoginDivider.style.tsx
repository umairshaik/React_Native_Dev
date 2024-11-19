import {View} from 'react-native';
import styled from 'styled-components/native';
import Divider from '../Divider/Divider';

export const BoxView = styled(View)`
  border-color: #d3d3d3;
  border-width: 1px;
  height: 21px;
  width: 39px;
  border-radius: 4px;
  justify-content: center;
`;
export const DividerL = styled(Divider)`
  width: 7px;
  border-width: 2px;
  align-self: center;
`;
