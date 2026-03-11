import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppLayout } from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import DocumentsPage from "./pages/DocumentsPage";
import DocumentDetailPage from "./pages/DocumentDetailPage";
import ProfilePage from "./pages/ProfilePage";
export default function App() {
    return (_jsx("div", { className: "min-h-screen bg-base-200 text-base-content", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsxs(Route, { element: _jsx(ProtectedRoute, { children: _jsx(AppLayout, {}) }), children: [_jsx(Route, { path: "/documents", element: _jsx(DocumentsPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) }), _jsx(Route, { path: "/documents/:id", element: _jsx(DocumentDetailPage, {}) }), _jsx(Route, { path: "/", element: _jsx(DocumentsPage, {}) })] })] }) }));
}
