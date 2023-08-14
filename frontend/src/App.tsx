import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Error from 'pages/Error';
import Confirm from 'components/@common/Confirm';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import ToastList from 'components/@common/Toast/ToastList';
import { GlobalStyle } from 'style/Global.style';
import theme from 'style/theme.style';
import router from './router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<Error />}>
            <RecoilRoot>
              <RouterProvider router={router} />
              <Confirm />
              <ToastList />
            </RecoilRoot>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
