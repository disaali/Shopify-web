"use client";
import { useState, useEffect, createContext, useContext } from "react";

type AuthContextType = {
  user: { id: string } | null;
  token: string | null;
  login: (token: string, userId: string) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    const u = localStorage.getItem("auth_user_id");
    if (t && u) {
      setToken(t);
      setUser({ id: u });
    }
    setIsLoading(false);
  }, []);

  const login = (t: string, u: string) => {
    localStorage.setItem("auth_token", t);
    localStorage.setItem("auth_user_id", u);
    setToken(t);
    setUser({ id: u });
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user_id");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
};
