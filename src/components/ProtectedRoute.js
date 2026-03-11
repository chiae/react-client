import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
export function ProtectedRoute({ children }) {
    const auth = useContext(AuthContext);
    if (!auth?.token) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return children;
}
