import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import Providers from "@/components/providers/Providers";
import Navbar from "@/components/shared/Navbar";

export const metadata: Metadata = {
  title: "RentNest",
  description: "Find & List Rental Properties with Ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}