import { createBrowserRouter } from 'react-router-dom';
import Main from 'pages/Main';
import PetRegisterForm from 'pages/PetRegister/Form';
import PetRegisterSearch from 'pages/PetRegister/Search';
import Root from 'pages/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'pet/register',
        element: <PetRegisterSearch />,
      },
      {
        path: 'pet/register/:id',
        element: <PetRegisterForm />,
      },
    ],
  },
]);

export default router;
