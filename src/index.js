import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import ErrorPage from "./routes/ErrorPage";
import Root from "./routes/Root";

import Homepage from "./routes/Homepage";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Profile from './routes/Profile';
import Password from './routes/Password';
import Games from './routes/Games';
import Roulette from './routes/rouletteComponents/Roulette';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/profile/password",
        element: <Password />
      },
      {
        path: "/games",
        element: <Games />
      },
      {
        path: "/games/roulette",
        element: <Roulette />
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
reportWebVitals();
