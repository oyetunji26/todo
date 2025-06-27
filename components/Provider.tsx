"use client";

import { SessionProvider } from "next-auth/react";
import { SessionHydrator } from "./SessionHydrator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Provider = ({ children, session }: any) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <SessionHydrator />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Provider;
