import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DictionaryDetail from 'pages/DictionaryDetail';
import DictionarySearch from 'pages/DictionarySearch';
import Main from 'pages/Main';
import PetDetails from 'pages/PetDetails';
import PetList from 'pages/PetList';
import PetRegisterForm from 'pages/PetRegister/Form';
import PetRegisterSearch from 'pages/PetRegister/Search';
import RootTemplate from 'pages/RootTemplate';
import Spinner from 'components/@common/Spinner';
import { URL_PATH } from './constants';

const router = createBrowserRouter([
  {
    path: URL_PATH.main,
    element: <RootTemplate />,
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
        path: URL_PATH.dictSearch,
        element: <DictionarySearch />,
      },
      {
        path: URL_PATH.dictDetail,
        element: (
          <Suspense fallback={<Spinner />}>
            <DictionaryDetail />
          </Suspense>
        ),
      },
      {
        path: URL_PATH.petList,
        element: (
          <Suspense fallback={<div>로딩중입니다.</div>}>
            <PetList />
          </Suspense>
        ),
      },
      {
        path: URL_PATH.petDetail,
        element: <PetDetails />,
      },
    ],
  },
]);

export default router;
