import { Property } from "@/types/property";
import PropertyCard from "./PropertyCard";

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({
  properties,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-xl font-semibold">
          No properties found
        </h3>

        <p className="mt-2 text-gray-500">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}