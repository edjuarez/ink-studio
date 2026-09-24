import { createContext } from "react";

export type AdminAuthState = {
  username: string | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AdminAuthContext = createContext<AdminAuthState | null>(null);