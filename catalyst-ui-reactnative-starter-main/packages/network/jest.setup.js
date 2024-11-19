import MockAdapter from 'axios-mock-adapter';
import {axiosInstance} from '.';

global.axiosMock = new MockAdapter(axiosInstance);
global.AbortController = jest.fn().mockImplementation(() => ({
  abort: jest.fn(),
  signal: {},
}));
