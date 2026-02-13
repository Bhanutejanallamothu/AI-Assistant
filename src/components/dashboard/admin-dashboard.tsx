import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AreaChart, Users, Wrench, BarChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { TicketDataTable } from './ticket-data-table';
import { tickets, users } from '@/lib/data';
import { TicketsByCategoryChart } from './charts/tickets-by-category-chart';
import { TicketsByStatusChart } from './charts/tickets-by-status-chart';
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
    change: '+15.2%',
    changeType: 'increase',
    icon: <AreaChart className="h-5 w-5" />,
  },
  {
    title: 'Avg. Resolution Time',
    value: `${avgResolutionTime} hrs`,
    change: '-3.1%',
    changeType: 'decrease',
    icon: <Wrench className="h-5 w-5" />,
  },
  {
    title: 'Active Technicians',
    value: activeTechnicians.toString(),
    change: '+2 from last month',
    changeType: 'increase',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Customer Satisfaction',
    value: '92%',
    change: '+1.8%',
    changeType: 'increase',
    icon: <BarChart className="h-5 w-5" />,
  },
];


export default function AdminDashboard() {
  return (
    <div className="grid gap-6 md:gap-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {analyticsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        {card.icon}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{card.value}</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  {card.changeType === 'increase' ? 
                    <ArrowUpRight className="h-4 w-4 text-green-500" /> : 
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  }
                  <span className={card.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
                    {card.change.startsWith('+') || card.change.startsWith('-') ? card.change.substring(1) : card.change}
                  </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Tickets by Category</CardTitle>
            <CardDescription>Breakdown of tickets across different categories.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2 h-80">
            <TicketsByCategoryChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Tickets by Status</CardTitle>
            <CardDescription>Current status distribution of all tickets.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
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
