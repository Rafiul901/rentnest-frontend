"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import PropertyGrid from "@/components/property/PropertyGrid";
import PropertySkeleton from "@/components/property/PropertySkeleton";
import { useProperties } from "@/hooks/useProperties";

export default function HomePage() {
  const {
    data,
    isLoading,
    isError,
  } = useProperties();

  const properties = data?.data ?? [];

  return (
    <main>
      {/* Hero */}
      <section className="bg-gray-950 px-4 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 font-medium text-gray-400">
              FIND YOUR NEXT HOME
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Find a place you'll
              <span className="block text-gray-400">
                love to call home.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-gray-300">
              Discover rental properties that match your
              lifestyle, budget, and location.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/properties">
                <Button size="lg">
                  Browse Properties
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 bg-transparent text-white hover:bg-white hover:text-black"
                >
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
              Explore
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Featured Properties
            </h2>

            <p className="mt-2 text-gray-500">
              Find your perfect rental from our latest
              listings.
            </p>
          </div>

          <Link
            href="/properties"
            className="hidden text-sm font-medium hover:underline sm:block"
          >
            View all →
          </Link>
        </div>

        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map(
              (_, index) => (
                <PropertySkeleton key={index} />
              )
            )}
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <h3 className="font-semibold text-red-700">
              Failed to load properties
            </h3>

            <p className="mt-2 text-sm text-red-600">
              Please try again later.
            </p>
          </div>
        )}

        {!isLoading && !isError && (
          <PropertyGrid
            properties={properties.slice(0, 3)}
          />
        )}
      </section>
    </main>
  );
}