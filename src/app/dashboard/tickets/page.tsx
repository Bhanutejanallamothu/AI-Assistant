'use client';

import { TicketDataTable } from '@/components/dashboard/ticket-data-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { tickets } from '@/lib/data';
import { Archive, CheckCircle, Clock, PlusCircle, Ticket, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const openTickets = tickets.filter((t) => t.status === 'Open').length;
const inProgressTickets = tickets.filter((t) => t.status === 'In-Progress').length;
const resolvedTickets = tickets.filter((t) => t.status === 'Resolved').length;

const overviewCards = [
  {
    title: 'Total Tickets',
    value: tickets.length,
    icon: <Ticket className="h-5 w-5" />,
    change: '+5 from yesterday',
    changeType: 'increase',
  },
  {
    title: 'Open',
    value: openTickets,
    icon: <Archive className="h-5 w-5" />,
    change: '+2 from yesterday',
    changeType: 'increase',
  },
  {
    title: 'In-Progress',
    value: inProgressTickets,
    icon: <Clock className="h-5 w-5" />,
    change: 'no change',
    changeType: 'neutral',
  },
  {
    title: 'Resolved',
    value: resolvedTickets,
    icon: <CheckCircle className="h-5 w-5" />,
    change: '-1 from yesterday',
    changeType: 'decrease',
  },
];

export default function AllTicketsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">All Tickets</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

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
          <CardTitle>Ticket Queue</CardTitle>
          <CardDescription>
            Manage, filter, and assign all support tickets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TicketDataTable tickets={tickets} />
        </CardContent>
      </Card>
    </div>
  );
}
