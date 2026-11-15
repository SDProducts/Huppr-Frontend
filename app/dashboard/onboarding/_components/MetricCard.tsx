import { cn } from "@/lib/utils";

export function MetricCard({
  icon: Icon,
  iconClass,
  label,
  value,
  change,
}: {
  icon: React.ElementType;
  iconClass: string;
  label: string;
  value: string | number;
  change: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-none">
      <div className="p-3 space-y-1.5">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            iconClass
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <p
          className="text-xs mt-4 font-medium text-slate-500 line-clamp-1"
          title={label}
        >
          {label}
        </p>

        <p className="text-2xl font-extrabold text-slate-900">{value}</p>

        <p
          className="text-[9px] font-medium text-green-500 line-clamp-1"
          title={change}
        >
          ↑ {change}
        </p>
      </div>
    </div>
  );
}
