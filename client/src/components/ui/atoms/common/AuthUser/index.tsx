"use client";
import { useCartStore } from "@/stores/cart-store";
import { useUserStore } from "@/stores/user-store";
import React, { useEffect } from "react";
import LinkButton from "../../buttons/LinkButton";

const AuthUser = () => {
  const { loadUser, isAuthenticated, user  } = useUserStore();
  const { initializeCartState } = useCartStore();

  useEffect(() => {
    loadUser();
    initializeCartState();
  }, []);

  if (!isAuthenticated) {
    return <div />;
  }

  return user?.role === "SELLER" ? (
    <LinkButton href="/seller" className="max-w-[250px]">
      Dashboard
    </LinkButton>
  ) : (
    <LinkButton href="/become-seller" className="max-w-[250px]">
      Become Seller
    </LinkButton>
  );
};

export default AuthUser;
