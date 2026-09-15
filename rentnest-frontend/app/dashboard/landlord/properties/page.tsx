"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Building2,
  CalendarDays,
  MapPin,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "@/components/providers/AuthProvider";
import { useLandlordProperties } from "@/hooks/useLandlordProperties";
import { useDeleteProperty } from "@/hooks/useDeleteProperty";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";
import { confirmDelete } from "@/lib/confirm";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandlordPropertiesPage() {
  const { user } = useAuth();

  const { data, isLoading, isError } = useLandlordProperties();
  const deletePropertyMutation = useDeleteProperty();
  const updatePropertyMutation = useUpdateProperty();

  const [updatingPropertyId, setUpdatingPropertyId] = useState<string | null>(
    null
  );

  const allProperties = data?.data ?? [];

  const myProperties = allProperties.filter(
    (property) => property.landlordId === user?.id
  );

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleDelete = async (propertyId: string, title: string) => {
    const confirmed = await confirmDelete(title);
    if (!confirmed) return;

    deletePropertyMutation.mutate(propertyId, {
      onSuccess: (response) => {
        toast.success(response.message || "Property deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete property");
      },
    });
  };

  const handleAvailabilityToggle = (property: (typeof allProperties)[number]) => {
    setUpdatingPropertyId(property.id);

    updatePropertyMutation.mutate(
      {
        propertyId: property.id,
        data: {
          title: property.title,
          description: property.description,
          price: property.price,
          location: property.location,
          amenities: property.amenities,
          available: !property.available,
          categoryId: property.categoryId,
        },
      },
      {
        onSuccess: () => {
          toast.success(
            `Property marked as ${!property.available ? "available" : "unavailable"}`
          );
          setUpdatingPropertyId(null);
        },
        onError: () => {
          toast.error("Failed to update availability");
          setUpdatingPropertyId(null);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <Card>
            <CardContent className="flex min-h-48 items-center justify-center">
              <div className="text-center">
                <Building2 className="mx-auto h-10 w-10 text-red-500" />
                <h2 className="mt-3 text-xl font-semibold">
                  Failed to load properties
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
              My Properties
            </h1>
            <p className="mt-2 text-gray-500">
              Manage your rental properties.
            </p>
          </div>

          <Link href="/dashboard/landlord/properties/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Property
            </Button>
          </Link>
        </div>

        {/* Property count */}
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            {myProperties.length}{" "}
            {myProperties.length === 1 ? "property" : "properties"}
          </p>
        </div>

        {myProperties.length === 0 ? (
          <Card className="mt-6">
            <CardContent className="flex min-h-72 items-center justify-center">
              <div className="text-center">
                <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                <h2 className="mt-4 text-xl font-semibold">No properties yet</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Add your first property to start receiving rental requests.
                </p>
                <Link href="/dashboard/landlord/properties/new">
                  <Button className="mt-5 gap-2">
                    <Plus className="h-4 w-4" />
                    Add Property
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myProperties.map((property) => {
              const isDeleting =
                deletePropertyMutation.isPending &&
                deletePropertyMutation.variables === property.id;

              const isToggling = updatingPropertyId === property.id;

              return (
                <Card key={property.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <CardTitle className="line-clamp-2">
                          {property.title}
                        </CardTitle>
                        <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>
                      </div>
                      <Badge variant={property.available ? "default" : "secondary"}>
                        {property.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className="line-clamp-2 text-sm text-gray-500">
                      {property.description}
                    </p>

                    <div className="mt-4">
                      <Badge variant="outline">{property.category.name}</Badge>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {property.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-5">
                      <p className="text-xs text-gray-500">Monthly Rent</p>
                      <p className="text-xl font-bold">
                        {formatCurrency(property.price)}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <CalendarDays className="h-4 w-4" />
                      <span>Added {formatDate(property.createdAt)}</span>
                    </div>

                    {/* Availability toggle */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-5 w-full gap-2"
                      disabled={isToggling}
                      onClick={() => handleAvailabilityToggle(property)}
                    >
                      {isToggling
                        ? "Updating..."
                        : property.available
                          ? "Mark as Unavailable"
                          : "Mark as Available"}
                    </Button>

                    {/* Edit + Delete */}
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Link
                        href={`/dashboard/landlord/properties/${property.id}/edit`}
                      >
                        <Button variant="outline" className="w-full gap-2">
                          <Pencil className="h-4 w-4" />
                          Edit
                        </Button>
                      </Link>

                      <Button
                        variant="destructive"
                        className="w-full gap-2"
                        disabled={isDeleting}
                        onClick={() => handleDelete(property.id, property.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                        {isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}