"use client";

import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
// import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
  children: ReactNode;
}
// const queryClient = new QueryClient();

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      {children}
      {/* <QueryClientProvider client={queryClient}></QueryClientProvider> */}
    </SessionProvider>
  );
}
