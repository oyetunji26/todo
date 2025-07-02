// hooks/useTasks.ts
import { useQuery } from "@tanstack/react-query";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  progress: number;
  project?: {
    _id: string;
    name: string;
    // Add more if needed
  } | null;
  reminders?: string[];
  messages?: string[];
  dueDate?: string;
  completed: boolean;
  status: 'todo' | 'in_progress' | 'done';
  owner?: {
    _id: string;
    name: string;
    // Add more if you populate it
  } | null;
  createdAt: string;
  updatedAt: string;
}


export const useTasks = (filters?: { project?: string; completed?: boolean }) => {
  const query = new URLSearchParams();
  if (filters?.project) query.append("project", filters.project);
  if (filters?.completed !== undefined) query.append("completed", String(filters.completed));

  const url = `/api/tasks${query.toString() ? "?" + query.toString() : ""}`;

  return useQuery<Task[]>({
    queryKey: ["tasks", filters],
    queryFn: async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
  });
};
