import MockAdapter from '@core/network/MockAdapter';
import React from 'react';
import {render, screen, waitFor} from '../../utilities/test-util';
import Home from './Home';

const axiosMock = new MockAdapter().mockAxios;

axiosMock
  .onGet(`https://jsonplaceholder.typicode.com/users/1`)
  .reply(200, {name: 'dummy_user'});

afterAll(() => {
  axiosMock.restore();
});
describe('[Screens] - [Home]', () => {
  test('should render the home screen When user is logged in', async () => {
    const {root} = render(<Home />);
    await waitFor(() => screen.getByText('HOME'));
    expect(root).toBeTruthy();
  });
  test('should have log out button on screen', async () => {
    const logOutButtonTestId = 'home';
    render(<Home />);
    await waitFor(() => screen.getByText('HOME'));
    const logoutButton = screen.getByTestId(logOutButtonTestId);
    expect(logoutButton).toBeTruthy();
  });
});
