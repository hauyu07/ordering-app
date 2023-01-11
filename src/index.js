import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Start from "./Start";
import MainPage from "./pages/MainPage";
import OrderedItems from "./pages/OrderedItemsPage";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/ordered",
    element: <OrderedItems />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
