'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

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

const chartData = Object.entries(statusCounts).map(([status, count], index) => ({
  status,
  count,
  fill: `var(--color-chart-${(index % 5) + 1})`,
}));

const totalTickets = tickets.length;

export function TicketsByStatusChart() {
  const id = 'pie-interactive';
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = React.useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <ChartContainer
      config={{}}
      id={id}
      className="mx-auto aspect-square h-64"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="count"
          nameKey="status"
          innerRadius={50}
          strokeWidth={5}
          activeIndex={activeIndex}
          activeShape={(props) => {
            const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
            return (
              <g>
                <text x={cx} y={cy} dy={-4} textAnchor="middle" fill={fill} className="text-2xl font-bold" >
                  {props.payload.count}
                </text>
                 <text x={cx} y={cy} dy={16} textAnchor="middle" fill="hsl(var(--muted-foreground))" className="text-sm">
                  {props.payload.status}
                </text>
                <Sector
                  cx={cx}
                  cy={cy}
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  fill={fill}
                  stroke={fill}
                />
              </g>
            )
          }}
          onMouseEnter={onPieEnter}
        >
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
