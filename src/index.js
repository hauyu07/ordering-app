import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Start from "./pages/Customer/Start";
import MainPage from "./pages/Customer/MainPage";
import OrderedItems from "./pages/Customer/OrderedItemsPage";
import Login from "./pages/Restaurant/LoginPage";
import MainPageR from "./pages/Restaurant/MainPageR";
import MenuPage from "./pages/Restaurant/MenuPage";
import TablePage from "./pages/Restaurant/TablePage";
import OrderPage from "./pages/Restaurant/OrderPage";
import "./styles/global.css";

const router = createBrowserRouter([
  {
    path: "/restaurant/login",
    element: <Login />,
  },
  {
    path: "/restaurant/main",
    element: <MainPageR />,
  },
  {
    path: "/restaurant/menu",
    element: <MenuPage />,
  },
  {
    path: "/restaurant/table",
    element: <TablePage />,
  },
  {
    path: "/restaurant/order",
    element: <OrderPage />,
  },
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
