'use client';

import { TicketDataTable } from '@/components/dashboard/ticket-data-table';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { tickets } from '@/lib/data';
import { Archive, CheckCircle, Clock, Ticket } from 'lucide-react';

const openTickets = tickets.filter((t) => t.status === 'Open').length;
const inProgressTickets = tickets.filter((t) => t.status === 'In-Progress').length;
const resolvedTickets = tickets.filter((t) => t.status === 'Resolved').length;

const overviewCards = [
  {
    title: 'Total Tickets',
    value: tickets.length.toString(),
    icon: <Ticket className="h-6 w-6" />,
    change: '+5 today',
  },
  {
    title: 'Open',
    value: openTickets.toString(),
    icon: <Archive className="h-6 w-6" />,
    change: '+2 today',
  },
  {
    title: 'In-Progress',
    value: inProgressTickets.toString(),
    icon: <Clock className="h-6 w-6" />,
    change: 'no change',
  },
  {
    title: 'Resolved',
    value: resolvedTickets.toString(),
    icon: <CheckCircle className="h-6 w-6" />,
    change: '+1 today',
  },
];

export default function AllTicketsPage() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">All Tickets</h1>
        <p className="text-muted-foreground mt-1">Manage, filter, and assign all support tickets.</p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {overviewCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {card.icon}
                </div>
                <div>
                    <p className="text-3xl font-bold">{card.value}</p>
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{card.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <TicketDataTable tickets={tickets} />
        </CardContent>
      </Card>
    </div>
  );
}
