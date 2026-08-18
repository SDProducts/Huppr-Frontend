// context/modalstate.ts
import { create } from "zustand";

export const useModal = create<ModalState>((set) => ({
  isCloseable: true,
  isTransModal: false,
  isOpen: false,
  content: null,
  title: "",
  size: "w-full sm:w-sm",
  goBack() {},
  open: (content) =>
    set({
      isOpen: true,
      content: content.content,
      isCloseable: true,
      isTransModal: false,
      title: content.title,
      goBack: content.goBack,
      size: content.size || "w-full sm:w-sm",
    }),
  openStrong: (content) => set({ isOpen: true, isCloseable: false, content }),
  openTransModal: (content) =>
    set({ isOpen: true, isTransModal: true, content }),
  close: () =>
    set({
      isOpen: false,
      isCloseable: true,
      content: null,
      title: "",
      goBack: () => {},
    }),
}));
