# [Styling](#Styling)

- We are using `styled-components` (CSS-in-JS library) for styling.
- Integrated styled-components with jest (using `jest-styled-components` package) to give additional utilities for testing.

### [References](#references)

- Official docs for [styled-components](https://styled-components.com/docs/basics#react-native)
- Blog - [How to use styled-components with React Native](https://blog.logrocket.com/how-to-use-styled-components-with-react-native/)

### Observations

- While styling the default/native components, pass it to `styled` constructor, will give access to default props. Styling using tagged template literals won't give access to default props.
  > e.g. `styled(TouchableOpacity)` will give access to default props on Touchableopacity which are not accessible with `styled.TouchableOpacity`
  
### Theming
- We have created our custom theme context so that we can expose our theme properties and methods for toggling the theme.Secondly,our custom theme Provider encloses the StyledProvider (from styled-components library)
- Also we are declaring the `styled-components/native` module,so that `DefaultTheme` extends our custom Theme type
