"use client";
import Button from "@/components/ui/CustomButton";
import { useOnboarding } from "@/context/onboarding.state";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  ChartNoAxesCombined,
  Code,
  HelpCircle,
  LucideGavel,
  Megaphone,
  Package,
  Palette,
  PlusCircle,
  Settings,
  Users2,
} from "lucide-react";

const DepartmentsSelect = () => {
  const { step, setStep } = useOnboarding();
  const departmnts = [
    {
      name: "Human Resources",
      icon: Users2,
    },
    {
      name: "Finance",
      icon: Banknote,
    },
    {
      name: "Sales",
      icon: ChartNoAxesCombined,
    },
    {
      name: "Marketing",
      icon: Megaphone,
    },
    {
      name: "Operations",
      icon: Settings,
    },
    {
      name: "Customer Support",
      icon: HelpCircle,
    },
    {
      name: "Engineering",
      icon: Code,
    },
    {
      name: "Product",
      icon: Package,
    },
    {
      name: "Design",
      icon: Palette,
    },
    {
      name: "Legal",
      icon: LucideGavel,
    },
    {
      name: "Administration",
      icon: Code,
    },
  ];
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold">Set up your departments</h2>
        <p className="text-sm">
          Select the departments currently active in your workspace. You can
          always add more later.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {departmnts.map((dept, i) => (
          <div
            className="border rounded-md bg-gray-200 group hover:bg-primary/70 hover:text-white overflow-hidden border-gray-300 flex flex-col cursor-pointer"
            key={i}
          >
            <div className="h-28 w-full flex justify-center items-center">
              <dept.icon size={50} />
            </div>
            <div className="bg-white text-xs p-2 text-center group-hover:bg-transparent group-hover:text-white">
              {dept.name}
            </div>
          </div>
        ))}
        <div className="border rounded-md bg-gray-200 group hover:bg-primary/70 hover:text-white overflow-hidden border-gray-300 flex flex-col cursor-pointer">
          <div className="h-28 w-full flex justify-center items-center">
            <PlusCircle size={50} />
          </div>
          <div className="bg-white text-xs p-2 text-center group-hover:bg-transparent group-hover:text-white">
            {"Custom Dept"}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center text-sm py-4 border-t border-gray-300">
        <Button
          onClick={() => setStep(step - 1)}
          label="Back"
          icon={<ArrowLeft />}
          className="w-fit! px-5 rounded-full! bg-transparent text-black!"
        />
        <Button
          label="Continue"
          onClick={() => setStep(step + 1)}
          rightIcon={<ArrowRight />}
          className="w-fit! px-5 rounded-full!"
        />
      </div>
    </div>
  );
};

export default DepartmentsSelect;
