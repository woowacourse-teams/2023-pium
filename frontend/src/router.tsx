import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NotFound from 'pages/@common/Error/NotFound';
import Main from 'pages/@common/Main';
import RootTemplate from 'pages/@common/RootTemplate';
import DictionaryPlantDetail from 'pages/dictionaryPlant/DictionaryPlantDetail';
import DictionaryPlantSearch from 'pages/dictionaryPlant/DictionaryPlantSearch';
import NewDictionaryPlantRequest from 'pages/dictionaryPlant/NewDictionaryPlantRequest';
import GardenPostList from 'pages/garden/GardenPostList';
import GardenRegisterForm from 'pages/garden/GardenRegisterForm';
import GardenRegisterPick from 'pages/garden/GardenRegisterPick';
import PetPlantCardList from 'pages/petPlant/PetPlantCardList';
import PetPlantDetails from 'pages/petPlant/PetPlantDetails';
import PetPlantEdit from 'pages/petPlant/PetPlantEdit';
import PetPlantRegisterForm from 'pages/petPlant/PetPlantRegister/Form';
import PetPlantRegisterSearch from 'pages/petPlant/PetPlantRegister/Search';
import PetPlantTimeline from 'pages/petPlant/PetPlantTimeline';
import Reminder from 'pages/reminder/ReminderPage';
import { URL_PATH } from './constants';

const Login = lazy(() => import(/* webpackChunkName: "Login" */ 'pages/auth/Login'));
const Authorization = lazy(
  () => import(/* webpackChunkName: "Authorization" */ 'pages/auth/Login/Authorization')
);
const MyPage = lazy(() => import(/* webpackChunkName: "MyPage" */ 'pages/auth/MyPage'));

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
        path: URL_PATH.garden,
        element: <GardenPostList />,
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
      {
        path: URL_PATH.gardenRegisterPick,
        element: <GardenRegisterPick />,
      },
      {
        path: URL_PATH.gardenRegisterForm,
        element: <GardenRegisterForm />,
      },
      {
        path: URL_PATH.newDictionaryPlantRequest,
        element: <NewDictionaryPlantRequest />,
      },
    ],
  },
]);

export default router;
