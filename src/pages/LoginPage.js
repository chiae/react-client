import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
export default function LoginPage() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    if (auth?.token) {
        return _jsx(Navigate, { to: "/documents", replace: true });
    }
    const handleLogin = async () => {
        setError(null);
        try {
            await auth?.login(email, password);
            navigate("/documents");
        }
        catch (err) {
            console.error("Login failed", err);
            setError("Invalid email or password");
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsxs("div", { className: "card w-full max-w-sm bg-base-100 shadow-xl p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-6 text-center", children: "Login" }), error && (_jsx("div", { className: "alert alert-error mb-4 py-2 text-sm", children: error })), _jsxs("label", { className: "form-control w-full mb-4", children: [_jsx("span", { className: "label-text", children: "Email" }), _jsx("input", { type: "email", className: "input input-bordered w-full", value: email, onChange: (e) => setEmail(e.target.value) })] }), _jsxs("label", { className: "form-control w-full mb-6", children: [_jsx("span", { className: "label-text", children: "Password" }), _jsx("input", { type: "password", className: "input input-bordered w-full", value: password, onChange: (e) => setPassword(e.target.value) })] }), _jsx("button", { className: "btn btn-primary w-full mb-4", onClick: handleLogin, children: "Login" }), _jsxs("p", { className: "text-center text-sm", children: ["Need an account?", " ", _jsx(Link, { to: "/register", className: "link link-primary", children: "Create one" })] })] }) }));
}
