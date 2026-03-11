import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from "react";
import api from "@/api/axios-api";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);
// 👇 Add this line
export let globalLogout = null;
export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const navigate = useNavigate();
    const login = async (email, password) => {
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
    return (_jsx(AuthContext.Provider, { value: { token, login, logout }, children: children }));
}
