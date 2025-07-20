import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";



const popins = Poppins({
  weight: ["100", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shinobi Shop",
  description: "It's just a shinobi shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${popins.className} antialiased bg-light-gray`}
      >
        <NextTopLoader
          color="#FF8A65"
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
          />
       <Toaster closeButton={true} richColors={true} position="top-right" />
        {children}
      </body>
    </html>
  );
}
