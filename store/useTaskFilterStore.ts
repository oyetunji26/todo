// store/useTaskFilterStore.ts
import { create } from 'zustand';

type Filter = 'all' | 'todo' | 'in_progress' | 'done';

interface TaskFilterStore {
  selectedFilter: Filter;
  setSelectedFilter: (filter: Filter) => void;
}

export const useTaskFilterStore = create<TaskFilterStore>((set) => ({
  selectedFilter: 'all',
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
}));
