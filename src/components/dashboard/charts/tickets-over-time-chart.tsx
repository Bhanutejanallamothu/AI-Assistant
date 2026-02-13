'use client';

import {
  Area,
  AreaChart,
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
import { format, parseISO, startOfMonth } from 'date-fns';

const ticketsByMonth = tickets.reduce((acc, ticket) => {
    const month = format(startOfMonth(parseISO(ticket.createdAt)), 'MMM yyyy');
    acc[month] = (acc[month] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

const chartData = Object.entries(ticketsByMonth)
    .map(([month, count]) => ({ month, count }))
    .sort((a,b) => new Date(a.month).getTime() - new Date(b.month).getTime());

export function TicketsOverTimeChart() {
  return (
    <ChartContainer config={{}} className="h-80 w-full">
      <ResponsiveContainer>
        <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} cursor={false} />
          <defs>
            <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="count"
            stroke="var(--color-primary)"
            fillOpacity={1} 
            fill="url(#fillGradient)"
            name="Tickets"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
