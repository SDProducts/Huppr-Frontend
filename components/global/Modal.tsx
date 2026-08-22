"use client";
import { useModal } from "@/context/modal.state";
import { ChevronLeft, X } from "lucide-react";
import { useEffect } from "react";
const Modal = () => {
  const {
    isOpen,
    content,
    size,
    close,
    goBack,
    title,
    isCloseable,
    isTransModal,
  } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isCloseable) {
      if (isOpen) {
        window.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, isCloseable, close]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-2 bg-black/50 backdrop-blur-md z-99"
      // onClick={close}
    >
      <div
        className={`relative space-y-1 p-2 w-full ${size} ${
          isTransModal ? "bg-transparent" : "bg-white shadow-lg"
        } rounded-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white flex items-start">
          <div
            className="h-7 w-7 sm:h-10 sm:w-10 rounded-full border border-gray-200 hover:bg-gray-100 flex items-center justify-center"
            onClick={goBack}
          >
            <ChevronLeft size={20} />
          </div>
          <div className="flex-1 font-bold mx-2 text-lg overflow-x-scroll uppercase text-nowrap scrollbar-hide">
            {title}
          </div>

          {isCloseable && (
            <div
              className="bg-white rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 cursor-pointer h-7 w-7 sm:h-10 sm:w-10 flex justify-center items-center"
              onClick={close}
              aria-label="Close Modal"
            >
              <X size={20} />
            </div>
          )}
        </div>
        <div className={`max-h-[70vh] overflow-y-auto scrollbar-hide`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
