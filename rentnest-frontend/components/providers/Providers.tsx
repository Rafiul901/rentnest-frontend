"use client";

import QueryProvider from "./QueryProvider";
import AuthProvider from "./AuthProvider";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}

        <Toaster position="top-right" />
      </AuthProvider>
    </QueryProvider>
  );
}