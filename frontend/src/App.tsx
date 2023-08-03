import { RouterProvider } from 'react-router-dom';
import Error from 'pages/Error';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import router from './router';

const App = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
