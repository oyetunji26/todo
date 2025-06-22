"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { FiX } from "react-icons/fi";

interface CreateProjectFormProps {
  userId?: string; // pass current logged-in user's ID
  teamId?: string | null; // optional team ID if available
  onSuccess?: () => void;
}


export default function CreateProjectForm({ teamId = null, onSuccess }: CreateProjectFormProps) {

  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          owner: session?.user?.email || "oyetunjie5@gmail.com",
          team: teamId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create project.");
      }

      setTitle("");
      setDescription("");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 py-4 px-3 rounded-xl  max-w-md w-full">
      <h2 className="text-lg font-semibold text-theme">Create New Project</h2>

      <input
        type="text"
        placeholder="Project Title"
        className="w-full border border-theme rounded-lg p-2.5 focus:outline-none focus:ring"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Project Description"
        className="w-full border border-theme rounded-lg p-2.5 focus:outline-none focus:ring"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white rounded-lg p-2.5 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
