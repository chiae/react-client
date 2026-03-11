import { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (auth?.token) {
    return <Navigate to="/documents" replace />;
  }

  const handleLogin = async () => {
    setError(null);

    try {
      await auth?.login(email, password);
      navigate("/documents");
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        {error && (
          <div className="alert alert-error mb-4 py-2 text-sm">{error}</div>
        )}

        <label className="form-control w-full mb-4">
          <span className="label-text">Email</span>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="form-control w-full mb-6">
          <span className="label-text">Password</span>
          <input
            type="password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button className="btn btn-primary w-full mb-4" onClick={handleLogin}>
          Login
        </button>

        <p className="text-center text-sm">
          Need an account?{" "}
          <Link to="/register" className="link link-primary">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
