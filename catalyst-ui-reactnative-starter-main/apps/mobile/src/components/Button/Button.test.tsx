import Button from './Button';
import {act, fireEvent, render, screen} from '../../utilities/test-util';

describe('[Component] - [Button]', () => {
  test('should render button component correctly', () => {
    const button = render(
      <Button
        text="Press me"
        onPress={jest.fn()}
        accessibleProps="mock-button"
      />,
    );
    expect(button).toMatchSnapshot();
  });

  test('should be clickable', () => {
    const mockFunction = jest.fn();
    render(
      <Button
        text="Press me"
        onPress={mockFunction}
        accessibleProps="mock-button"
      />,
    );
    act(() => {
      fireEvent.press(screen.getByText('Press me'));
    });

    expect(mockFunction).toBeCalledTimes(1);
  });
});
