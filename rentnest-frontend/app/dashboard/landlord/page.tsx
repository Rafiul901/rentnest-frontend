"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
  XCircle,
} from "lucide-react";

import { useLandlordRentalRequests } from "@/hooks/useLandlordRentalRequests";
import { useUpdateRentalStatus } from "@/hooks/useUpdateRentalStatus";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandlordDashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useLandlordRentalRequests();

  const updateRentalStatus = useUpdateRentalStatus();

  const [processingId, setProcessingId] = useState<string | null>(
    null
  );

  const rentalRequests = data?.data ?? [];

  // -----------------------------
  // Statistics
  // -----------------------------

  const totalRequests = rentalRequests.length;

  const pendingRequests = rentalRequests.filter(
    (request) => request.status === "PENDING"
  ).length;

  const approvedRequests = rentalRequests.filter(
    (request) => request.status === "APPROVED"
  ).length;

  const rejectedRequests = rentalRequests.filter(
    (request) => request.status === "REJECTED"
  ).length;

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
  // Approve / Reject
  // -----------------------------

  const handleStatusUpdate = (
    rentalRequestId: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    setProcessingId(rentalRequestId);

    updateRentalStatus.mutate(
      {
        rentalRequestId,
        data: {
          status,
        },
      },
      {
        onSuccess: (response) => {
          toast.success(response.message);
        },

        onError: () => {
          toast.error(
            `Failed to ${
              status === "APPROVED" ? "approve" : "reject"
            } rental request.`
          );
        },

        onSettled: () => {
          setProcessingId(null);
        },
      }
    );
  };

  // -----------------------------
  // Loading
  // -----------------------------

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // -----------------------------
  // Error
  // -----------------------------

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <Card>
            <CardContent className="flex min-h-48 items-center justify-center">
              <div className="text-center">
                <XCircle className="mx-auto h-10 w-10 text-red-500" />

                <h2 className="mt-3 text-xl font-semibold text-red-600">
                  Failed to load dashboard
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Please try refreshing the page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  // -----------------------------
  // UI
  // -----------------------------

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">
              Property Management
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Landlord Dashboard
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your properties and rental requests.
            </p>
          </div>

          <Link href="/dashboard/landlord/properties">
            <Button className="gap-2">
              <Building2 className="h-4 w-4" />
              My Properties
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total */}
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
                <Users className="h-6 w-6 text-blue-600" />
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

          {/* Rejected */}
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Rejected
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {rejectedRequests}
                </p>
              </div>

              <div className="rounded-full bg-red-100 p-3">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rental Requests */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Incoming Rental Requests</CardTitle>
          </CardHeader>

          <CardContent>
            {rentalRequests.length === 0 ? (
              <div className="py-10 text-center">
                <Building2 className="mx-auto h-10 w-10 text-gray-400" />

                <p className="mt-3 font-medium">
                  No rental requests
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Incoming rental requests will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {rentalRequests.map((request) => {
                  const isProcessing =
                    processingId === request.id;

                  return (
                    <div
                      key={request.id}
                      className="rounded-xl border bg-white p-5"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        {/* Request details */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              {request.property.title}
                            </h3>

                            <Badge
                              variant={getStatusVariant(
                                request.status
                              )}
                            >
                              {request.status}
                            </Badge>
                          </div>

                          {/* Property */}
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin className="h-4 w-4" />

                              <span>
                                {request.property.location}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <CalendarDays className="h-4 w-4" />

                              <span>
                                Move-in:{" "}
                                {formatDate(request.moveInDate)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Building2 className="h-4 w-4" />

                              <span>
                                {request.property.category.name}
                              </span>
                            </div>
                          </div>

                          {/* Tenant */}
                          <div className="mt-4 rounded-lg bg-gray-50 p-4">
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                              Tenant
                            </p>

                            <p className="mt-1 font-semibold">
                              {request.tenant.name}
                            </p>

                            <p className="text-sm text-gray-500">
                              {request.tenant.email}
                            </p>
                          </div>
                        </div>

                        {/* Price + actions */}
                        <div className="flex flex-col gap-4 lg:min-w-52 lg:items-end">
                          <div>
                            <p className="text-sm text-gray-500">
                              Monthly Rent
                            </p>

                            <p className="text-xl font-bold">
                              {formatCurrency(
                                request.property.price
                              )}
                            </p>
                          </div>

                          {request.status === "PENDING" && (
                            <div className="flex w-full gap-2 lg:w-auto">
                              <Button
                                onClick={() =>
                                  handleStatusUpdate(
                                    request.id,
                                    "APPROVED"
                                  )
                                }
                                disabled={isProcessing}
                                className="flex-1 gap-2 lg:flex-none"
                              >
                                <CheckCircle2 className="h-4 w-4" />

                                {isProcessing
                                  ? "Processing..."
                                  : "Approve"}
                              </Button>

                              <Button
                                variant="destructive"
                                onClick={() =>
                                  handleStatusUpdate(
                                    request.id,
                                    "REJECTED"
                                  )
                                }
                                disabled={isProcessing}
                                className="flex-1 gap-2 lg:flex-none"
                              >
                                <XCircle className="h-4 w-4" />

                                Reject
                              </Button>
                            </div>
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
      </div>
    </main>
  );
}