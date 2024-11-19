import MockAdapter from 'axios-mock-adapter';
import type MockAdapterType from 'axios-mock-adapter/types';
import {axiosInstance} from '.';

class AxiosMockAdapter {
  mockAxios: MockAdapterType;
  constructor() {
    this.mockAxios = new MockAdapter(axiosInstance);
  }
}

export default AxiosMockAdapter;
