"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  const getDashboardPath = () => {
    if (!user) return "/";

    if (user.role === "ADMIN") {
      return "/dashboard/admin";
    }

    if (user.role === "LANDLORD") {
      return "/dashboard/landlord";
    }

    return "/dashboard/tenant";
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          RentNest
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm hover:text-gray-600"
          >
            Home
          </Link>

          <Link
            href="/properties"
            className="text-sm hover:text-gray-600"
          >
            Properties
          </Link>

          {!isLoading && !user && (
            <>
              <Link href="/auth/login">
                <Button variant="outline">
                  Login
                </Button>
              </Link>

              <Link href="/auth/register">
                <Button>
                  Register
                </Button>
              </Link>
            </>
          )}

          {!isLoading && user && (
            <>
              <Link href={getDashboardPath()}>
                <Button variant="outline">
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="destructive"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}