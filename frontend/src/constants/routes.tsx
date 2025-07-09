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
import ProfileLayout from "@/components/layouts/ProfileLayout";
import type { RouteObject } from "react-router";
import SellerLayout from "@/components/layouts/SellerLayout";
import DashboardPage from "@/components/ui/pages/seller/Dashboard";
import ShopDetailPage from "@/components/ui/pages/shop/ShopDetailPage";
import CreateProductPage from "@/components/ui/pages/seller/CreateProductPage";
import NotFountPage from "@/components/ui/pages/NotFoundPage";
import AllProductsPage from "@/components/ui/pages/seller/AllProducts";
import UpdateProductPage from "@/components/ui/pages/seller/UpdateProductPage";
import CreateEventPage from "@/components/ui/pages/seller/CreateEventPage";
import SellerEventPage from "@/components/ui/pages/seller/SellerEvents";
import UpdateSellerEventPage from "@/components/ui/pages/seller/UpdateSellerEventPage";
import CoupounPage from "@/components/ui/pages/seller/CoupounPage";
import UpdateCoupounPage from "@/components/ui/pages/seller/UpdateCoupounPage";
import CheckoutPage from "@/components/ui/pages/CheckoutPage";

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
      {
        path: "shop/:slug",
        element: <ShopDetailPage />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
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
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "create-product",
        element: <CreateProductPage />,
      },
      {
        path: "products",
        element: <AllProductsPage />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProductPage />,
      },
      {
        path: "create-event",
        element: <CreateEventPage />,
      },
      {
        path: "update-event/:id",
        element: <UpdateSellerEventPage />,
      },
      {
        path: "events",
        element: <SellerEventPage />,
      },
      {
        path: "coupouns",
        element: <CoupounPage />,
      },
      {
        path: "coupoun/update/:id",
        element: <UpdateCoupounPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFountPage />,
  },
];
