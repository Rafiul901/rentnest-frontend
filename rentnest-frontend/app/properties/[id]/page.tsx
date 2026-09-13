"use client";

import Link from "next/link";

import { useParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useProperty } from "@/hooks/useProperty";

export default function PropertyDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const { data, isLoading, isError } = useProperty(id);

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

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Back */}
      <Link
        href="/properties"
        className="text-sm font-medium text-gray-500 hover:text-gray-900"
      >
        ← Back to properties
      </Link>

      {/* Header */}
      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{property.category.name}</Badge>

          <Badge
            variant={property.available ? "default" : "destructive"}
          >
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

      {/* Main content */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_350px]">
        {/* Left */}
        <div className="space-y-8">
          {/* Description */}
          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              About this property
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              {property.description}
            </p>
          </section>

          {/* Amenities */}
          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Amenities
            </h2>

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

          {/* Landlord */}
          <section className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Landlord
            </h2>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 font-semibold">
                {property.landlord.name
                  .charAt(0)
                  .toUpperCase()}
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

        {/* Right - Price / CTA */}
        <aside className="h-fit rounded-xl border bg-white p-6 shadow-sm lg:sticky lg:top-6">
          <p className="text-sm text-gray-500">
            Monthly rent
          </p>

          <p className="mt-1 text-3xl font-bold text-gray-900">
            ৳{property.price.toLocaleString()}
            <span className="text-sm font-normal text-gray-500">
              {" "}
              /month
            </span>
          </p>

          <div className="my-6 border-t" />

          {property.available ? (
            <Button className="w-full" size="lg">
              Request to Rent
            </Button>
          ) : (
            <Button
              className="w-full"
              size="lg"
              disabled
            >
              Currently Unavailable
            </Button>
          )}

          <p className="mt-3 text-center text-xs text-gray-500">
            You can request this property from the landlord.
          </p>
        </aside>
      </div>
    </main>
  );
}