import {TextInputProps} from 'react-native';
import {StyledText, Container, Contain} from './InputField.style';

type AdditionalProps = {
  logo?: React.ReactNode;
  accessiblilityProps: string;
};
type Props = AdditionalProps & TextInputProps;

const InputField = ({
  logo,
  style,
  placeholder,
  value,
  accessiblilityProps,
  onChangeText,
  secureTextEntry = false,
}: Props) => (
  <Container style={style}>
    <Contain>{logo}</Contain>
    <StyledText
      testID={accessiblilityProps}
      accessibilityLabel={accessiblilityProps}
      accessibilityHint={`enter your ${accessiblilityProps}`}
      placeholder={placeholder}
      style={style}
      value={value}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
      onChangeText={onChangeText}
      editable
    />
  </Container>
);

export default InputField;
