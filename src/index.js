import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css'


import MainPage from './components/MainPage'
import About from './components/About'
import ErrorPage from './components/ErrorPage';
import History from './components/History'
import Play from './components/Play';
import { getGamesLoader, getGameByIdLoader } from './loaders';
import PlayRME from './components/PlayRME';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "history",
        element: <History />,
        loader: getGamesLoader,
      },
      {
        path: "play",
        element: <Play />
      },
      {
        path: "play/:id",
        element: <Play />,
        loader: getGameByIdLoader,
      },
      {
        path: "play/rme",
        element: <PlayRME />
      }
    ]
  },
  
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

