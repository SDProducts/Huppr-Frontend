"use client";

import { useField } from "formik";
import { FileText, FileUp, Trash2 } from "lucide-react";
import React, { useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface FileUploadProps {
  name: string;
  label: string;
  multiple?: boolean;
  accept?: Accept;
  maxSize?: number;
  helperText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  multiple = false,
  accept = { "application/*": [".pdf"] },
  maxSize = 5 * 1024 * 1024, // 5MB default limit
  helperText,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles || acceptedFiles.length === 0) return;

      if (multiple) {
        const existingFiles = Array.isArray(field.value) ? field.value : [];
        helpers.setValue([...existingFiles, ...acceptedFiles]);
      } else {
        helpers.setValue(acceptedFiles[0]);
      }
      helpers.setTouched(true);
    },
    [field.value, helpers, multiple]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      multiple,
      ...props,
    });

  const removeFile = (indexToRemove: number) => {
    if (multiple && Array.isArray(field.value)) {
      const updatedFiles = field.value.filter(
        (_, index) => index !== indexToRemove
      );
      helpers.setValue(updatedFiles.length > 0 ? updatedFiles : null);
    } else {
      helpers.setValue(null);
    }
  };
  const removeAll = () => {
    helpers.setValue(null);
  };

  const hasError = Boolean(meta.touched && meta.error);
  const files: File[] = multiple
    ? Array.isArray(field.value)
      ? field.value
      : []
    : field.value
    ? [field.value]
    : [];

  return (
    <div className="mb-6 font-sans">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-semibold text-gray-700"
        >
          {label}
        </label>
      )}

      {/* Dropzone Container */}
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center p-5 h-40 text-center border-3 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
          hasError
            ? "border-red-500 bg-red-50/30"
            : isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-primary/5 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps({ id: name, name })} />
        <div className="flex flex-col items-center gap-2">
          <FileUp className="size-6 sm:size-10 text-gray-500" />
          <p className="m-0 text-gray-600">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop files here, or click to browse"}
          </p>
        </div>
        <span className="mt-0 text-sm text-gray-400">
          Max size: {(maxSize / (1024 * 1024)).toFixed(1)}MB
        </span>
      </div>

      {/* Helper / Error Text */}
      {hasError && (
        <div className="mt-1 text-xs text-red-600">{meta.error}</div>
      )}
      {!hasError && helperText && (
        <div className="mt-1 text-xs text-gray-500">{helperText}</div>
      )}

      {/* File Rejections (Size limit or type violations) */}
      {fileRejections.length > 0 && (
        <div className="mt-1 text-xs text-red-600 space-y-1">
          {fileRejections.map(({ file, errors }) => (
            <div key={file.name}>
              <span className="font-medium">{file.name}:</span>{" "}
              {errors.map((e) => e.message).join(", ")}
            </div>
          ))}
        </div>
      )}

      {/* Selected File Previews */}
      {files.length > 0 && (
        <div className="mt-5 space-y-2">
          <div className="flex justify-between items-center">
            <div className="font-bold text-sm">Selected Files</div>
            <div
              className="flex items-center gap-1 text-xs text-red-500 cursor-pointer"
              onClick={removeAll}
            >
              <Trash2 className="size-3" />
              <div className="">Clear All</div>
            </div>
          </div>
          <div className="">
            <ul className="p-0 space-y-1 list-none">
              {files.map((file, idx) => (
                <li
                  key={`${file.name}-${idx}`}
                  className="flex items-start justify-between gap-6 p-3 text-gray-700 border border-gray-200 rounded-md"
                >
                  <div className="flex-1 flex gap-1.5 items-center-safe">
                    <div className="flex justify-center items-center p-1 rounded-md bg-primary/5">
                      <FileText className="size-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <div className="line-clamp-1 text-sm">
                        File: {file.name}{" "}
                      </div>
                      <div className="text-gray-400 text-xs">
                        Size: ({(file.size / 1024).toFixed(1)} KB)
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => removeFile(idx)}
                    className="font-bold text-gray-400 hover:text-red-600 transition-colors border-0 cursor-pointer focus:outline-none"
                  >
                    <Trash2 className="size-4.5" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
