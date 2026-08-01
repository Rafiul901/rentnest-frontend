
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create a client instance per request scope in Next.js App Router
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Devtools must be INSIDE the provider */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}