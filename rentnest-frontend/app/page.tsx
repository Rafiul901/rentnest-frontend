"use client";

import { useProperties } from "@/hooks/useProperties";

export default function HomePage() {
  const { data, isLoading, error } = useProperties();

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>Something went wrong</h1>;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-5">RentNest</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}