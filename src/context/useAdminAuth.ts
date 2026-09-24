import { useContext } from "react";
import {
  AdminAuthContext,
  type AdminAuthState,
} from "./adminAuthContext";

export function useAdminAuth(): AdminAuthState {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error(
      "useAdminAuth must be used within an AdminAuthProvider"
    );
  }

  return context;
}