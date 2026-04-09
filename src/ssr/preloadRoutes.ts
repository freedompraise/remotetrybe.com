/**
 * Dynamic imports for every lazy route module. Used by SSG so Suspense resolves
 * during renderToPipeableStream. Keep in sync with lazy() factories in AppShared.tsx.
 */
export function preloadAppRouteModules() {
  return Promise.all([
    import("@/pages/Index"),
    import("@/pages/VAMasterclass"),
    import("@/pages/NotFound"),
    import("@/pages/ThankYou"),
    import("@/pages/ReferralProgress"),
    import("@/pages/OdosaEgharevba"),
    import("@/pages/Affiliate"),
    import("@/layouts/AuthLayout"),
    import("@/pages/login"),
    import("@/pages/admin/AdminRoute"),
    import("@/pages/admin/layout"),
    import("@/pages/admin/affiliates/index"),
    import("@/pages/admin/affiliates/[id]"),
  ]);
}
