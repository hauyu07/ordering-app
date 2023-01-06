import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Start from "./Start";
import MainPage from "./page/MainPage";
import Appetizer from "./menuPages/Appetizer";
import MainCourse from "./menuPages/MainCourse";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/main",
    element: <MainPage />,
    children: [
      {
        path: "appetizer",
        element: <Appetizer />,
      },
      {
        path: "main course",
        element: <MainCourse />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
