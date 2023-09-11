import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DictionaryPlantDetail from 'pages/DictionaryPlantDetail';
import DictionaryPlantSearch from 'pages/DictionaryPlantSearch';
import NotFound from 'pages/Error/NotFound';
import RootTemplate from 'pages/RootTemplate';
import { URL_PATH } from './constants';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ 'pages/Login'));
const Authorization = lazy(
  () => import(/* webpackChunkName: "Authorization" */ 'pages/Login/Authorization')
);
const Main = lazy(() => import(/* webpackChunkName: "Main" */ 'pages/Main'));
const MyPage = lazy(() => import(/* webpackChunkName: "MyPage" */ 'pages/MyPage'));
const PetPlantCardList = lazy(
  () => import(/* webpackChunkName: "PetPlantCardList" */ 'pages/PetPlantCardList')
);
const PetPlantDetails = lazy(
  () => import(/* webpackChunkName: "PetPlantDetails" */ 'pages/PetPlantDetails')
);
const PetPlantEdit = lazy(
  () => import(/* webpackChunkName: "PetPlantEdit" */ 'pages/PetPlantEdit')
);
const PetPlantRegisterForm = lazy(
  () => import(/* webpackChunkName: "PetPlantRegisterForm" */ 'pages/PetPlantRegister/Form')
);
const PetPlantRegisterSearch = lazy(
  () => import(/* webpackChunkName: "PetPlantRegisterSearch" */ 'pages/PetPlantRegister/Search')
);
const PetPlantTimeline = lazy(
  () => import(/* webpackChunkName: "PetPlantTimeline" */ 'pages/PetPlantTimeline')
);
const Reminder = lazy(() => import(/* webpackChunkName: "Reminder" */ 'pages/Reminder'));

const router = createBrowserRouter([
  {
    path: URL_PATH.main,
    element: <RootTemplate />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: URL_PATH.petRegisterSearch,
        element: <PetPlantRegisterSearch />,
      },
      {
        path: URL_PATH.petRegisterForm,
        element: <PetPlantRegisterForm />,
      },
      {
        path: URL_PATH.dictSearch,
        element: <DictionaryPlantSearch />,
      },
      {
        path: URL_PATH.dictDetail,
        element: <DictionaryPlantDetail />,
      },
      {
        path: URL_PATH.petList,
        element: <PetPlantCardList />,
      },
      {
        path: URL_PATH.petDetail,
        element: <PetPlantDetails />,
      },
      {
        path: URL_PATH.petEdit,
        element: <PetPlantEdit />,
      },
      {
        path: URL_PATH.reminder,
        element: <Reminder />,
      },
      {
        path: URL_PATH.timeline,
        element: <PetPlantTimeline />,
      },
      {
        path: URL_PATH.login,
        element: <Login />,
      },
      {
        path: URL_PATH.authorization,
        element: <Authorization />,
      },
      {
        path: URL_PATH.myPage,
        element: <MyPage />,
      },
    ],
  },
]);

export default router;
