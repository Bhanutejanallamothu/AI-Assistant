'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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

const categoryColors: Record<string, string> = {
    'Network': 'hsl(var(--chart-2))',
    'Account': 'hsl(var(--chart-1))',
    'Hardware': 'hsl(var(--chart-3))',
    'Software': 'hsl(var(--chart-4))',
    'Installation': 'hsl(var(--chart-5))',
    'Performance': 'hsl(var(--chart-3))',
    'Security': 'hsl(var(--chart-4))',
    'Billing': 'hsl(var(--chart-1))',
    'Other': 'hsl(var(--muted-foreground))'
};

export function TicketsByCategoryChart() {
  return (
    <ChartContainer config={{}} className="h-full w-full">
      <ResponsiveContainer>
        <BarChart 
            data={chartData} 
            margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
            layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <YAxis 
            dataKey="category" 
            type="category"
            tickLine={false} 
            axisLine={false} 
            tickMargin={8} 
            width={80}
            />
          <XAxis type="number" hide />
          <Tooltip 
            content={<ChartTooltipContent />} 
            cursor={{ fill: 'hsl(var(--accent))', radius: 4 }} 
          />
          <Bar
            dataKey="count"
            radius={[0, 4, 4, 0]}
            layout="vertical"
          >
             {chartData.map((entry) => (
                <Cell key={`cell-${entry.category}`} fill={categoryColors[entry.category] ?? 'hsl(var(--muted))'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
