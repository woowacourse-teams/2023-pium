import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DictionaryDetail from 'pages/DictionaryDetail';
import DictionarySearch from 'pages/DictionarySearch';
import Error from 'pages/Error';
import Loading from 'pages/Loading';
import Main from 'pages/Main';
import PetDetails from 'pages/PetDetails';
import PetPlantCardList from 'pages/PetPlantCardList';
import PetPlantTimeline from 'pages/PetPlantTimeline';
import PetRegisterForm from 'pages/PetRegister/Form';
import PetRegisterSearch from 'pages/PetRegister/Search';
import Reminder from 'pages/Reminder';
import RootTemplate from 'pages/RootTemplate';
import { URL_PATH } from './constants';

const router = createBrowserRouter([
  {
    path: URL_PATH.main,
    element: <RootTemplate />,
    errorElement: <Error />,
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
          <Suspense fallback={<Loading />}>
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
          <Suspense fallback={<Loading />}>
            <DictionaryDetail />
          </Suspense>
        ),
      },
      {
        path: URL_PATH.petList,
        element: (
          <Suspense fallback={<Loading />}>
            <PetPlantCardList />
          </Suspense>
        ),
      },
      {
        path: URL_PATH.petDetail,
        element: <PetDetails />,
      },
      {
        path: URL_PATH.petEdit,
        element: (
          <Suspense fallback={<Loading />}>
            <PetPlantEdit />
          </Suspense>
        ),
      },
      {
        path: URL_PATH.reminder,
        element: (
          <Suspense fallback={<Loading />}>
            <Reminder />
          </Suspense>
        ),
      },
      {
        path: URL_PATH.timeline,
        element: (
          <Suspense fallback={<Loading />}>
            <PetPlantTimeline />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
