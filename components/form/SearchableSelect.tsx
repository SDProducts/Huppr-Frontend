"use client";

import { ErrorMessage, useField } from "formik";
import { AlertCircle, CheckCircle2, ChevronDown, Search } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface SelectProps {
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
}

const SearchableSelect: React.FC<SelectProps> = ({
  name,
  options,
  placeholder = "Select an option",
  className = "",
  labelClassName = "",
  optionsClassName = "",
  disabled = false,
  icon,
  label,
  theme = "light",
}) => {
  const [field, meta, helpers] = useField(name);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  const hasError = meta.touched && meta.error;

  const selectedOption = options.find(
    (option) => String(option.value) === String(field.value)
  );

  const filteredOptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return options;

    return options.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  }, [search, options]);

  const handleSelect = (value: string | number) => {
    helpers.setValue(value);
    helpers.setTouched(true);

    setOpen(false);
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

  return (
    <div className="w-full text-left" ref={containerRef}>
      {label && (
        <div className={`capitalize text-gray-800 mb-0.5 ${labelClassName}`}>
          {label}
        </div>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
            }
          }}
          onBlur={() => {
            helpers.setTouched(true);
          }}
          className={`w-full relative flex flex-row items-center border rounded-lg py-3.5 text-left ${
            hasError
              ? "border-red-500"
              : theme === "dark"
              ? "border-gray-700"
              : "border-gray-200 focus:border-blue-400"
          } ${
            disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"
          } ${className}`}
        >
          {icon && <div className="flex items-center px-3">{icon}</div>}

          <div
            className={`flex-1 text-sm text-nowrap truncate text-left px-0 ${
              selectedOption
                ? theme === "dark"
                  ? "text-gray-300"
                  : "text-gray-900"
                : "text-gray-400"
            }`}
          >
            {selectedOption?.label ? (
              <div className="flex">
                <div className="flex items-center gap-2">
                  {selectedOption.icon && selectedOption.icon}
                  <div className="">
                    <div>{selectedOption.label}</div>
                    {selectedOption.subText && (
                      <div className="text-gray-500 text-xs line-clamp-1">
                        {selectedOption.subText}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              placeholder
            )}
            {/* {selectedOption?.label || placeholder} */}
          </div>

          <div className="flex items-center px-0 pointer-events-none">
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          {hasError && (
            <div className="flex items-center px-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
        </button>

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
            </div>

            <div className="max-h-60 overflow-y-auto p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => {
                  const isSelected =
                    String(field.value) === String(option.value);

                  return (
                    <div
                      key={option.value}
                      // type="button"
                      onClick={() => handleSelect(option.value)}
                      className={`w-full flex cursor-pointer items-center justify-between px-3 py-2.5 rounded-md text-sm text-left transition-colors ${
                        theme === "dark"
                          ? "text-gray-300 hover:bg-gray-800"
                          : "text-gray-700 hover:bg-gray-100"
                      } ${
                        isSelected
                          ? theme === "dark"
                            ? "bg-gray-800"
                            : "bg-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {option.icon && option.icon}
                        <div className="">
                          <div>{option.label}</div>
                          {option.subText && (
                            <div className="text-gray-500 text-xs line-clamp-1">
                              {option.subText}
                            </div>
                          )}
                        </div>
                      </div>

                      {isSelected && (
                        <CheckCircle2 className="size-4 shrink-0" />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="px-3 py-6 text-sm text-gray-400 text-center">
                  No options found
                </div>
              )}
            </div>
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

export default SearchableSelect;
