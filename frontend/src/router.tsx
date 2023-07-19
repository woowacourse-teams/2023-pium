import { Suspense } from 'react';
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
        path: URL_PATH.DICT,
        element: (
          <Suspense fallback={<div>로딩중입니다.</div>}>
            <DictionaryDetail />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
