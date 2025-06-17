import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/ui/pages/Home/index.tsx";
import LoginPage from "@/components/ui/pages/User/Auth/Login/index.tsx";
import SignupPage from "@/components/ui/pages/User/Auth/Signup/index.tsx";
import ActivateAccout from "./components/ui/pages/User/Auth/Activate/index.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { routes } from "./constants/routes.tsx";


const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
