import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import Button from "@/components/ui/CustomButton";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Box,
  Bug,
  ChartLine,
  Code2,
  MoreVertical,
  Palette,
  Server,
  ShieldCheck,
} from "lucide-react";

const RoleDirectoryList = () => {
  const roleDir = [
    {
      name: "Senior Backend Engineer",
      tier: 4,
      positions: 5,
      role_type: "Remote/US",
      status: "filled",
      staffs: ["SM", "PG", "OT", "LK", "NJ"],
    },
    {
      name: "Frontend Engineer",
      tier: 5,
      positions: 2,
      role_type: "Remote/US",
      status: "open",
      staffs: ["SM", "PG"],
    },
    {
      name: "DevOps Lead",
      tier: 4,
      positions: 5,
      role_type: "NYC/Hybrid",
      status: "open",
      staffs: ["SM", "PG", "OT", "LK", "NJ"],
    },
  ];
  return (
    <div className="space-y-2">
      {roleDir.map((item, i) => (
        <div
          className="flex items-center gap-2 bg-white p-4 rounded-lg"
          key={i}
        >
          <div className="grid grid-cols-[3fr_1fr_1fr_2fr] flex-1">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 flex items-center justify-center bg-primary-100 rounded-md">
                <Code2 />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm">
                  {item.role_type} ◾ tier {item.tier}
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold">Positions</div>
              <div className="">{item.positions}</div>
            </div>
            <div className="bg-green-100 text-green-500 h-fit w-fit text-sm px-3 py-0.5 rounded-2xl">
              {item.status}
            </div>
            <div className="">
              <AvatarGroup>
                {item.staffs.map((staff) => (
                  <Avatar key={staff} className={cn("bg-white")}>
                    <AvatarFallback>{staff}</AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
          </div>
          <MoreVertical />
        </div>
      ))}
    </div>
  );
};

export default RoleDirectoryList;

export const SubteamsList = () => {
  const SUBTEAMS = [
    {
      icon: Server,
      name: "Core Infrastructure",
      desc: "Server health, db optimization",
      capacity: "68/80",
      percentage: 84,
    },
    {
      icon: Palette,
      name: "Design",
      desc: "Server health, db optimization",
      capacity: "68/80",
      percentage: 84,
    },
    {
      icon: Box,
      name: "Product Engineering",
      desc: "Server health, db optimization",
      capacity: "68/80",
      percentage: 84,
    },
    {
      icon: ChartLine,
      name: "Data Science",
      desc: "Server health, db optimization",
      capacity: "68/80",
      percentage: 84,
    },
    {
      icon: Bug,
      name: "QA & Testing",
      desc: "Server health, db optimization",
      capacity: "68/80",
      percentage: 84,
    },
    {
      icon: ShieldCheck,
      name: "Security",
      desc: "Server health, db optimization",
      capacity: "68/80",
      percentage: 84,
    },
  ];
  return (
    <div className="">
      <div className="grid grid-cols-3 gap-2">
        {SUBTEAMS.map((team, i) => (
          <div
            className="border border-gray-200 rounded-md bg-white p-4 space-y-4"
            key={i}
          >
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gray-200 rounded-md flex justify-center items-center">
                <team.icon className="h-5 w-5" />
              </div>
              <div className="">
                <div className="font-semibold">{team.name}</div>
                <div className="text-sm">{team.desc}</div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <div className="">Capacity({team.capacity})</div>
                <div className="text-right">{team.percentage}%</div>
              </div>
              <Progress value={team.percentage} indicatorClassName="" />
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <div className="">
                <AvatarGroup className="grayscale -space-x-4">
                  <Avatar className={cn("bg-white")}>
                    <AvatarFallback className="text-gray-800">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className={cn("bg-white")}>
                    <AvatarFallback className="text-gray-800">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className={cn("bg-white")}>
                    <AvatarFallback className="text-gray-800">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className={cn("bg-white")}>
                    <AvatarFallback className="text-gray-800">
                      +20
                    </AvatarFallback>
                  </Avatar>
                </AvatarGroup>
              </div>
              <Button
                label="View"
                rightIcon={<ArrowRight size={16} />}
                className="bg-transparent text-gray-700! w-fit!"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
