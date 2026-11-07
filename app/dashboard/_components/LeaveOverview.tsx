"use client";

interface LeaveOverviewProps {
  pending?: number;
  approved?: number;
  awayToday?: number;
  onManageRequests?: () => void;
}

export default function LeaveOverview({
  pending = 3,
  approved = 8,
  awayToday = 4,
  onManageRequests,
}: LeaveOverviewProps) {
  const stats = [
    {
      label: "PENDING",
      value: pending,
      valueClass: "text-[#d97706]",
    },
    {
      label: "APPROVED",
      value: approved,
      valueClass: "text-[#0b9f4d]",
    },
    {
      label: "AWAY TODAY",
      value: awayToday,
      valueClass: "text-[#2864e8]",
    },
  ];

  return (
    <section className="w-full rounded-[28px] border border-[#dfe3e8] bg-white px-7 py-7">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="text-[21px] font-extrabold tracking-[-0.02em] text-[#171a1f]">
          Leave Overview
        </h2>

        <button
          type="button"
          onClick={onManageRequests}
          className="text-[15px] font-bold text-[#2864e8] transition-colors hover:text-[#1749b5]"
        >
          Manage Requests
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex h-[102px] flex-col justify-center rounded-[20px] border border-[#dce1e7] bg-[#f4f5f7] px-5"
          >
            <span
              className={`text-[27px] font-extrabold leading-none ${stat.valueClass}`}
            >
              {stat.value}
            </span>

            <span className="mt-2 text-[12px] font-extrabold tracking-[-0.01em] text-[#596474]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
