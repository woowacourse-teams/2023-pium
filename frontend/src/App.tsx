import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import Confirm from 'components/@common/Confirm';
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
          <RecoilRoot>
            <RouterProvider router={router} />
            <Confirm />
            <ToastList />
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
