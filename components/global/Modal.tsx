"use client";
import { useModal } from "@/context/modal.state";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect } from "react";
const Modal = () => {
  const {
    isOpen,
    content,
    size,
    close,
    goBack,
    header,
    headerColor,
    title,
    isCloseable,
    isTransModal,
    bgColor,
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
      className="fixed inset-0 flex items-center justify-center p-2 bg-black/50 backdrop-blur-[2px] z-99"
      // onClick={close}
    >
      <div
        className={cn(
          "relative space-y-1 w-full",
          size,
          isTransModal ? "bg-transparent" : `${bgColor} shadow-lg`,
          "rounded-2xl overflow-hidden"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={cn("flex items-start p-4", headerColor)}>
          <div className="flex-1">{header}</div>

          {isCloseable && (
            <div
              className="rounded-full bg-white border border-gray-200 text-gray-400 hover:text-gray-900 cursor-pointer h-7 w-7 sm:h-10 sm:w-10 flex justify-center items-center"
              onClick={close}
              aria-label="Close Modal"
            >
              <X size={20} />
            </div>
          )}
        </div>
        <div className={`max-h-[70vh] overflow-y-auto scrollbar-hide p-2`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
