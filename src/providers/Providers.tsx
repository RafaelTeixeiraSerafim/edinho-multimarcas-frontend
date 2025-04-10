"use client";

import { ReactNode } from "react";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import SidebarProvider from "./SidebarProvider";
import { ThemeProvider } from "@mui/material";
import theme from "@/styles/muiTheme";

interface Props {
  children: ReactNode;
}
const queryClient = new QueryClient();

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
