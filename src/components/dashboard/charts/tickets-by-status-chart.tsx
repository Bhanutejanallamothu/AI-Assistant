'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Cell, Legend } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { tickets } from '@/lib/data';

const statusCounts = tickets.reduce((acc, ticket) => {
  acc[ticket.status] = (acc[ticket.status] || 0) + 1;
  return acc;
}, {} as Record<string, number>);


const chartData = Object.entries(statusCounts).map(([status, count]) => ({
  name: status,
  value: count,
}));

const COLORS = [
    'hsl(var(--chart-2))', 
    'hsl(var(--chart-5))', 
    'hsl(var(--chart-1))', 
    'hsl(var(--muted))',
    'hsl(var(--chart-3))'
];

export function TicketsByStatusChart() {

  const totalTickets = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <ChartContainer
      config={{}}
      className="mx-auto aspect-square h-full"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          strokeWidth={2}
          labelLine={false}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
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
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalTickets.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="fill-muted-foreground"
                    >
                      Tickets
                    </tspan>
                  </text>
                )
              }
            }}
          />
           {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right" 
            iconSize={10}
            iconType="circle"
        />
      </PieChart>
    </ChartContainer>
  );
}
