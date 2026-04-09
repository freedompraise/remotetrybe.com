import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import {
  AppProviders,
  AppRoutesTree,
  createQueryClient,
} from "@/AppShared";

let browserQueryClient: QueryClient | undefined;

function getOrCreateBrowserQueryClient() {
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
}

export default function AppClient() {
  const queryClient = useMemo(() => getOrCreateBrowserQueryClient(), []);
  return (
    <AppProviders queryClient={queryClient}>
      <BrowserRouter>
        <AppRoutesTree />
      </BrowserRouter>
    </AppProviders>
  );
}
