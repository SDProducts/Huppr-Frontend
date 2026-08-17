import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type MetricCardVariant =
  | "blue"
  | "purple"
  | "green"
  | "teal"
  | "red"
  | "yellow";

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  meta?: string;
  subMeta?: string;
  variant?: MetricCardVariant;
  className?: string;
}

const variants: Record<
  MetricCardVariant,
  {
    icon: string;
    iconColor: string;
    meta: string;
  }
> = {
  blue: {
    icon: "bg-blue-50",
    iconColor: "text-blue-600",
    meta: "text-green-600",
  },
  purple: {
    icon: "bg-purple-50",
    iconColor: "text-purple-600",
    meta: "text-slate-500",
  },
  green: {
    icon: "bg-green-50",
    iconColor: "text-green-600",
    meta: "text-slate-500",
  },
  teal: {
    icon: "bg-teal-50",
    iconColor: "text-teal-600",
    meta: "text-slate-500",
  },
  red: {
    icon: "bg-red-50",
    iconColor: "text-red-600",
    meta: "text-slate-500",
  },
  yellow: {
    icon: "bg-amber-50",
    iconColor: "text-amber-600",
    meta: "text-slate-500",
  },
};

export function MetricCard({
  icon: Icon,
  value,
  label,
  meta,
  subMeta,
  variant = "blue",
  className,
}: MetricCardProps) {
  const styles = variants[variant];

  return (
    <div
      className={cn(
        "flex min-h-[194px] w-full flex-col rounded-[24px] border border-slate-200 bg-white p-5",
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex size-9 items-center justify-center rounded-xl",
          styles.icon
        )}
      >
        <Icon className={cn("size-[18px]", styles.iconColor)} strokeWidth={2} />
      </div>

      {/* Value */}
      <div className="mt-5">
        <p className="text-[22px] font-bold leading-none tracking-tight text-slate-900">
          {value}
        </p>

        <p className="mt-3 text-[13px] leading-5 text-slate-500">{label}</p>
      </div>

      {/* Bottom information */}
      {(meta || subMeta) && (
        <div className="mt-auto pt-4">
          {meta && (
            <p
              className={cn(
                "text-[10px] font-medium uppercase leading-4 tracking-tight",
                styles.meta
              )}
            >
              {meta}
            </p>
          )}

          {subMeta && (
            <p className="mt-1 text-[10px] font-medium uppercase leading-4 text-slate-500">
              {subMeta}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
