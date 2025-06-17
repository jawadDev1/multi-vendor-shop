import App from "@/App";
import HomePage from "@/components/ui/pages/Home";
import ActivateAccout from "@/components/ui/pages/User/Auth/Activate";
import LoginPage from "@/components/ui/pages/User/Auth/Login";
import SignupPage from "@/components/ui/pages/User/Auth/Signup";
import type { RouteObject } from "react-router";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/activate/:token",
        element: <ActivateAccout />,
      },
    ],
  },
];
