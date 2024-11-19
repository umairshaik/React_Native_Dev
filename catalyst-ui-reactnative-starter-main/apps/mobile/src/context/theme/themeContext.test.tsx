import {Pressable, Text} from 'react-native';
import React from 'react';
import {useThemeContext, ThemeProvider} from './themeContext';
import {fireEvent, render, screen} from '../../utilities/test-util';

const themeButtonId = 'theme-btn';
const themeTextId = 'theme';
const SampleThemeContext = () => {
  const {theme, toggleTheme} = useThemeContext();
  return (
    <Pressable testID={themeButtonId} onPress={toggleTheme}>
      <Text testID={themeTextId}>{theme.mode}</Text>
    </Pressable>
  );
};
describe('Theme Context', () => {
  test('should change the theme when toggle button is pressed', () => {
    render(
      <ThemeProvider>
        <SampleThemeContext />
      </ThemeProvider>,
    );

    fireEvent.press(screen.getByTestId(themeButtonId));
    expect(screen.getByTestId(themeTextId).props.children).toBe('dark');
    fireEvent.press(screen.getByTestId(themeButtonId));
    expect(screen.getByTestId(themeTextId).props.children).toBe('light');
  });
});
