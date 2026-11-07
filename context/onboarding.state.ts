// context/modalstate.ts
import { create } from "zustand";
type Steps = 1 | 2 | 3 | 4 | 5 | 6 | 7;
interface OnboardingState {
  step: number;
  completed: boolean;
  setStep: (step: number) => void;
  setCompleted: (status: boolean) => void;
}
export const useOnboarding = create<OnboardingState>((set) => ({
  step: 0,
  completed: false,
  setStep(step) {
    set({
      step: step,
    });
  },
  setCompleted(status) {
    set({
      completed: status,
    });
  },
}));
