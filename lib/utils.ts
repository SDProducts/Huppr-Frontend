import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (text: string) =>
  text
    .split(" ")
    .map((el) => el[0])
    .join("");

export const getTimeAgo = (date: string) => {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return `${Math.floor(diff / 86400)}d ago`;
};

export const gettTime = (date: string) => {
  const time = new Date(date).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return time;
};
export const getShortDate = (date: string) => {
  const shortDate = new Date(date).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
  });
  return shortDate;
};
export const getDate = (date: string) => {
  const fullDate = new Date(date).toLocaleDateString("en-NG", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return fullDate;
};

export const labelCase = (s?: string) =>
  s ? s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "—";

export const formatFileSizeMB = (bytes: number): string => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
};

/**
 * Maps content type or file name extension to a clean display label (e.g., "PDF", "CSV")
 */
export const getFileDisplayType = (
  contentType: string,
  fileName?: string
): string => {
  // Map common MIME types to short display labels
  const mimeMap: Record<string, string> = {
    "application/pdf": "PDF",
    "text/csv": "CSV",
    "application/vnd.ms-excel": "XLS",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
    "application/msword": "DOC",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "DOCX",
    "application/json": "JSON",
    "application/zip": "ZIP",
    "image/jpeg": "JPEG",
    "image/png": "PNG",
    "image/gif": "GIF",
    "image/webp": "WEBP",
    "text/plain": "TXT",
  };

  if (mimeMap[contentType]) {
    return mimeMap[contentType];
  }

  // Fallback: extract extension from fileName if available
  if (fileName && fileName.includes(".")) {
    const ext = fileName.split(".").pop();
    if (ext) return ext.toUpperCase();
  }

  // Fallback: parse secondary part of MIME type (e.g., "application/x-rar" -> "X-RAR")
  const parts = contentType.split("/");
  if (parts.length > 1) {
    return parts[1].replace("vnd.", "").replace("x-", "").toUpperCase();
  }

  return "FILE";
};
