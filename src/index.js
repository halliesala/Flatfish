import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import MainPage from './components/MainPage'
import About from './components/About'
import ErrorPage from './components/ErrorPage';
import History from './components/History'
import Play from './components/Play';

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
        element: <History />
      },
      {
        path: "play",
        element: <Play />
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

