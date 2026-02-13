import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tickets } from '@/lib/data';
import { TicketDataTable } from './ticket-data-table';
import { Archive, CheckCircle, Clock, Send, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const openTickets = tickets.filter((t) => t.status === 'Open').length;
const assignedTickets = tickets.filter((t) => t.status === 'Assigned').length;
const inProgressTickets = tickets.filter((t) => t.status === 'In-Progress').length;
const resolvedToday = tickets.filter((t) => t.status === 'Resolved').length; // Simplified for demo


const overviewCards = [
  {
    title: 'Open Tickets',
    value: openTickets.toString(),
    icon: <Archive className="h-5 w-5" />,
    change: '+5 new',
    changeType: 'increase',
  },
  {
    title: 'Assigned Tickets',
    value: assignedTickets.toString(),
    icon: <Send className="h-5 w-5" />,
    change: '3 unassigned',
    changeType: 'neutral',
  },
  {
    title: 'In-Progress',
    value: inProgressTickets.toString(),
    icon: <Clock className="h-5 w-5" />,
    change: '-1 from yesterday',
    changeType: 'decrease',
  },
  {
    title: 'Resolved Today',
    value: resolvedToday.toString(),
    icon: <CheckCircle className="h-5 w-5" />,
    change: '+10.5%',
    changeType: 'increase',
  },
];

export default function AgentDashboard() {
  return (
    <div className="grid auto-rows-max items-start gap-6 md:gap-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => (
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
                   {card.changeType === 'increase' && <ArrowUpRight className="h-4 w-4 text-green-500" /> }
                  {card.changeType === 'decrease' && <ArrowDownRight className="h-4 w-4 text-red-500" /> }
                  <span className={card.changeType === 'increase' ? 'text-green-500' : card.changeType === 'decrease' ? 'text-red-500' : ''}>
                    {card.change}
                  </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>
            Manage and assign all support tickets from here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TicketDataTable tickets={tickets} />
        </CardContent>
      </Card>
    </div>
  );
}
