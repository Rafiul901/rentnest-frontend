"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useProperty } from "@/hooks/useProperty";
import { useCreateRental } from "@/hooks/useCreateRentals";

import {
  rentalSchema,
  RentalFormValues,
} from "@/lib/validations/rental.schema";

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data, isLoading, isError } = useProperty(id);

  const [showRequestForm, setShowRequestForm] = useState(false);

  const createRental = useCreateRental();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RentalFormValues>({
    resolver: zodResolver(rentalSchema),
    defaultValues: {
      moveInDate: "",
      message: "",
    },
  });

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-10 w-2/3 rounded bg-gray-200" />
          <div className="h-5 w-1/3 rounded bg-gray-200" />
          <div className="h-40 rounded-xl bg-gray-200" />
        </div>
      </main>
    );
  }

  /* ---------------- Error ---------------- */
  if (isError || !data?.data) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700">
            Something went wrong
          </h2>
          <p className="mt-2 text-sm text-red-600">
            We could not load this property.
          </p>
          <Link href="/properties">
            <Button className="mt-4">Back to Properties</Button>
          </Link>
        </div>
      </main>
    );
  }

  const property = data.data;

  /* ---------------- Submit ---------------- */
  const onSubmit = (values: RentalFormValues) => {
    createRental.mutate(
      {
        propertyId: property.id,
        moveInDate: values.moveInDate
          ? new Date(values.moveInDate).toISOString()
          : undefined,
        message: values.message?.trim() || undefined,
      },
      {
        onSuccess: (response) => {
          toast.success(
            response.message || "Rental request sent successfully!"
          );
          reset();
          setShowRequestForm(false);
        },
        onError: (error: unknown) => {
          console.error("Rental request failed:", error);

          let status: number | undefined;
          let backendMessage: string | undefined;

          if (axios.isAxiosError(error)) {
            status = error.response?.status;
            backendMessage = error.response?.data?.message;
          } else if (error instanceof Error) {
            backendMessage = error.message;
          }

          if (status === 409) {
            toast.error(
              backendMessage ??
                "You've already requested this property."
            );
          } else if (status === 401) {
            toast.error("Please log in again.");
          } else if (status === 403) {
            toast.error("Only tenants can request a property.");
          } else if (status === 400) {
            toast.error(
              backendMessage ?? "Please check the form and try again."
            );
          } else {
            toast.error(
              backendMessage ?? "Failed to send rental request."
            );
          }
        },
      }
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <Link
        href="/properties"
        className="text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        ← Back to properties
      </Link>

      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{property.category.name}</Badge>
          <Badge variant={property.available ? "default" : "destructive"}>
            {property.available ? "Available" : "Not Available"}
          </Badge>
        </div>

        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
          {property.title}
        </h1>

        <p className="mt-2 text-lg text-gray-500">
          📍 {property.location}
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_350px]">
        <div className="space-y-8">
          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">About this property</h2>
            <p className="mt-4 leading-7 text-gray-600">
              {property.description}
            </p>
          </section>

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Amenities</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {property.amenities.map((amenity) => (
                <Badge
                  key={amenity}
                  variant="outline"
                  className="px-3 py-1.5"
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </section>

          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Landlord</h2>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 font-semibold">
                {property.landlord.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {property.landlord.name}
                </p>
                <p className="text-sm text-gray-500">
                  {property.landlord.email}
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-xl border bg-white p-6 shadow-sm lg:sticky lg:top-6">
          <p className="text-sm text-gray-500">Monthly rent</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            ৳{property.price.toLocaleString()}
            <span className="text-sm font-normal text-gray-500">
              {" "}/month
            </span>
          </p>

          <div className="my-6 border-t" />

          {property.available ? (
            <Button
              className="w-full"
              size="lg"
              onClick={() => setShowRequestForm(true)}
            >
              Request to Rent
            </Button>
          ) : (
            <Button className="w-full" size="lg" disabled>
              Currently Unavailable
            </Button>
          )}

          <p className="mt-3 text-center text-xs text-gray-500">
            You can request this property from the landlord.
          </p>
        </aside>
      </div>

      {showRequestForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Request to Rent</h2>

              <button
                type="button"
                onClick={() => {
                  reset();
                  setShowRequestForm(false);
                }}
                className="text-xl text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              You are requesting to rent:
            </p>
            <p className="mt-1 font-medium">{property.title}</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-4"
            >
              <div>
                <label
                  htmlFor="moveInDate"
                  className="text-sm font-medium"
                >
                  Move-in date{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>

                <input
                  id="moveInDate"
                  type="date"
                  {...register("moveInDate")}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                />

                {errors.moveInDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.moveInDate.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-sm font-medium"
                >
                  Message{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>

                <textarea
                  id="message"
                  rows={4}
                  placeholder="Write a message to the landlord..."
                  {...register("message")}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                />

                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={createRental.isPending}
              >
                {createRental.isPending
                  ? "Sending..."
                  : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}