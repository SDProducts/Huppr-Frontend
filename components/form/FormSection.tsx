import { ReactNode } from "react";

interface Prop {
  title: string;
  description: string;
  icon?: ReactNode;
  children: ReactNode;
}
export default function FormSection({
  title,
  description,
  icon,
  children,
}: Prop) {
  return (
    <div className="bg-white p-6 rounded-xl space-y-6">
      <div className="flex gap-2 items-start">
        <div className="">{icon}</div>
        <div className="flex-1">
          <div className="font-extrabold text-lg">{title}</div>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
