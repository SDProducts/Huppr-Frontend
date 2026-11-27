/* eslint-disable react/no-unescaped-entities */

import Button from "@/components/ui/CustomButton";
import { BriefcaseBusiness, Clock, User2, Video } from "lucide-react";

const ScheduledInterviewModal = () => {
  const interviews = [
    {
      name: "Sarah Jenkins",
      role: "Senior Product Designer",
      time: "10:00 AM",
    },
    { name: "Micheal Chang", role: "Frontend Developer", time: "2:30 PM" },
  ];
  return (
    <div className="space-y-10 px-4">
      <div className="space-y-2">
        <div className="text-xl font-bold">Today's Interviews</div>
        <div className="">
          you have {interviews.length} scheduled interviews remaining today.
        </div>
      </div>
      <div className="space-y-4">
        {interviews.map((interview, i) => (
          <div
            className="flex justify-between items-center border rounded-lg border-gray-200 p-4"
            key={i}
          >
            <div className="flex items-start gap-2">
              <div className="h-10 w-10 rounded-full flex justify-center items-center bg-blue-100 text-primary">
                <User2 />
              </div>
              <div className="">
                <div className="font-semibold text-lg">{interview.name}</div>
                <div className="flex items-center gap-0.5 text-gray-700">
                  <BriefcaseBusiness size={13} />
                  <div className="flex-1">{interview.role}</div>
                </div>
              </div>
            </div>
            <div className="text-right flex flex-col items-end gap-2">
              <div
                className={`${
                  i === 0
                    ? "bg-blue-100 text-primary"
                    : "bg-gray-200 text-gray-500"
                } px-4 py-1 rounded-full text-sm text-right flex items-center gap-1`}
              >
                <Clock size={12} />
                <div className="flex-1">
                  {i === 0
                    ? `In 15 mins ${interview.time}`
                    : `${interview.time}`}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Button
                  label="Details"
                  className="bg-primary/10 text-primary!"
                />
                <Button label="Join" icon={<Video size={16} />} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* push to main */}

      <div className="flex justify-end">
        <Button
          label="View Full Schedule"
          className="bg-transparent text-primary! w-fit! py-5"
        />
      </div>
    </div>
  );
};

export default ScheduledInterviewModal;
