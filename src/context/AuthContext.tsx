import { createContext, useState } from "react";
import api from "@/api/axios-api";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

// 👇 Add this line
export let globalLogout: (() => void) | null = null;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("jwt"),
  );

  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    const jwt = res.data.token;

    setToken(jwt);
    localStorage.setItem("jwt", jwt);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  // Expose logout globally so Axios can call it
  globalLogout = logout;

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
