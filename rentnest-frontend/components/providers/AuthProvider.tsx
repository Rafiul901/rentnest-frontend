"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import { User } from "@/types/auth";
import { clearAuth, getStoredUser } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);



const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", cb);
  }
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", cb);
    }
  };
}


let cached: User | null = null;

function getSnapshot(): User | null {
  const next = getStoredUser(); 
  if (JSON.stringify(next) !== JSON.stringify(cached)) {
    cached = next;
  }
  return cached;
}

function getServerSnapshot(): User | null {
  return null;
}



export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const logout = useCallback(() => {
    clearAuth();
    cached = null;
    listeners.forEach((cb) => cb());
    window.location.href = "/auth/login";
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading: false, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};