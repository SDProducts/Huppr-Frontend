"use client";

import { ErrorMessage, useField } from "formik";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface MultiSelectProps {
  name: string;
  options: Array<{
    value: string | number;
    label: string;
    subText?: string;
    icon?: React.ReactNode;
  }>;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  optionsClassName?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  theme?: string;
  label?: string;
  /** Max number of chips shown before collapsing into "+N more" */
  maxChips?: number;
}

const MultiSearchableSelect: React.FC<MultiSelectProps> = ({
  name,
  options,
  placeholder = "Select options",
  className = "",
  labelClassName = "",
  optionsClassName = "",
  disabled = false,
  icon,
  label,
  theme = "light",
  maxChips = 3,
}) => {
  const [field, meta, helpers] = useField<(string | number)[]>(name);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const hasError = meta.touched && meta.error;

  // Ensure we always work with an array
  const selectedValues: (string | number)[] = Array.isArray(field.value)
    ? field.value
    : [];

  const selectedOptions = useMemo(
    () =>
      options.filter((option) =>
        selectedValues.some((v) => String(v) === String(option.value))
      ),
    [options, selectedValues]
  );

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return options;
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(query) ||
        option.subText?.toLowerCase().includes(query)
    );
  }, [search, options]);

  const isSelected = (value: string | number) =>
    selectedValues.some((v) => String(v) === String(value));

  const toggleOption = (value: string | number) => {
    const exists = isSelected(value);
    const next = exists
      ? selectedValues.filter((v) => String(v) !== String(value))
      : [...selectedValues, value];

    helpers.setValue(next);
    helpers.setTouched(true);
  };

  const removeValue = (value: string | number) => {
    const next = selectedValues.filter((v) => String(v) !== String(value));
    helpers.setValue(next);
    helpers.setTouched(true);
  };

  const clearAll = () => {
    helpers.setValue([]);
    helpers.setTouched(true);
    setSearch("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const visibleChips = selectedOptions.slice(0, maxChips);
  const hiddenCount = selectedOptions.length - visibleChips.length;

  return (
    <div className="w-full text-left" ref={containerRef}>
      {label && (
        <div className={`capitalize text-gray-800 mb-0.5 ${labelClassName}`}>
          {label}
        </div>
      )}

      <div className="relative">
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              setOpen((prev) => !prev);
            }
          }}
          onBlur={() => helpers.setTouched(true)}
          className={`w-full relative flex flex-row items-center gap-1 border rounded-lg py-3.5 text-left ${
            hasError
              ? "border-red-500"
              : theme === "dark"
              ? "border-gray-700"
              : "border-gray-200 focus-within:border-blue-400"
          } ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"
          } ${className}`}
        >
          {icon && (
            <div className="flex items-center px-3 shrink-0">{icon}</div>
          )}

          <div
            className={`flex-1 flex flex-wrap items-center gap-1.5 min-w-0 px-3 ${
              theme === "dark" ? "text-gray-300" : "text-gray-900"
            }`}
          >
            {selectedOptions.length === 0 && (
              <span className="text-sm text-gray-400 truncate">
                {placeholder}
              </span>
            )}

            {visibleChips.map((option) => (
              <span
                key={option.value}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs max-w-full ${
                  theme === "dark"
                    ? "bg-gray-800 text-gray-200"
                    : "bg-primary/5 text-primary"
                }`}
              >
                {option.icon && <span className="shrink-0">{option.icon}</span>}
                <span className="truncate">{option.label}</span>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(option.value);
                  }}
                  className={`shrink-0 rounded hover:bg-black/10 ${
                    disabled
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  aria-label={`Remove ${option.label}`}
                >
                  <X className="w-3 h-3" />
                </div>
              </span>
            ))}

            {hiddenCount > 0 && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                  theme === "dark"
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                +{hiddenCount} more
              </span>
            )}
          </div>

          <div className="flex items-center px-1 shrink-0">
            {selectedOptions.length > 0 && !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
                className={`mr-1 rounded p-1 hover:bg-black/10 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
                aria-label="Clear all"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          {hasError && (
            <div className="flex items-center px-3 shrink-0">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>

        {open && !disabled && (
          <div
            className={`absolute min-w-70 z-50 left-0 right-0 mt-2 rounded-lg border shadow-lg overflow-hidden ${
              theme === "dark"
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
            } ${optionsClassName}`}
          >
            <div
              className={`flex items-center gap-2 px-3 border-b ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <Search className="w-4 h-4 text-gray-400 shrink-0" />

              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className={`w-full py-3 text-sm bg-transparent outline-none ${
                  theme === "dark"
                    ? "text-gray-200 placeholder:text-gray-500"
                    : "text-gray-900 placeholder:text-gray-400"
                }`}
              />

              {selectedOptions.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className={`text-xs shrink-0 ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  Clear
                </button>
              )}
            </div>

            <div className="max-h-60 overflow-y-auto p-1 space-y-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const selected = isSelected(option.value);

                  return (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => toggleOption(option.value)}
                      className={`w-full flex cursor-pointer items-center justify-between px-3 py-2.5 rounded-md text-sm text-left transition-colors ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                      } ${
                        selected
                          ? theme === "dark"
                            ? "bg-gray-800"
                            : "bg-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {option.icon && (
                          <span className="shrink-0">{option.icon}</span>
                        )}
                        <div className="min-w-0">
                          <div className="truncate">{option.label}</div>
                          {option.subText && (
                            <div className="text-gray-500 text-xs line-clamp-1">
                              {option.subText}
                            </div>
                          )}
                        </div>
                      </div>

                      {selected && <CheckCircle2 className="size-4 shrink-0" />}
                    </button>
                  );
                })
              ) : (
                <div className="px-3 py-6 text-sm text-gray-400 text-center">
                  No options found
                </div>
              )}
            </div>

            {selectedOptions.length > 0 && (
              <div
                className={`flex items-center justify-between px-3 py-2 border-t text-xs ${
                  theme === "dark"
                    ? "border-gray-700 text-gray-400"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                <span>{selectedOptions.length} selected</span>
                <button
                  type="button"
                  onClick={clearAll}
                  className={`font-medium ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-black"
                  }`}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-[9px] mt-1 ml-2 text-left"
      />
    </div>
  );
};

export default MultiSearchableSelect;
