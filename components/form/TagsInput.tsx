"use client";

import { ErrorMessage, useField } from "formik";
import { X } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

interface TagsInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  maxTags?: number;
  className?: string;
}

export default function TagsInput({
  name,
  label,
  placeholder = "Type and press Enter...",
  maxTags = 10,
  className = "",
}: TagsInputProps) {
  const [field, meta, helpers] = useField<string[]>(name);
  const { value = [] } = field;
  const { setValue } = helpers;

  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (value.includes(trimmed)) return;
    if (value.length >= maxTags) return;

    setValue([...value, trimmed]);
    setInputValue("");
  };

  const removeTag = (tagToRemove: string) => {
    setValue(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      // Remove last tag when backspace on empty input
      setValue(value.slice(0, -1));
    }
  };

  // Focus input when clicking anywhere on the container
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) {
        inputRef.current?.focus();
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const hasError = meta.touched && meta.error;

  return (
    <div className={`w-full`} ref={containerRef}>
      {label && <div className="text-gray-500 text-sm">{label}</div>}
      <div
        className={` w-full flex flex-wrap gap-2 items-center bg-transparent transition  ${className}
`}
      >
        {/* Existing tags */}
        {value.map((tag) => (
          <div
            key={tag}
            className="bg-primary-100 text-primary px-3 py-1 rounded-lg text-sm flex items-center gap-1.5 group"
          >
            {tag}
            <div
              onClick={() => removeTag(tag)}
              className="text-zinc-400 hover:text-red-400 transition"
            >
              <X size={14} />
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || ""}
        className="flex-1 w-full min-w-30 mt-4 bg-transparent border border-gray-200 rounded-md p-3 outline-none text-black placeholder-zinc-500 text-sm"
        disabled={value.length >= maxTags}
      />
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-xs mt-1 text-left"
      />

      {hasError && <p className="text-red-500 text-xs mt-1.5">{meta.error}</p>}
    </div>
  );
}
