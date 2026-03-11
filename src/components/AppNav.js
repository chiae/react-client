import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
export function AppNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useContext(AuthContext);
    if (!auth || !auth.token) {
        return (_jsx("nav", { className: "navbar bg-base-100 border-b border-base-300 px-6 py-0", children: _jsx(Link, { to: "/login", className: "text-lg font-bold", children: "Document QA" }) }));
    }
    const linkClass = (path) => `btn btn-ghost btn-sm ${location.pathname.startsWith(path) ? "bg-base-200 font-semibold" : ""}`;
    const handleLogout = () => {
        auth.logout();
        navigate("/login");
    };
    return (_jsx("nav", { className: "navbar bg-base-100 border-b border-base-300 px-6 py-0", children: _jsxs("div", { className: "flex items-center gap-4 flex-1", children: [_jsx(Link, { to: "/documents", className: "text-lg font-bold", children: "Document QA" }), _jsx(Link, { to: "/documents", className: linkClass("/documents"), children: "Documents" }), _jsx("button", { onClick: handleLogout, className: "btn btn-sm", children: "Logout" })] }) }));
}
