import { useState } from "react";
import { authApi } from "../../api/authApi";

export default function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "INNOVATOR"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await authApi.register(form);
      localStorage.setItem("accessToken", data.token);
      onSuccess?.(data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Create account</h2>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <input
        name="name"
        placeholder="Name"
        className="border rounded px-3 py-2 w-full"
        value={form.name}
        onChange={handleChange}
      />
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
      <select
        name="role"
        className="border rounded px-3 py-2 w-full"
        value={form.role}
        onChange={handleChange}
      >
        <option value="INNOVATOR">Innovator</option>
        <option value="INVESTOR">Investor</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Creating..." : "Register"}
      </button>
    </form>
  );
}

