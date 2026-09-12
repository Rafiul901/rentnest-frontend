import Link from "next/link";

import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    title,
    description,
    price,
    location,
    amenities,
    available,
    landlord,
    category,
    createdAt,
  } = property;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      {/* Top strip — category + status + posted date */}
      <div className="flex items-center justify-between gap-3 border-b bg-gray-50 px-5 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${
              available ? "bg-emerald-500" : "bg-red-500"
            }`}
            aria-hidden
          />
          <span className="truncate text-xs font-medium uppercase tracking-wider text-gray-600">
            {category.name}
          </span>
        </div>

        <span className="shrink-0 text-xs text-gray-400">
          {formatRelative(createdAt)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Title + location */}
        <div className="mb-3">
          <h3 className="line-clamp-2 text-xl font-semibold tracking-tight text-gray-900">
            {title}
          </h3>

          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
            <PinIcon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
            <span className="truncate">{location}</span>
          </p>
        </div>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {amenities.slice(0, 3).map((amenity) => (
              <Badge
                key={amenity}
                variant="outline"
                className="font-normal"
              >
                {amenity}
              </Badge>
            ))}

            {amenities.length > 3 && (
              <Badge
                variant="outline"
                className="font-normal text-gray-500"
              >
                +{amenities.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Landlord row */}
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-semibold uppercase text-gray-700"
            aria-hidden
          >
            {landlord.name.charAt(0).toUpperCase()}
          </span>

          <span className="truncate">
            Listed by{" "}
            <span className="font-medium text-gray-700">
              {landlord.name}
            </span>
          </span>
        </div>

        {/* Price + CTA pinned to bottom */}
        <div className="mt-auto flex items-end justify-between border-t pt-4">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
              Monthly rent
            </div>
            <div className="text-2xl font-bold tracking-tight text-gray-900">
              ৳{price.toLocaleString()}
              <span className="ml-1 text-sm font-normal text-gray-500">
                /month
              </span>
            </div>
          </div>

          <Link href={`/properties/${id}`}>
            <Button className="transition group-hover:bg-gray-900 group-hover:text-white">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Inline icon                                                         */
/* ------------------------------------------------------------------ */

function PinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Relative time helper                                                */
/* ------------------------------------------------------------------ */

function formatRelative(input: string): string {
  const diffMs = Date.now() - new Date(input).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}