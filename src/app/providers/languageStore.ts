import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "dragonspeak";

type LanguageStore = {
  language: Language;
  setLanguage: (language: Language) => void;
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => set({ language }),
    }),
    { name: "dragonspeak-language" },
  ),
);
