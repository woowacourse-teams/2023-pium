import { createBrowserRouter } from 'react-router-dom';
import Main from 'pages/Main';
import Root from 'pages/Root';

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Main />,
      },
    ],
  },
]);

export default router;
