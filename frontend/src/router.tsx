import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DictionaryDetail from 'pages/DictionaryDetail';
import DictionarySearch from 'pages/DictionarySearch';
import NotFound from 'pages/Error/NotFound';
import UnAuthorize from 'pages/Error/UnAuthorize';
import Loading from 'pages/Loading';
import Login from 'pages/Login';
import Authorization from 'pages/Login/Authorization';
import Main from 'pages/Main';
import MyPage from 'pages/MyPage';
import PetDetails from 'pages/PetDetails';
import PetPlantCardList from 'pages/PetPlantCardList';
import PetPlantEdit from 'pages/PetPlantEdit';
import PetPlantTimeline from 'pages/PetPlantTimeline';
import PetRegisterForm from 'pages/PetRegister/Form';
import PetRegisterSearch from 'pages/PetRegister/Search';
import Reminder from 'pages/Reminder';
import RootTemplate from 'pages/RootTemplate';
import ErrorBoundary from 'components/@common/ErrorBoundary';
import { URL_PATH } from './constants';

const router = createBrowserRouter([
  {
    path: URL_PATH.main,
    element: <RootTemplate />,
    errorElement: <NotFound />,
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
          <ErrorBoundary fallback={<UnAuthorize />} statusCode={401}>
            <Suspense fallback={<Loading />}>
              <PetRegisterForm />
            </Suspense>
          </ErrorBoundary>
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
          <ErrorBoundary fallback={<UnAuthorize />} statusCode={401}>
            <Suspense fallback={<Loading />}>
              <PetPlantCardList />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: URL_PATH.petDetail,
        element: (
          <ErrorBoundary fallback={<UnAuthorize />} statusCode={401}>
            <PetDetails />
          </ErrorBoundary>
        ),
      },
      {
        path: URL_PATH.petEdit,
        element: (
          <ErrorBoundary fallback={<UnAuthorize />} statusCode={401}>
            <Suspense fallback={<Loading />}>
              <PetPlantEdit />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: URL_PATH.reminder,
        element: (
          <ErrorBoundary fallback={<UnAuthorize />} statusCode={401}>
            <Suspense fallback={<Loading />}>
              <Reminder />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: URL_PATH.timeline,
        element: (
          <ErrorBoundary fallback={<UnAuthorize />} statusCode={401}>
            <Suspense fallback={<Loading />}>
              <PetPlantTimeline />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: URL_PATH.login,
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: URL_PATH.authorization,
        element: (
          <Suspense fallback={<Loading />}>
            <Authorization />,
          </Suspense>
        ),
      },
      {
        path: URL_PATH.myPage,
        element: (
          <ErrorBoundary fallback={<UnAuthorize />} statusCode={401}>
            <MyPage />
          </ErrorBoundary>
        ),
      },
    ],
  },
]);

export default router;
