// store/useProjectStore.ts
import { create } from "zustand";

export interface Project {
  _id: string;
  title: string;
  description?: string;
  team?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectStore {
  projects: Project[];
  activeProject: Project | null;

  setProjects: (projects: Project[]) => void;
  setActiveProject: (project: Project) => void;

  addProject: (project: Project) => void;
  updateProject: (updated: Project) => void;
  deleteProject: (id: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  activeProject: null,

  setProjects: (projects) => set({ projects }),

  setActiveProject: (project) => set({ activeProject: project }),

  addProject: (project) =>
    set((state) => ({ projects: [project, ...state.projects] })),

  updateProject: (updated) =>
    set((state) => ({
      projects: state.projects.map((p) => (p._id === updated._id ? updated : p)),
      activeProject: state.activeProject?._id === updated._id ? updated : state.activeProject,
    })),

  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p._id !== id),
      activeProject: state.activeProject?._id === id ? null : state.activeProject,
    })),
}));
