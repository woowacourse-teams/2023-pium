import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DictionaryPlantDetail from 'pages/DictionaryPlantDetail';
import DictionaryPlantSearch from 'pages/DictionaryPlantSearch';
import NotFound from 'pages/Error/NotFound';
import Main from 'pages/Main';
import PetPlantCardList from 'pages/PetPlantCardList';
import PetPlantDetails from 'pages/PetPlantDetails';
import PetPlantEdit from 'pages/PetPlantEdit';
import PetPlantRegisterForm from 'pages/PetPlantRegister/Form';
import PetPlantRegisterSearch from 'pages/PetPlantRegister/Search';
import PetPlantTimeline from 'pages/PetPlantTimeline';
import Reminder from 'pages/Reminder';
import RootTemplate from 'pages/RootTemplate';
import { URL_PATH } from './constants';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ 'pages/Login'));
const Authorization = lazy(
  () => import(/* webpackChunkName: "Authorization" */ 'pages/Login/Authorization')
);
const MyPage = lazy(() => import(/* webpackChunkName: "MyPage" */ 'pages/MyPage'));

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
