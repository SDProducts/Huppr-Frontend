// context/modalstate.ts
import { create } from "zustand";

export const useModal = create<ModalState>((set) => ({
  isCloseable: true,
  isTransModal: false,
  isOpen: false,
  content: null,
  header: null,
  title: "",
  size: "w-full sm:w-sm",
  bgColor: "bg-white",
  headerColor: "bg-transparent",
  goBack() {},
  open: (content) =>
    set({
      isOpen: true,
      content: content.content,
      isCloseable: true,
      isTransModal: false,
      title: content.title,
      header: content.header,
      goBack: content.goBack,
      size: content.size || "w-full sm:w-sm",
      bgColor: content.bgColor || "bg-white",
      headerColor: content.headerColor || "bg-transparent",
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
