"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { month: "Jan", applications: 42 },
  { month: "Feb", applications: 58 },
  { month: "Mar", applications: 35 },
  { month: "Apr", applications: 76 },
  { month: "May", applications: 64 },
  { month: "Jun", applications: 91 },
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type ApplicationsChartProps = {
  data?: typeof chartData;
  title?: string;
  description?: string;
};

export default function ApplicationsChart({
  data = chartData,
  title = "Applications Overview",
  description = "Monthly job applications received",
}: ApplicationsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[280px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{ left: -20, right: 8 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar
              dataKey="applications"
              fill="var(--color-applications)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
