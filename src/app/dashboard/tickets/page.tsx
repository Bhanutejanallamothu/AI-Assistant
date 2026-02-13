'use client';

import { TicketDataTable } from '@/components/dashboard/ticket-data-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tickets } from '@/lib/data';
import { Archive, CheckCircle, Clock, PlusCircle, Ticket } from 'lucide-react';

const overviewCards = [
  {
    title: 'Total Tickets',
    value: tickets.length,
    icon: <Ticket className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Open',
    value: tickets.filter((t) => t.status === 'Open').length,
    icon: <Archive className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'In-Progress',
    value: tickets.filter((t) => t.status === 'In-Progress').length,
    icon: <Clock className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: 'Resolved',
    value: tickets.filter((t) => t.status === 'Resolved').length,
    icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
  },
];

export default function AllTicketsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline">All Tickets</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
      </div>

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
        <CardContent className="pt-6">
          <TicketDataTable tickets={tickets} />
        </CardContent>
      </Card>
    </div>
  );
}
