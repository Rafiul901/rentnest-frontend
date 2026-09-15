import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center p-8 text-center">
          <XCircle className="h-16 w-16 text-red-500" />

          <h1 className="mt-5 text-2xl font-bold">
            Payment Cancelled
          </h1>

          <p className="mt-3 text-gray-500">
            Your payment was cancelled. No charge was made. You can try again
            from your dashboard.
          </p>

          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/tenant" className="w-full">
              <Button className="w-full">Return to Dashboard</Button>
            </Link>

            <Link href="/properties" className="w-full">
              <Button variant="outline" className="w-full">
                Browse Properties
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}