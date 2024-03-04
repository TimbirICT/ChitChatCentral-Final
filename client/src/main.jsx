import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../../client/src/pages/Home'
import Messages from '../../client/src/pages/Messages'
import Friends from '../../client/src/pages/Friends'
import Logout from '../../client/src/pages/Logout'
import Login from '../../client/src/pages/Login'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'messages',
        element: <Messages/>,
      },
      {
        path: 'friends',
        element: <Friends />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);