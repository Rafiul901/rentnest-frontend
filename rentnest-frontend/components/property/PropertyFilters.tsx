"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertyFiltersProps {
  location: string;
  minPrice: string;
  maxPrice: string;
  onLocationChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onClear: () => void;
}

export default function PropertyFilters({
  location,
  minPrice,
  maxPrice,
  onLocationChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClear,
}: PropertyFiltersProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Find your property
        </h2>

        <p className="text-sm text-gray-500">
          Search by location and price.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="mb-2 block text-sm font-medium"
          >
            Location
          </label>

          <Input
            id="location"
            placeholder="e.g. Gulshan"
            value={location}
            onChange={(e) =>
              onLocationChange(e.target.value)
            }
          />
        </div>

        {/* Minimum price */}
        <div>
          <label
            htmlFor="minPrice"
            className="mb-2 block text-sm font-medium"
          >
            Minimum price
          </label>

          <Input
            id="minPrice"
            type="number"
            placeholder="20000"
            value={minPrice}
            onChange={(e) =>
              onMinPriceChange(e.target.value)
            }
          />
        </div>

        {/* Maximum price */}
        <div>
          <label
            htmlFor="maxPrice"
            className="mb-2 block text-sm font-medium"
          >
            Maximum price
          </label>

          <Input
            id="maxPrice"
            type="number"
            placeholder="50000"
            value={maxPrice}
            onChange={(e) =>
              onMaxPriceChange(e.target.value)
            }
          />
        </div>

        {/* Clear */}
        <div className="flex items-end">
          <Button
            variant="outline"
            className="w-full"
            onClick={onClear}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}