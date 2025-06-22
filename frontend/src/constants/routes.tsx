import App from "@/App";
import ProtectedRoute from "@/components/ui/molecules/ProtectedRoute";
import BestSellingPage from "@/components/ui/pages/BestSellingPage";
import EventsPage from "@/components/ui/pages/EventsPage";
import FAQsPage from "@/components/ui/pages/FAQsPage";
import HomePage from "@/components/ui/pages/Home";
import ProductDetialPage from "@/components/ui/pages/ProductDetailPage";
import ProductsPage from "@/components/ui/pages/ProductsPage";
import ProfilePage from "@/components/ui/pages/ProfilePage";
import RegisterSeller from "@/components/ui/pages/RegisterSellerPage";
import ActivateAccout from "@/components/ui/pages/User/Auth/Activate";
import LoginPage from "@/components/ui/pages/User/Auth/Login";
import SignupPage from "@/components/ui/pages/User/Auth/Signup";
import ProfileLayout from "@/ProfileLayout";
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
      {
        path: "/products/:slug",
        element: <ProductDetialPage />,
      },
      {
        path: "/become-seller",
        element: (
          <ProtectedRoute>
            <RegisterSeller />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
