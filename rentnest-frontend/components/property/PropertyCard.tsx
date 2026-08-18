import Link from "next/link";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Image placeholder */}
      <div className="flex h-52 items-center justify-center bg-gray-100">
        <span className="text-gray-400">
          Property Image
        </span>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold">
              {property.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {property.location}
            </p>
          </div>

          <Badge
            variant={
              property.available
                ? "default"
                : "destructive"
            }
          >
            {property.available
              ? "Available"
              : "Unavailable"}
          </Badge>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {property.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {property.amenities
            .slice(0, 3)
            .map((amenity) => (
              <Badge
                key={amenity}
                variant="outline"
              >
                {amenity}
              </Badge>
            ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold">
              ৳{property.price.toLocaleString()}
            </span>

            <span className="text-sm text-gray-500">
              /month
            </span>
          </div>

          <Link href={`/properties/${property.id}`}>
            <Button>
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}