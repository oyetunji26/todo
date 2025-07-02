"use client";

import { useState } from "react";
import { useAuthStore, useProjectStore } from "@/store";
import InputField from "../Ui/InputField";
import { showToastPromise } from "@/utils/toast";
interface CreateTaskFormProps {
  project?: any;
  onSuccess?: () => void;
}

export default function CreateTaskForm({
  project,
  onSuccess,
}: CreateTaskFormProps) {
  const { user } = useAuthStore();
  const { projects, activeProject, setActiveProject, setProjects } =
    useProjectStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [projectId, setProjectId] = useState(project?._id || "");

  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    const payload = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      project: projectId,
    };

    const createTask = async () => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create task.");
      }

      return res.json();
    };

    showToastPromise(createTask(), {
      loading: "Creating Task...",
      success: `Task '${title}', created successfully!`,
      error: (err) => err.message || "Something went wrong.",
    })
      .then(() => {
        setTitle("");
        setDescription("");
        onSuccess?.();
      })
      .catch((err: any) => {
        setError(err.message || "Something went wrong.");
        console.log(err.message);
      });

    setTitle("");
    setDescription("");
    setProgress(1);
    setDueDate("");
    setCompleted(false);
    if (onSuccess) onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 py-4 px-3 rounded-xl max-w-md w-full"
    >
      <h2 className="text-lg font-semibold text-theme">
        {project && project?.title + " :"} Create New Task
        {!projectId && <h3>hgjk</h3>}
      </h2>

      <InputField
        label="Task Title"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <InputField
        label="Description"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        textarea
      />

      <InputField
        label="Due Date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <InputField
        label="Project"
        type="select"
        value={
          projects.find((p) => p?._id === projectId)?.title || ""
        }
        options={projects.map((p) => p.title)} // ✅ String array of names
        onChange={(e) => {
          const selectedName = e.target.value;
          const matched = projects.find((p) => p?.title === selectedName);
          setProjectId(matched?._id || "");
        }}
      />

      {/* <InputField
        label="Mark as Completed"
        type="checkbox"
        checked={completed}
        onChange={() => setCompleted((prev) => !prev)}
      /> */}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white rounded-lg p-2.5 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Task"}
      </button>

      {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
    </form>
  );
}
