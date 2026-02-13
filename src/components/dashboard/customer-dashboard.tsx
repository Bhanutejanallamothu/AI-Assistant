import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tickets, users } from '@/lib/data';
import { TicketDataTable } from './ticket-data-table';
import { Bot, PlusCircle } from 'lucide-react';

export default function CustomerDashboard() {
  const customerId = users.find(u => u.role === 'Customer')?.id;
  const customerTickets = tickets.filter(t => t.customer.id === customerId);

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight font-headline">My Support Requests</h2>
            <div className="flex items-center gap-2">
                <Button variant="outline">
                    <Bot className="mr-2 h-4 w-4" />
                    Chat with AI Assistant
                </Button>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Request
                </Button>
            </div>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>My Tickets</CardTitle>
          <CardDescription>
            Here are all the support requests you have submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TicketDataTable tickets={customerTickets} />
        </CardContent>
      </Card>
    </div>
  );
}
