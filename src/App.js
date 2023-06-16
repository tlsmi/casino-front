import './App.css';
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
import App from './routes/blackjack/App';
import DeleteUserForm from './routes/DeleteUser';
import HelpPage from './routes/help/Help';


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
      },{
        path: "/games/slot",
        element: <SlotGame />
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
      {
        path: "/games/blackjack",
        element: <App />
      },
      {
        path: "/deleteUser",
        element: <DeleteUserForm />
      },
      {
        path: "/help",
        element: <HelpPage />
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
