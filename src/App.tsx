import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { AppLayout } from "./layouts/AppLayout";
import LoginPage from "./pages/LoginPage";
import DocumentsPage from "./pages/DocumentsPage";
import DocumentDetailPage from "./pages/DocumentDetailPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected + Shared Layout */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/documents/:id" element={<DocumentDetailPage />} />
          {/* Default → Documents */}
          <Route path="/" element={<DocumentsPage />} />
        </Route>
      </Routes>
    </div>
  );
}
