"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  loginSchema,
  LoginFormData,
} from "@/services/auth/auth.schema";

import { loginUser } from "@/services/auth/auth.api";
import { saveAuth } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);

      console.log("Login response:", response);

      const token =
        response?.data?.token || response?.token;

      const user =
        response?.data?.user || response?.user;

      if (!token || !user) {
        toast.error("Invalid login response");
        return;
      }

      saveAuth(token, user);

      toast.success("Login successful!");

      if (user.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (user.role === "LANDLORD") {
        router.push("/dashboard/landlord");
      } else {
        router.push("/dashboard/tenant");
      }
    } catch (error: unknown) {
      let errorMessage = "Login failed";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
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
          Welcome Back
        </h1>

        <p className="mb-6 text-gray-500">
          Login to your RentNest account
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-black py-2.5 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => router.push("/auth/register")}
            className="font-medium text-black hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </main>
  );
}