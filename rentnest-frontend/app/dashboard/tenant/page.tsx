"use client";

import { useRentals } from "@/hooks/useRentals";
import { usePayments } from "@/hooks/usePayments";

export default function TenantDashboardPage() {
  const {
    data: rentalData,
    isLoading: rentalsLoading,
    isError: rentalsError,
  } = useRentals();

  const {
    data: paymentData,
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = usePayments();

  if (rentalsLoading || paymentsLoading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  if (rentalsError || paymentsError) {
    return (
      <div className="p-8 text-red-500">
        Something went wrong loading the dashboard.
      </div>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Tenant Dashboard
      </h1>

      <pre className="mt-8 overflow-auto rounded-lg bg-gray-100 p-4">
        {JSON.stringify(
          {
            rentals: rentalData?.data,
            payments: paymentData?.data,
          },
          null,
          2
        )}
      </pre>
    </main>
  );
}