import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAdminAuth } from "../../context/useAdminAuth";

export function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const { username, loading } = useAdminAuth();

  if (loading) {
    return null;
  }

  if (!username) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export function PublicAdminRoute({ children }: { children: ReactNode }) {
  const { username, loading } = useAdminAuth();

  if (loading) {
    return null;
  }

  if (username) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}