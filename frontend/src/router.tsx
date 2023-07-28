import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DictionaryDetail from 'pages/DictionaryDetail';
import DictionarySearch from 'pages/DictionarySearch';
import Main from 'pages/Main';
import PetRegisterForm from 'pages/PetRegister/Form';
import PetRegisterSearch from 'pages/PetRegister/Search';
import Root from 'pages/Root';
import { URL_PATH } from './constants';

const router = createBrowserRouter([
  {
    path: URL_PATH.main,
    element: <Root />,
    children: [
      {
        path: URL_PATH.main,
        element: <Main />,
      },
      {
        path: URL_PATH.petRegisterSearch,
        element: <PetRegisterSearch />,
      },
      {
        path: URL_PATH.petRegisterForm,
        element: (
          <Suspense fallback={<div>로딩중입니다.</div>}>
            <PetRegisterForm />
          </Suspense>
        ),
      },
      {
        path: '/dict',
        element: <DictionarySearch />,
      },
      {
        path: URL_PATH.dictDetail,
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
