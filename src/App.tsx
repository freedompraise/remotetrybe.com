import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VAMasterclass from "./pages/VAMasterclass";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import ReferralProgress from "./pages/ReferralProgress";
import OdosaEgharevba from "./pages/OdosaEgharevba";
import Affiliate from "./pages/Affiliate";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./pages/admin/AdminRoute";
import AdminLayout from "./pages/admin/layout";
import AdminAffiliatesPage from "./pages/admin/affiliates/index";
import AffiliateProfilePage from "./pages/admin/affiliates/[id]";
import LoginPage from "./pages/login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/va-masterclass" element={<VAMasterclass />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/referral-progress" element={<ReferralProgress />} />
            <Route path="/founder" element={<OdosaEgharevba />} />
            <Route path="/affiliate" element={<Affiliate />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }>
              <Route path="affiliates" element={<AdminAffiliatesPage />} />
              <Route path="affiliates/:id" element={<AffiliateProfilePage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
