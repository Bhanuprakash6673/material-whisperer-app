import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    setUser({ name: "Researcher", email });
    return true;
  };

  const register = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    setUser({ name, email });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
