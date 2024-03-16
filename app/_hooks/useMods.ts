import { create } from "zustand";

interface ModeProps {
  mode: string;
  setmode: (newmode: string) => void;
}

const useMode = create<ModeProps>((set) => ({
  mode: "line",
  setmode: (newmode) =>
    set({
      mode: newmode,
    }),
}));

export default useMode;
