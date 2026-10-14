"use client";

import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import React from "react";
interface ChartData {
  value: string | number;
  name: string;
  fill: string;
}
interface Prop {
  data: ChartData[];
  label?: string;
  labelValue?: string;
}

const chartConfig = {
  value: { label: "Tasks" },
  Skill: { label: "Skill", color: "var(--chart-1)" },
  pending: { label: "Pending", color: "var(--chart-2)" },
  cancelled: { label: "Cancelled", color: "var(--chart-3)" },
  inProgress: { label: "In Progress", color: "var(--chart-4)" },
} satisfies ChartConfig;
export const PieChartComponent: React.FC<Prop> = ({
  data,
  label,
  labelValue,
}) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[300px]"
    >
      <PieChart>
        <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={80}
          strokeWidth={2}
          // label={}
        >
          {/* {data.map((item) => (
            <Cell key={item.name} />
          ))} */}
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {labelValue}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 22}
                      className="fill-muted-foreground text-xs"
                    >
                      {label}
                    </tspan>
                  </text>
                );
              }

              return null;
            }}
          />{" "}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};
