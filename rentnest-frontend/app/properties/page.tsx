"use client";

import { useState } from "react";

import PropertyFilters from "@/components/property/PropertyFilters";
import PropertyGrid from "@/components/property/PropertyGrid";
import PropertySkeleton from "@/components/property/PropertySkeleton";

import { useProperties } from "@/hooks/useProperties";

export default function PropertiesPage() {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { data, isLoading, isError } = useProperties({
    location: location || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  const properties = data?.data ?? [];

  const clearFilters = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Explore RentNest
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Find your next home
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Browse rental properties and find a place that fits your lifestyle
            and budget.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Filters */}
        <PropertyFilters
          location={location}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onLocationChange={setLocation}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onClear={clearFilters}
        />

        {/* Results header */}
        <div className="my-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Available Properties</h2>

            {!isLoading && data?.meta && (
              <p className="mt-1 text-sm text-gray-500">
                {data.meta.total} properties found
              </p>
            )}
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <h3 className="text-lg font-semibold text-red-700">
              Something went wrong
            </h3>

            <p className="mt-2 text-sm text-red-600">
              We could not load the properties. Please try again.
            </p>
          </div>
        )}

        {/* Results */}
        {!isLoading && !isError && (
          <PropertyGrid properties={properties} />
        )}
      </div>
    </main>
  );
}