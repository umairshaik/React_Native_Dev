import {Suspense} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

import RootNavigation from './src/navigation/RootNavigation';
import {AuthProvider} from './src/context/auth/authContext';
import './src/i18n';
import ErrorBoundary from './src/components/ErrorHandler/ErrorHandler';
import {SpinnerProvider} from './src/context/spinner/spinnerContext';
import Spinner from './src/components/Spinner';
import {ThemeProvider} from './src/context/theme/themeContext';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <SpinnerProvider>
      <ErrorBoundary>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            {/* Revisit after migrating to react 18 */}
            <Suspense fallback={<Spinner fullScreeMode />}>
              <RootNavigation />
            </Suspense>
          </QueryClientProvider>
        </AuthProvider>
      </ErrorBoundary>
    </SpinnerProvider>
  </ThemeProvider>
);

export default App;
