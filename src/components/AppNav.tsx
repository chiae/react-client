import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export function AppNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);

  if (!auth || !auth.token) {
    return (
      <nav className="navbar bg-base-100 border-b border-base-300 px-6 py-0">
        <Link to="/login" className="text-lg font-bold">
          Document QA
        </Link>
      </nav>
    );
  }

  const linkClass = (path: string) =>
    `btn btn-ghost btn-sm ${
      location.pathname.startsWith(path) ? "bg-base-200 font-semibold" : ""
    }`;

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar bg-base-100 border-b border-base-300 px-6 py-0">
      <div className="flex items-center gap-4 flex-1">
        <Link to="/documents" className="text-lg font-bold">
          Document QA
        </Link>

        <Link to="/documents" className={linkClass("/documents")}>
          Documents
        </Link>

        <button onClick={handleLogout} className="btn btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}
