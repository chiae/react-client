import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { AppNav } from "@/components/AppNav";
export function AppLayout() {
    return (_jsxs("div", { className: "min-h-screen bg-base-200 text-base-content", children: [_jsx(AppNav, {}), _jsxs("main", { className: "mx-auto max-w-6xl px-6 pb-8", children: [_jsx(Outlet, {}), " "] })] }));
}
