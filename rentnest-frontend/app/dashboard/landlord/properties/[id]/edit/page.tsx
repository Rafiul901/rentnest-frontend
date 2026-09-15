"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import {
  propertySchema,
  PropertyFormValues,
} from "@/lib/validations/property.schema";

import { useProperty } from "@/hooks/useProperty";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";

import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "cmrkla5940000pkdpaszjbqf0",
    name: "Apartment",
  },
  {
    id: "cmrg1d6hk0000f8dpisc05csg",
    name: "Condo",
  },
];

const amenitiesList = [
  "Wifi",
  "Parking",
  "Lift",
  "Security",
  "Air Conditioning",
];

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();

  const propertyId = params.id as string;

  const { data, isLoading, isError } = useProperty(propertyId);

  const updatePropertyMutation = useUpdateProperty();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      location: "",
      amenities: [],
      available: false,
      categoryId: "",
    },
  });

  const selectedAmenities = watch("amenities");

  // Prefill form when property data arrives
  useEffect(() => {
    if (!data?.data) return;

    const property = data.data;

    reset({
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      amenities: property.amenities,
      available: property.available,
      categoryId: property.categoryId,
    });
  }, [data, reset]);

  const handleAmenityChange = (amenity: string) => {
    const currentAmenities = selectedAmenities || [];

    if (currentAmenities.includes(amenity)) {
      setValue(
        "amenities",
        currentAmenities.filter((item) => item !== amenity),
        { shouldValidate: true }
      );
    } else {
      setValue(
        "amenities",
        [...currentAmenities, amenity],
        { shouldValidate: true }
      );
    }
  };

  const onSubmit = (formData: PropertyFormValues) => {
    updatePropertyMutation.mutate(
      {
        propertyId,
        data: {
          title: formData.title,
          description: formData.description,
          price: formData.price,
          location: formData.location,
          amenities: formData.amenities,
          available: formData.available,
          categoryId: formData.categoryId,
        },
      },
      {
        onSuccess: (response) => {
          toast.success(
            response.message || "Property updated successfully"
          );

          router.push("/dashboard/landlord/properties");
        },

        onError: () => {
          toast.error("Failed to update property");
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-muted-foreground">
          Loading property...
        </p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-red-500">
          Failed to load property.
        </p>

        <Button
          className="mt-4"
          onClick={() =>
            router.push("/dashboard/landlord/properties")
          }
        >
          Back to My Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Property
        </h1>

        <p className="mt-2 text-muted-foreground">
          Update your property information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Property Title
          </label>

          <input
            {...register("title")}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Enter property title"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Description
          </label>

          <textarea
            {...register("description")}
            rows={5}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Describe your property"
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Monthly Rent
          </label>

          <input
            type="number"
            {...register("price", {
              valueAsNumber: true,
            })}
            className="w-full rounded-md border px-3 py-2"
            placeholder="35000"
          />

          {errors.price && (
            <p className="mt-1 text-sm text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Location
          </label>

          <input
            {...register("location")}
            className="w-full rounded-md border px-3 py-2"
            placeholder="Banani, Dhaka"
          />

          {errors.location && (
            <p className="mt-1 text-sm text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Property Type
          </label>

          <select
            {...register("categoryId")}
            className="w-full rounded-md border px-3 py-2"
          >
            <option value="">Select property type</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          {errors.categoryId && (
            <p className="mt-1 text-sm text-red-500">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {/* Amenities */}
        <div>
          <label className="mb-3 block text-sm font-medium">
            Amenities
          </label>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {amenitiesList.map((amenity) => (
              <label
                key={amenity}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={selectedAmenities?.includes(amenity)}
                  onChange={() =>
                    handleAmenityChange(amenity)
                  }
                />

                <span>{amenity}</span>
              </label>
            ))}
          </div>

          {errors.amenities && (
            <p className="mt-1 text-sm text-red-500">
              {errors.amenities.message}
            </p>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("available")}
          />

          <label className="text-sm font-medium">
            Property is currently available
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              router.push("/dashboard/landlord/properties")
            }
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={updatePropertyMutation.isPending}
          >
            {updatePropertyMutation.isPending
              ? "Updating..."
              : "Update Property"}
          </Button>
        </div>
      </form>
    </div>
  );
}