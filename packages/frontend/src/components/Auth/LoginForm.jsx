import { useState } from "react";
import { authApi } from "../../api/authApi";

export default function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await authApi.login(form);
      localStorage.setItem("accessToken", data.token);
      onSuccess?.(data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Login</h2>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border rounded px-3 py-2 w-full"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border rounded px-3 py-2 w-full"
        value={form.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

