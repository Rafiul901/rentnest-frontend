"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  registerSchema,
  RegisterFormData,
} from "@/services/auth/auth.schema";

import { registerUser } from "@/services/auth/auth.api";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "TENANT",
    },
  });

const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data;

      await registerUser(registerData);

      toast.success("Registration successful!");

      router.push("/auth/login");
    } catch (error: unknown) {
      // Type assertion / checking for Axios or generic HTTP errors
      let errorMessage = "Registration failed";

      if (error && typeof error === "object" && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        errorMessage = err.response?.data?.message || errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-6 text-gray-500">
          Join RentNest today
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium">
              Name
            </label>

            <input
              {...register("name")}
              className="w-full rounded-md border px-3 py-2"
              placeholder="Your name"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              {...register("email")}
              type="email"
              className="w-full rounded-md border px-3 py-2"
              placeholder="you@example.com"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              className="w-full rounded-md border px-3 py-2"
              placeholder="••••••••"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              {...register("confirmPassword")}
              type="password"
              className="w-full rounded-md border px-3 py-2"
              placeholder="••••••••"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Account Type
            </label>

            <select
              {...register("role")}
              className="w-full rounded-md border px-3 py-2"
            >
              <option value="TENANT">Tenant</option>
              <option value="LANDLORD">Landlord</option>
            </select>

            {errors.role && (
              <p className="mt-1 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-black py-2.5 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="font-medium text-black hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </main>
  );
}