import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tickets } from '@/lib/data';
import { TicketDataTable } from './ticket-data-table';
import { Archive, CheckCircle, Clock, Send } from 'lucide-react';

const overviewCards = [
  {
    title: 'Open Tickets',
    value: tickets.filter((t) => t.status === 'Open').length,
    icon: <Archive className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Assigned Tickets',
    value: tickets.filter((t) => t.status === 'Assigned').length,
    icon: <Send className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'In-Progress Tickets',
    value: tickets.filter((t) => t.status === 'In-Progress').length,
    icon: <Clock className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Resolved Today',
    value: tickets.filter((t) => t.status === 'Resolved').length,
    icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
  },
];

export default function AgentDashboard() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
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
