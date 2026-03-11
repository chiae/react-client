import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios-api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Email validation
  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  // Password validation
  function isValidPassword(value: string) {
    const trimmed = value.trim();
    return (
      trimmed.length >= 8 &&
      /[A-Z]/.test(trimmed) &&
      /[a-z]/.test(trimmed) &&
      /[0-9]/.test(trimmed)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // --- CLIENT-SIDE VALIDATION ---
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(password)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, and a number",
      );
      return;
    }

    // --- API CALL ---
    try {
      await api.post("/auth/register", {
        email: email.trim(),
        password: password.trim(),
      });

      navigate("/login");
    } catch (err: any) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed";

      setError(msg);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="card w-full max-w-md bg-base-100 shadow-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>

        {error && (
          <p className="text-error text-sm mb-3 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-full" type="submit">
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
