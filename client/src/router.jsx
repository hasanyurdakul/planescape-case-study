import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import MyFlightsPage from "./pages/MyFlightsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// ######################################################################
// react-router-dom kullanımında, router'ı oluşturup export etmemiz gerekiyor. Oluşturduğumuz router'ı, App.js dosyasında RouterProvider'a prop olarak veriyoruz.
// ######################################################################

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "myflights",
        element: <MyFlightsPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);
