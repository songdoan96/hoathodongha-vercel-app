import { create } from "zustand";
import { persist } from "zustand/middleware";
interface SalaryState {
  msnv: string;
  cccd: string;
  setSalary: ({ msnv, cccd }: { msnv: string; cccd: string }) => void;
}

const useSalaryStore = create<SalaryState>()(
  persist(
    (set) => ({
      msnv: "",
      cccd: "",
      setSalary: ({ msnv, cccd }) => set({ msnv, cccd }),
    }),
    {
      name: "salary-storage",
      // storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useSalaryStore;
