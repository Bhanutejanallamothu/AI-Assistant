import Link from 'next/link';
import {
  ChevronLeft,
  Copy,
  CreditCard,
  File,
  MoreVertical,
  Truck,
  User,
  MapPin,
  Clock,
  Calendar,
  Wrench,
  MessageSquare,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { tickets } from '@/lib/data';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { AiChatPanel } from '@/components/tickets/ai-chat-panel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const priorityStyles = {
    Low: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    High: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
    Urgent: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

const statusStyles = {
    Open: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
    Assigned: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    'In-Progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
    Resolved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    Closed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = tickets.find((t) => t.id === params.id);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-7 w-7" asChild>
            <Link href="/dashboard/tickets">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 font-headline">
            {ticket.title}
          </h1>
          <Badge variant="outline" className={cn('ml-auto sm:ml-0 border-transparent', statusStyles[ticket.status])}>
            {ticket.status}
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Assign Technician
            </Button>
            <Button size="sm">Update Status</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Priority</CardDescription>
              <CardTitle className="text-2xl">
                <Badge variant="outline" className={cn('text-base border-transparent', priorityStyles[ticket.priority])}>{ticket.priority}</Badge>
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Category</CardDescription>
              <CardTitle className="text-2xl">{ticket.category}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Created Date</CardDescription>
              <CardTitle className="text-2xl">
                {format(parseISO(ticket.createdAt), 'MMM d, yyyy')}
              </CardTitle>
            </CardHeader>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardDescription>Last Updated</CardDescription>
              <CardTitle className="text-2xl">
                {format(parseISO(ticket.updatedAt), 'MMM d, yyyy')}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
                <p>{ticket.description}</p>
            </CardContent>
        </Card>
        {ticket.aiSummary && (
            <Card>
                <CardHeader>
                    <CardTitle>AI Summary & Suggestions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold">Summary</h3>
                        <p className="text-sm text-muted-foreground">{ticket.aiSummary}</p>
                    </div>
                    {ticket.aiSuggestedFix && (
                        <div>
                            <h3 className="font-semibold">Suggested Fix</h3>
                            <div className="text-sm text-muted-foreground whitespace-pre-line">{ticket.aiSuggestedFix}</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <Card>
          <CardHeader className="flex flex-row items-start">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Customer
              </CardTitle>
              <CardDescription>{ticket.customer.name}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span>Location</span>
                <span className="font-medium flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> {ticket.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {ticket.technician && (
             <Card>
                <CardHeader className="flex flex-row items-start">
                    <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        <Wrench className="h-5 w-5" />
                        Assigned Technician
                    </CardTitle>
                    <CardDescription>{ticket.technician.name}</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        )}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    AI Troubleshooting Assistant
                </CardTitle>
            </CardHeader>
            <CardContent>
                <AiChatPanel ticketId={ticket.id} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
