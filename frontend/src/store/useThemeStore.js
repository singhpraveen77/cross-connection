import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("kukii !!-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("kukii !!-theme", theme);
    set({ theme });
  },
}));
