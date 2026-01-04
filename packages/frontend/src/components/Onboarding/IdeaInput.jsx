import { useState } from "react";
import { ideaApi } from "../../api/ideaApi";

export default function IdeaInput({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    problem: "",
    solution: "",
    market: "",
    traction: "",
    sector: "",
    stage: ""
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
      const { data } = await ideaApi.createIdea(form);
      onCreated?.(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create idea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold">Describe your startup</h2>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <input
        name="title"
        placeholder="Title"
        className="border rounded px-3 py-2 w-full"
        value={form.title}
        onChange={handleChange}
      />
      <textarea
        name="problem"
        placeholder="What problem are you solving?"
        className="border rounded px-3 py-2 w-full"
        rows={3}
        value={form.problem}
        onChange={handleChange}
      />
      <textarea
        name="solution"
        placeholder="What is your solution?"
        className="border rounded px-3 py-2 w-full"
        rows={3}
        value={form.solution}
        onChange={handleChange}
      />
      <textarea
        name="market"
        placeholder="Market / customers"
        className="border rounded px-3 py-2 w-full"
        rows={2}
        value={form.market}
        onChange={handleChange}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Analyze idea"}
      </button>
    </form>
  );
}

