import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNicknameStore = create(
  persist(
    (set, get) => ({
      nickname: "",
      currentNickname: "",
      setNickname: (nickname) => set({ nickname }),
      setCurrentNickname: (currentNickname) => set({ currentNickname }),
      saveNickname: () => {
        const state = get();
        if (state.nickname.trim()) {
          set({
            currentNickname: state.nickname.trim(),
            nickname: "",
          });
        }
      },
      removeNickname: () => {
        set({ currentNickname: "", nickname: "" });
      },
    }),
    {
      name: "yeojins-nickname-storage",
      partialize: (state) => ({ currentNickname: state.currentNickname }),
    }
  )
);

