'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { tickets } from '@/lib/data';

const categoryCounts = tickets.reduce((acc, ticket) => {
  acc[ticket.category] = (acc[ticket.category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
  category,
  count,
}));

export function TicketsByCategoryChart() {
  return (
    <ChartContainer config={{}} className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} cursor={false} />
          <Bar
            dataKey="count"
            fill="var(--color-primary)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
