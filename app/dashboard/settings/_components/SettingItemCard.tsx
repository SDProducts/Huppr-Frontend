import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
interface Prop {
  item: SettingItem;
}
export default function SettingItemCard({ item }: Prop) {
  return (
    <Link
      href={`/dashboard/settings/${item.path}`}
      className={cn(
        "relative p-4 rounded-md flex gap-4 bg-white group hover:bg-primary/5 hover:shadow-md cursor-pointer"
      )}
    >
      <div className="hidden group-hover:block absolute top-4 right-2 text-slate-400">
        <ChevronRight />
      </div>
      <div
        className={cn(
          "size-10 flex justify-center items-center rounded-md",
          item.className
        )}
      >
        <item.icon className={cn("size-6")} />
      </div>
      <div className="flex-1 space-y-1">
        <div className="text-lg font-bold">{item.name}</div>
        <p className="text-sm">{item.description}</p>
      </div>
    </Link>
  );
}
