import { create } from "zustand";

export const useTabStore = create((set) => ({
  activeTab: "feed", // "feed" or "create"
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

