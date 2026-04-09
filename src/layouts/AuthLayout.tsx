import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

/**
 * Wraps routes that need Supabase auth so marketing pages do not load session work.
 */
export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
