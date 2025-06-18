import App from "@/App";
import BestSellingPage from "@/components/ui/pages/BestSellingPage";
import EventsPage from "@/components/ui/pages/EventsPage";
import FAQsPage from "@/components/ui/pages/FAQsPage";
import HomePage from "@/components/ui/pages/Home";
import ProductsPage from "@/components/ui/pages/ProductsPage";
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
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/best-selling",
        element: <BestSellingPage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/faqs",
        element: <FAQsPage />,
      },
    ],
  },
];
