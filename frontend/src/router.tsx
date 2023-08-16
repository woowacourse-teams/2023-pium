import { createBrowserRouter } from 'react-router-dom';
import DictionaryDetail from 'pages/DictionaryDetail';
import DictionarySearch from 'pages/DictionarySearch';
import NotFound from 'pages/Error/NotFound';
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
        element: <PetRegisterForm />,
      },
      {
        path: URL_PATH.dictSearch,
        element: <DictionarySearch />,
      },
      {
        path: URL_PATH.dictDetail,
        element: <DictionaryDetail />,
      },
      {
        path: URL_PATH.petList,
        element: <PetPlantCardList />,
      },
      {
        path: URL_PATH.petDetail,
        element: <PetDetails />,
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
