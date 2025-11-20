import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LocaleEnums } from "./types";

export const useLocale = create(
  persist<{
    locale: LocaleEnums;
    setLocale: (value: LocaleEnums) => void;
  }>(
    (set) => ({
      locale: LocaleEnums.EN,
      setLocale: (value) => set({ locale: value }),
    }),
    {
      name: "intl-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
