import { LucideIcon } from "lucide-react";
import React from "react";
interface Prop {
  title: string;
  value: string | number;
  icon: LucideIcon;
  extra?: React.ReactNode;
}
const SubteamMetricCard: React.FC<Prop> = ({
  title,
  icon: Icon,
  value,
  extra,
}) => {
  return (
    <div className="p-4 sm:p-10 bg-white rounded-md space-y-3 hover:bg-primary/80 hover:text-white cursor-pointer group">
      <div className="flex items-center gap-1">
        <div className="h-7 w-7 bg-primary/5 text-primary rounded-sm flex justify-center items-center group-hover:bg-primary-100">
          <Icon className="h-4 w-4" />
        </div>
        <div className="">{title}</div>
      </div>
      <div className="text-2xl sm:text-5xl font-extrabold">{value}</div>
      {extra}
    </div>
  );
};

export default SubteamMetricCard;
