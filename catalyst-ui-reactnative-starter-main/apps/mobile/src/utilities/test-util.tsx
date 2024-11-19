import {FC, ReactElement, ReactNode} from 'react';
import {render, RenderAPI} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ThemeProvider} from '../context/theme/themeContext';

const query = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
    },
  },
});
afterEach(() => {
  query.clear();
});
const AllTheProviders: FC<{children: ReactNode}> = ({children}) => (
  <ThemeProvider>
    <QueryClientProvider client={query}>{children}</QueryClientProvider>
  </ThemeProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderAPI, 'wrapper'>) =>
  render(ui, {wrapper: AllTheProviders, ...options});

export * from '@testing-library/react-native';
export {customRender as render};
