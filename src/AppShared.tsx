import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import PageLoader from "@/components/PageLoader";

const Index = lazy(() => import("@/pages/Index"));
const VAMasterclass = lazy(() => import("@/pages/VAMasterclass"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const ThankYou = lazy(() => import("@/pages/ThankYou"));
const ReferralProgress = lazy(() => import("@/pages/ReferralProgress"));
const OdosaEgharevba = lazy(() => import("@/pages/OdosaEgharevba"));
const Affiliate = lazy(() => import("@/pages/Affiliate"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout"));
const LoginPage = lazy(() => import("@/pages/login"));
const AdminRoute = lazy(() => import("@/pages/admin/AdminRoute"));
const AdminLayout = lazy(() => import("@/pages/admin/layout"));
const AdminAffiliatesPage = lazy(() => import("@/pages/admin/affiliates/index"));
const AffiliateProfilePage = lazy(() => import("@/pages/admin/affiliates/[id]"));

export function createQueryClient() {
  return new QueryClient();
}

export function AppRoutesTree() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/va-masterclass" element={<VAMasterclass />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/referral-progress" element={<ReferralProgress />} />
        <Route path="/odosa-egharevba" element={<OdosaEgharevba />} />
        <Route path="/affiliate" element={<Affiliate />} />

        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route path="affiliates" element={<AdminAffiliatesPage />} />
            <Route path="affiliates/:id" element={<AffiliateProfilePage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export function AppProviders({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
