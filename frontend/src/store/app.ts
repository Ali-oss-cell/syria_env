import { create } from "zustand";
import type { User, Company, SyncItem } from "@/types";

interface AppState {
  // Auth
  user: User | null;
  company: Company | null;
  setUser: (user: User | null) => void;
  setCompany: (company: Company | null) => void;

  // Sync queue
  syncQueue: SyncItem[];
  addToQueue: (item: SyncItem) => void;
  removeFromQueue: (id: string) => void;
  updateQueueItem: (id: string, updates: Partial<SyncItem>) => void;
  clearQueue: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  company: null,
  setUser: (user) => set({ user }),
  setCompany: (company) => set({ company }),

  syncQueue: [],
  addToQueue: (item) => set((state) => ({ syncQueue: [...state.syncQueue, item] })),
  removeFromQueue: (id) => set((state) => ({ syncQueue: state.syncQueue.filter((i) => i.id !== id) })),
  updateQueueItem: (id, updates) =>
    set((state) => ({
      syncQueue: state.syncQueue.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    })),
  clearQueue: () => set({ syncQueue: [] }),
}));
