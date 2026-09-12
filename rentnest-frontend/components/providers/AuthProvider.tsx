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
 
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

let cachedRaw: string | null = null;
let cachedUser: User | null = null;

function getSnapshot(): User | null {
  const raw = localStorage.getItem("user");
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedUser = raw ? (JSON.parse(raw) as User) : null;
    } catch {
      cachedUser = null;
    }
  }
  return cachedUser;
}


function getServerSnapshot(): User | null {
  return null;
}



export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storedUser = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

 
  const user = storedUser;

  const logout = useCallback(() => {
    clearAuth();
   
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
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};