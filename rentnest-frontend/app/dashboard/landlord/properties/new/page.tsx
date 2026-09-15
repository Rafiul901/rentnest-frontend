"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ImagePlus,
  X,
} from "lucide-react";

import { useCreateProperty } from "@/hooks/useCreateProperty";
import {
  propertySchema,
  PropertyFormValues,
} from "@/lib/validations/property.schema";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

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

const availableAmenities = [
  "Wifi",
  "Parking",
  "Lift",
  "Security",
  "Air Conditioning",
];

export default function CreatePropertyPage() {
  const router = useRouter();

  const createPropertyMutation = useCreateProperty();

  const [selectedImage, setSelectedImage] = useState<File | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),

    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      location: "",
      amenities: [],
      available: true,
      categoryId: "",
    },
  });

  const selectedAmenities = watch("amenities");
  const available = watch("available");

  // -----------------------------------
  // Amenity handling
  // -----------------------------------

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = selectedAmenities || [];

    if (currentAmenities.includes(amenity)) {
      setValue(
        "amenities",
        currentAmenities.filter((item) => item !== amenity),
        {
          shouldValidate: true,
        }
      );
    } else {
      setValue(
        "amenities",
        [...currentAmenities, amenity],
        {
          shouldValidate: true,
        }
      );
    }
  };

  // -----------------------------------
  // Image handling
  // -----------------------------------

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  // -----------------------------------
  // Submit
  // -----------------------------------

  const onSubmit = (data: PropertyFormValues) => {
    createPropertyMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success(response.message);

        router.push("/dashboard/landlord/properties");
      },

      onError: () => {
        toast.error(
          "Failed to create property. Please try again."
        );
      },
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Back */}
        <Button
          variant="ghost"
          className="mb-4 gap-2 px-0 hover:bg-transparent"
          onClick={() =>
            router.push("/dashboard/landlord/properties")
          }
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Properties
        </Button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">
            Property Management
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Add Property
          </h1>

          <p className="mt-2 text-gray-500">
            Add a new property to your rental listings.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Property Title
                </Label>

                <Input
                  id="title"
                  placeholder="e.g. Modern Apartment in Gulshan"
                  {...register("title")}
                />

                {errors.title && (
                  <p className="text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description
                </Label>

                <Textarea
                  id="description"
                  placeholder="Describe your property..."
                  rows={5}
                  {...register("description")}
                />

                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  Monthly Rent (BDT)
                </Label>

                <Input
                  id="price"
                  type="number"
                  min="1"
                  placeholder="35000"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />

                {errors.price && (
                  <p className="text-sm text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location
                </Label>

                <Input
                  id="location"
                  placeholder="Gulshan, Dhaka"
                  {...register("location")}
                />

                {errors.location && (
                  <p className="text-sm text-red-500">
                    {errors.location.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="categoryId">
                  Property Type
                </Label>

                <select
                  id="categoryId"
                  {...register("categoryId")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">
                    Select property type
                  </option>

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
                  <p className="text-sm text-red-500">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <Label>Amenities</Label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {availableAmenities.map((amenity) => {
                    const isSelected =
                      selectedAmenities?.includes(amenity);

                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 rounded-lg border p-3"
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() =>
                            toggleAmenity(amenity)
                          }
                        />

                        <span className="text-sm">
                          {amenity}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {errors.amenities && (
                  <p className="text-sm text-red-500">
                    {errors.amenities.message}
                  </p>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Checkbox
                  checked={available}
                  onCheckedChange={(checked) =>
                    setValue(
                      "available",
                      checked === true
                    )
                  }
                />

                <div>
                  <Label>Available for rent</Label>

                  <p className="text-xs text-gray-500">
                    Tenants can request this property when
                    available.
                  </p>
                </div>
              </div>

              {/* Image Upload UI */}
              <div className="space-y-3">
                <Label>Property Image</Label>

                <div className="rounded-lg border-2 border-dashed p-6 text-center">
                  <ImagePlus className="mx-auto h-10 w-10 text-gray-400" />

                  <p className="mt-3 text-sm font-medium">
                    Upload property image
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Image upload is currently for UI only.
                  </p>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mx-auto mt-4 max-w-sm cursor-pointer"
                  />

                  {selectedImage && (
                    <div className="mx-auto mt-4 flex max-w-sm items-center justify-between rounded-lg bg-gray-50 p-3 text-left">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {selectedImage.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {(selectedImage.size / 1024).toFixed(
                            1
                          )}{" "}
                          KB
                        </p>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    router.push(
                      "/dashboard/landlord/properties"
                    )
                  }
                  disabled={createPropertyMutation.isPending}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={createPropertyMutation.isPending}
                >
                  {createPropertyMutation.isPending
                    ? "Creating..."
                    : "Create Property"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
}