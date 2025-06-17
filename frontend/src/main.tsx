import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/ui/pages/Home/index.tsx";
import LoginPage from "@/components/ui/pages/User/Auth/Login/index.tsx";
import SignupPage from "@/components/ui/pages/User/Auth/Signup/index.tsx";
import ActivateAccout from "./components/ui/pages/User/Auth/Activate/index.tsx";

const router = createBrowserRouter([
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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
