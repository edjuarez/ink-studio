import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  AdminAuthContext,
  type AdminAuthState,
} from "./adminAuthContext";
import {
  adminGetMe,
  adminLogin,
  adminLogout,
  isUnauthorizedError,
} from "../services/admin";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const me = await adminGetMe();

        if (!cancelled) {
          setUsername(me.username);
        }
      } catch {
        // No active session; stay logged out.
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (usernameInput: string, passwordInput: string) => {
      const result = await adminLogin(usernameInput, passwordInput);

      setUsername(result.username);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } catch (error) {
      if (!isUnauthorizedError(error)) {
        throw error;
      }
    } finally {
      setUsername(null);
    }
  }, []);

  const value: AdminAuthState = { username, loading, login, logout };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}