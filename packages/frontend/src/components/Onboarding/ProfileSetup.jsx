import { useEffect, useState } from "react";
import { userApi } from "../../api/userApi";

const SECTOR_OPTIONS = [
  "AI/ML",
  "Fintech",
  "Healthtech",
  "Edtech",
  "SaaS",
  "Consumer",
  "Deeptech"
];

const STAGE_OPTIONS = [
  "IDEA",
  "MVP",
  "EARLY_REVENUE",
  "GROWTH"
];

const MINDSET_OPTIONS = [
  "LONG_TERM",
  "HANDS_ON",
  "FAST_MOVE",
  "BOOTSTRAPPED",
  "RAISE_BIG"
];

export default function ProfileSetup({ onCompleted }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [sectors, setSectors] = useState([]);
  const [stagePreferences, setStagePreferences] = useState([]);
  const [mindsetTags, setMindsetTags] = useState([]);
  const [bio, setBio] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await userApi.me();
        setName(data.name || "");
        setSectors(data.sectors || []);
        setStagePreferences(data.stagePreferences || []);
        setMindsetTags(data.mindsetTags || []);
        setBio(data.bio || "");
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const toggleInArray = (value, listSetter) => {
    listSetter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await userApi.updateProfile({
        name,
        sectors,
        stagePreferences,
        mindsetTags,
        bio
      });
      onCompleted?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Complete your profile</h2>
      {error && <p className="text-sm text-red-500">{error}</p>}

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          className="border rounded px-3 py-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Sectors you care about
        </label>
        <div className="flex flex-wrap gap-2">
          {SECTOR_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className={
                "px-3 py-1 rounded text-sm border " +
                (sectors.includes(s)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700")
              }
              onClick={() => toggleInArray(s, setSectors)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Preferred stages
        </label>
        <div className="flex flex-wrap gap-2">
          {STAGE_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className={
                "px-3 py-1 rounded text-sm border " +
                (stagePreferences.includes(s)
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700")
              }
              onClick={() => toggleInArray(s, setStagePreferences)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Mindset tags
        </label>
        <div className="flex flex-wrap gap-2">
          {MINDSET_OPTIONS.map((m) => (
            <button
              key={m}
              type="button"
              className={
                "px-3 py-1 rounded text-sm border " +
                (mindsetTags.includes(m)
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700")
              }
              onClick={() => toggleInArray(m, setMindsetTags)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Short bio</label>
        <textarea
          className="border rounded px-3 py-2 w-full"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell others how you like to work and invest/collaborate"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save & continue"}
      </button>
    </f

