'use client';
import Loader from "@/components/ui/atoms/extra/Loader";
import { useUserStore } from "@/stores/user-store";
import { notFound } from "next/navigation";
import React from "react";

const ProtectedLayoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated, userLoaded } = useUserStore();

  if (!userLoaded) return <Loader />;

  if (!isAuthenticated) return notFound();

  return { children };
};

export default ProtectedLayoute;
