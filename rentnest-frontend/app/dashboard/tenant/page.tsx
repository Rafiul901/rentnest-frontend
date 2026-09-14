"use client";

import toast from "react-hot-toast";
import axios from "axios";

import { useRentals } from "@/hooks/useRentals";
import { usePayments } from "@/hooks/usePayments";
import { useCreatePayment } from "@/hooks/useCreatePayment";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Wallet,
} from "lucide-react";

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

  const createPaymentMutation = useCreatePayment();

  // -----------------------------
  // Payment handler
  // -----------------------------

  const handlePayment = (rentalRequestId: string) => {
    createPaymentMutation.mutate(
      {
        rentalRequestId,
        provider: "STRIPE",
      },
      {
        onSuccess: (response) => {
          const stripeUrl = response.data.stripeSession.url;

          if (stripeUrl) {
            window.location.href = stripeUrl;
          } else {
            toast.error("Stripe checkout URL was not found.");
          }
        },
        onError: (error: unknown) => {
          console.error("Create payment failed:", error);

          let status: number | undefined;
          let backendMessage: string | undefined;

          if (axios.isAxiosError(error)) {
            status = error.response?.status;
            const data = error.response?.data;

            // Backend sometimes returns HTML for 409 (Express default).
            // Guard so we don't crash trying to read `.message` off a string.
            if (data && typeof data === "object" && "message" in data) {
              backendMessage = (data as { message?: string }).message;
            }
          }

          if (status === 409) {
            toast.error("A payment for this rental already exists.");
          } else if (status === 401) {
            toast.error("Please log in again.");
          } else if (status === 403) {
            toast.error("Only tenants can pay rent.");
          } else {
            toast.error(backendMessage ?? "Unable to start payment.");
          }
        },
      }
    );
  };

  // -----------------------------
  // Loading state
  // -----------------------------

  if (rentalsLoading || paymentsLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">Tenant Dashboard</h1>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>

          <div className="mt-8 h-64 animate-pulse rounded-xl bg-gray-200" />
        </div>
      </main>
    );
  }

  // -----------------------------
  // Error state
  // -----------------------------

  if (rentalsError || paymentsError) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <Card>
            <CardContent className="flex min-h-48 items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-red-600">
                  Something went wrong
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  We could not load your dashboard data.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // -----------------------------
  // Data
  // -----------------------------

  const rentals = rentalData?.data ?? [];
  const payments = paymentData?.data ?? [];

  const totalRequests = rentals.length;

  const pendingRequests = rentals.filter(
    (rental) => rental.status === "PENDING"
  ).length;

  const approvedRequests = rentals.filter(
    (rental) => rental.status === "APPROVED"
  ).length;

  const totalPayments = payments.length;

  // -----------------------------
  // Helpers
  // -----------------------------

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusVariant = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "APPROVED":
        return "default";
      case "PENDING":
        return "secondary";
      case "REJECTED":
        return "destructive";
      default:
        return "outline";
    }
  };

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div>
          <p className="text-sm font-medium text-gray-500">
            Welcome back
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Tenant Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your rental requests and payment history.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Requests */}
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Requests
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {totalRequests}
                </p>
              </div>

              <div className="rounded-full bg-blue-100 p-3">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          {/* Pending */}
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {pendingRequests}
                </p>
              </div>

              <div className="rounded-full bg-yellow-100 p-3">
                <Clock3 className="h-6 w-6 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          {/* Approved */}
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Approved
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {approvedRequests}
                </p>
              </div>

              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Payments
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {totalPayments}
                </p>
              </div>

              <div className="rounded-full bg-purple-100 p-3">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rental Requests */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Rental Requests</CardTitle>
          </CardHeader>

          <CardContent>
            {rentals.length === 0 ? (
              <div className="py-10 text-center">
                <Building2 className="mx-auto h-10 w-10 text-gray-400" />

                <p className="mt-3 font-medium">
                  No rental requests yet
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Your rental requests will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map((rental) => {
                  const isThisOnePending =
                    createPaymentMutation.isPending &&
                    createPaymentMutation.variables?.rentalRequestId ===
                      rental.id;

                  return (
                    <div
                      key={rental.id}
                      className="rounded-xl border bg-white p-5 transition hover:shadow-sm"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        {/* Property information */}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              {rental.property.title}
                            </h3>

                            <Badge variant={getStatusVariant(rental.status)}>
                              {rental.status}
                            </Badge>
                          </div>

                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4" />
                            <span>{rental.property.location}</span>
                          </div>

                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              Move-in: {formatDate(rental.moveInDate)}
                            </span>
                          </div>
                        </div>

                        {/* Price + action */}
                        <div className="flex flex-col items-start gap-3 md:items-end">
                          <p className="text-lg font-bold">
                            {formatCurrency(rental.property.price)}
                            <span className="text-sm font-normal text-gray-500">
                              {" "}
                              / month
                            </span>
                          </p>

                          {rental.status === "APPROVED" && (
                            <Button
                              className="gap-2"
                              onClick={() => handlePayment(rental.id)}
                              disabled={createPaymentMutation.isPending}
                            >
                              <CreditCard className="h-4 w-4" />
                              {isThisOnePending
                                ? "Processing..."
                                : "Pay Rent"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>

          <CardContent>
            {payments.length === 0 ? (
              <div className="py-10 text-center">
                <CreditCard className="mx-auto h-10 w-10 text-gray-400" />

                <p className="mt-3 font-medium">
                  No payments yet
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Your payment history will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="rounded-xl border bg-white p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="font-semibold">
                          {payment.rentalRequest.property.title}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {payment.rentalRequest.property.location}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                          <span>Provider: {payment.provider}</span>
                          <span>
                            Date: {formatDate(payment.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start gap-2 md:items-end">
                        <p className="text-lg font-bold">
                          {formatCurrency(payment.amount)}
                        </p>

                        <Badge variant={getStatusVariant(payment.status)}>
                          {payment.status}
                        </Badge>

                        <p className="max-w-[220px] truncate text-xs text-gray-400">
                          ID: {payment.transactionId}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}