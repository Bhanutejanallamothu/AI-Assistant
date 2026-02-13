import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AreaChart, BarChart, Users, Wrench } from 'lucide-react';
import { TicketDataTable } from './ticket-data-table';
import { tickets } from '@/lib/data';
import { TicketsByCategoryChart } from './charts/tickets-by-category-chart';
import { TicketsByStatusChart } from './charts/tickets-by-status-chart';

const analyticsCards = [
  {
    title: 'Total Tickets',
    value: '1,250',
    change: '+15.2% from last month',
    icon: <AreaChart className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Avg. Resolution Time',
    value: '2.5 hours',
    change: '-3.1% from last month',
    icon: <Wrench className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Active Technicians',
    value: '25',
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

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 md:gap-8">
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
      <Card>
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
          <CardDescription>
            An overview of the most recently created or updated tickets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TicketDataTable tickets={tickets.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  );
}
