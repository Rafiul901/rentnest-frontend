"use client";

import { useAuth } from "@/components/providers/AuthProvider";

export default function LandlordDashboard() {
  const { user } = useAuth();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="text-3xl font-bold">
        Landlord Dashboard
      </h1>

      <p className="mt-4">
        Welcome, {user?.name}
      </p>

      <p>
        Role: {user?.role}
      </p>
    </main>
  );
}