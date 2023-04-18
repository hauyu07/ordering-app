import React from "react";
import { Outlet, Route } from "react-router-dom";
import { AuthProvider } from "./firebase";

import Start from "./pages/Customer/Start";
import MainPage from "./pages/Customer/MainPage";
import OrderedItems from "./pages/Customer/OrderedItemsPage";
import Login from "./pages/Restaurant/LoginPage";
import MainPageR from "./pages/Restaurant/MainPageR";
import MenuPage from "./pages/Restaurant/menu/MenuPage";
import TablePage from "./pages/Restaurant/TablePage";
import OrderPage from "./pages/Restaurant/OrderPage";
import MenuFunctionPage from "./pages/Restaurant/menu/MenuFunctionPage";
import MenuSelectionPage from "./pages/Restaurant/menu/MenuSelectionPage";
import AddMenuPage from "./pages/Restaurant/menu/MenuAddPage";
import HomePage from "./pages/Restaurant/Home";
import SignUpPage from "./pages/Restaurant/SignUpPage";

const routes = [
  {
    path: "/restaurant",
    element: <HomePage />,
  },
  {
    path: "/restaurant/signup",
    element: <SignUpPage />,
  },
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
    element: <MenuFunctionPage />,
  },
  {
    path: "/restaurant/menu/add-menu",
    element: <AddMenuPage />,
  },
  {
    path: "/restaurant/menu/select-active",
    element: <MenuSelectionPage />,
  },
  {
    path: "/restaurant/menu/:menuId",
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
    path: "/:customerId/start",
    element: <Start />,
  },
  {
    path: "/:customerId/main",
    element: <MainPage />,
  },
  {
    path: "/:customerId/ordered",
    element: <OrderedItems />,
  },
];

const AppRoutes = (
  <Route
    element={
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    }
  >
    {routes.map((route) => (
      <Route key={route.path} {...route} />
    ))}
  </Route>
);

export default AppRoutes;
