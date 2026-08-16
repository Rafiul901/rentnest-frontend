"use client";

import { useAuth } from "@/components/providers/AuthProvider";

export default function TenantDashboard() {
  const { user } = useAuth();

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="text-3xl font-bold">
        Tenant Dashboard
      </h1>

      <p className="mt-4 text-gray-600">
        Welcome, {user?.name}
      </p>

      <p className="mt-2">
        Email: {user?.email}
      </p>

      <p>
        Role: {user?.role}
      </p>
    </main>
  );
}