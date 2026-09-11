import { Loader2 } from "lucide-react";

interface PageLoaderProps {
  text?: string;
}

export function PageLoader({ text = "Loading..." }: PageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        {/* Animated Spinner */}
        <Loader2 className="h-10 w-10 animate-spin text-primary" />

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
