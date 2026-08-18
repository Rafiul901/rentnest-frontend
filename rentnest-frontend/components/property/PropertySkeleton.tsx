import { Skeleton } from "@/components/ui/skeleton";

export default function PropertySkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <Skeleton className="h-52 w-full" />

      <div className="space-y-4 p-5">
        <Skeleton className="h-6 w-3/4" />

        <Skeleton className="h-4 w-1/2" />

        <Skeleton className="h-16 w-full" />

        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>

        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}