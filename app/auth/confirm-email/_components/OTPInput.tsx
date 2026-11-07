// components/auth/OtpInput.tsx
"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  ClipboardEvent,
  forwardRef,
  KeyboardEvent,
  useEffect,
  useRef,
} from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: () => void;
  isError?: boolean;
  disabled?: boolean;
  className?: string;
}

export const OtpInput = forwardRef<HTMLDivElement, OtpInputProps>(
  ({ value, onChange, onComplete, isError, disabled, className }, ref) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const otpArray = value.padEnd(6, " ").split("").slice(0, 6);

    useEffect(() => {
      // Focus first empty input on mount
      const firstEmptyIndex = otpArray.findIndex((char) => char === " ");
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex]?.focus();
      }
    }, []);

    const handleChange = (index: number, newValue: string) => {
      const newOtp = value.split("");
      newOtp[index] = newValue;
      const otpString = newOtp.join("").slice(0, 6);

      onChange(otpString);

      // Auto-advance to next input
      if (newValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Check if OTP is complete
      if (otpString.length === 6) {
        onComplete?.();
      }
    };

    const handleKeyDown = (
      index: number,
      e: KeyboardEvent<HTMLInputElement>
    ) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").slice(0, 6);
      if (/^\d+$/.test(pastedData)) {
        onChange(pastedData);
        // Focus last filled or next empty input
        const nextIndex = Math.min(pastedData.length, 5);
        inputRefs.current[nextIndex]?.focus();
        if (pastedData.length === 6) {
          onComplete?.();
        }
      }
    };

    return (
      <div ref={ref} className={cn("flex gap-2 justify-center", className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otpArray[index] === " " ? "" : otpArray[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            disabled={disabled}
            className={cn(
              "w-12 h-14 text-center text-xl font-semibold text-black!",
              "focus:ring-2 focus:bg-primary focus:border-primary",
              isError &&
                "border-red-500 focus:ring-red-500 focus:border-red-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          />
        ))}
      </div>
    );
  }
);

OtpInput.displayName = "OtpInput";
