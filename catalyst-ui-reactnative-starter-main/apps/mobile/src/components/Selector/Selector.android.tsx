import {Picker, PickerProps} from '@react-native-picker/picker';
import {useThemeContext} from '../../context/theme/themeContext';

type Option = {
  label: string;
  value: string;
};

interface SelectorProps extends PickerProps {
  options: Option[];
}

const Selector = ({options, style, ...props}: SelectorProps) => {
  const {theme} = useThemeContext();
  const mergedStyle = [{color: theme.colors.onBackground}, style];
  return (
    <Picker
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      dropdownIconColor={theme.colors.onBackground}
      style={mergedStyle}>
      {options.map(({label, value}) => (
        <Picker.Item
          key={value}
          testID={`selector-option-${value}`}
          label={label}
          value={value}
        />
      ))}
    </Picker>
  );
};

export default Selector;
