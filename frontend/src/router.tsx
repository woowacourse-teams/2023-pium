import { createBrowserRouter } from 'react-router-dom';
import DictionaryDetail from 'pages/DictionaryDetail';
import Main from 'pages/Main';
import Root from 'pages/Root';
import { URL_PATH } from './constants';

const router = createBrowserRouter([
  {
    path: URL_PATH.MAIN,
    element: <Root />,
    children: [
      {
        path: URL_PATH.MAIN,
        element: <Main />,
      },
      {
        path: URL_PATH.DICT(),
        element: <DictionaryDetail />,
      },
    ],
  },
]);

export default router;
