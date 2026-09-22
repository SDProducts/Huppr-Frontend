"use client";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  text?: string;
}

export function PageLoader({ text = "Loading..." }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Animated Spinner */}
        <Loader className="h-10 w-10 text-primary/70" />

        {/* Loading Text */}
        {text && (
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

interface LoaderProps {
  className?: string;
  size?: number;
  color?: string;
}

export function Loader({
  className,
  size = 50,
  color = "#1a3ef0",
}: LoaderProps) {
  return (
    <>
      <style>{`
        @keyframes loader-animate {
          to {
            stroke-dashoffset: 250%;
          }
        }
      `}</style>

      <svg
        className={cn("loader-boxes", className)}
        width={size}
        height={size}
        viewBox="0 0 50 50"
      >
        <rect
          className="fill-none"
          x="0"
          y="0"
          width="50"
          height="50"
          style={{
            stroke: color,
            strokeWidth: 50,
            strokeDasharray: 50,
            strokeDashoffset: "50%",
            animation: "loader-animate 2s linear infinite",
          }}
        />
      </svg>
    </>
  );
}
