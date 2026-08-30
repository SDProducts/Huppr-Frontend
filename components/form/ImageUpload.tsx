"use client";
import { ErrorMessage, useField } from "formik";
import { CloudUpload, Info, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useRef } from "react";
import toast from "react-hot-toast";

interface ImageUploadFieldProps {
  name: string;
  label?: string;
  infoText?: string;
  text?: string;
  className?: string;
  labelClassName?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  aspectRatio?: string;
  width?: number | string;
  height?: number | string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  name,
  label,
  infoText,
  className = "",
  labelClassName = "",
  text = "Upload Image",
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/bmp"],
  maxFileSize = 5 * 1024 * 1024, // 5MB
  aspectRatio = "9/16",
}) => {
  const [field, meta, helpers] = useField(name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasError = meta.touched && meta.error;
  const validateFile = useCallback(
    (file: File) => {
      if (!acceptedFileTypes.includes(file.type)) {
        return "Unsupported file format";
      }
      if (file.size > maxFileSize) {
        return `File size too large (max ${maxFileSize / 1024 / 1024}MB)`;
      }
      return null;
    },
    [acceptedFileTypes, maxFileSize]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        helpers.setError(error);
        toast.error(error);
        return;
      }
      helpers.setValue(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    helpers.setValue(null);
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className={`mb-0.5 text-gray-800 capitalize ${labelClassName}`}>
          {label}
        </div>
      )}

      <div
        className={`relative border rounded-2xl overflow-hidden bg-gray-100 ${
          hasError ? "border-red-500" : "border-0"
        }`}
      >
        <label className="block w-full h-full cursor-pointer">
          <input
            type="file"
            name={name}
            accept={acceptedFileTypes.join(",")}
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          {field.value ? (
            <>
              <div className=" h-full w-full">
                <Image
                  src={
                    field.value instanceof File
                      ? URL.createObjectURL(field.value)
                      : field.value
                  }
                  alt="Uploaded preview"
                  height={100}
                  width={100}
                  className="object-cover w-full h-auto"
                />
              </div>
              <button
                type="button"
                className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2"
                onClick={handleRemove}
              >
                <Trash2 size={16} />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full rounded-xl">
              <div className="flex items-start gap-2 p-4 text-left">
                <div className="rounded-full bg-primary-100 h-13 w-13 flex justify-center items-center">
                  <CloudUpload className="text-primary h-7 w-7" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="text-sm font-medium">{text}</div>
                  <div className="text-xs">{infoText}</div>
                </div>
              </div>
            </div>
          )}
        </label>

        {hasError && (
          <div className="absolute top-2 right-2">
            <Info className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="p"
        className="mt-1 text-xs text-left text-red-500"
      />
    </div>
  );
};

export default ImageUploadField;
