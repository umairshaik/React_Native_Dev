import {ViewProps} from 'react-native';
import {Line} from './Divider.style';

type AdditionProps = {
  accessibilityProps: string;
};
type Props = ViewProps & AdditionProps;

const Divider = ({style, accessibilityProps}: Props) => (
  <Line
    style={style}
    accessibilityHint={accessibilityProps}
    accessibilityLabel={`click to ${accessibilityProps}`}
  />
);
export default Divider;
