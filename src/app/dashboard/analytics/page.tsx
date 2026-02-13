'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AreaChart, BarChart, Users, Wrench } from 'lucide-react';
import { TicketsByCategoryChart } from '@/components/dashboard/charts/tickets-by-category-chart';
import { TicketsByStatusChart } from '@/components/dashboard/charts/tickets-by-status-chart';
import { TicketsOverTimeChart } from '@/components/dashboard/charts/tickets-over-time-chart';
import { tickets } from '@/lib/data';
import { differenceInHours, parseISO } from 'date-fns';

const totalTickets = tickets.length;
const resolvedTickets = tickets.filter(t => t.status === 'Resolved' && t.resolutionDate);

const avgResolutionTime = resolvedTickets.length > 0 
    ? (resolvedTickets.reduce((acc, t) => {
        if (!t.resolutionDate) return acc;
        const resolutionTime = differenceInHours(parseISO(t.resolutionDate), parseISO(t.createdAt));
        return acc + resolutionTime;
    }, 0) / resolvedTickets.length).toFixed(1)
    : '0';

const activeTechnicians = new Set(tickets.map(t => t.technician?.id).filter(Boolean)).size;

const analyticsCards = [
  {
    title: 'Total Tickets',
    value: totalTickets.toString(),
    change: '+15.2% from last month',
    icon: <AreaChart className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Avg. Resolution Time',
    value: `${avgResolutionTime} hours`,
    change: '-3.1% from last month',
    icon: <Wrench className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Active Technicians',
    value: activeTechnicians.toString(),
    change: '+2 from last month',
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Customer Satisfaction',
    value: '92%',
    change: '+1.8% from last month',
    icon: <BarChart className="h-4 w-4 text-muted-foreground" />,
  },
];


export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight font-headline">Analytics Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Ticket Volume Over Time</CardTitle>
          <CardDescription>A monthly breakdown of new tickets created.</CardDescription>
        </CardHeader>
        <CardContent>
          <TicketsOverTimeChart />
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Tickets by Category</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <TicketsByCategoryChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Tickets by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <TicketsByStatusChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
