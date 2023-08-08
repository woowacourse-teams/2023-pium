import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Error from 'pages/Error';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import ToastList from 'components/@common/Toast/ToastList';
import ToastProvider from 'contexts/toastContext';
import { GlobalStyle } from 'style/Global.style';
import { GlobalFont } from 'style/GlobalFont.style';
import theme from 'style/theme.style';
import router from './router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <GlobalFont />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<Error />}>
            <ToastProvider>
              <RouterProvider router={router} />
              <ToastList />
            </ToastProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
