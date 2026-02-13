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
  AlertCircle,
  CheckCircle,
  Zap,
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
import { TicketPriority, TicketStatus } from '@/lib/types';

const priorityStyles: Record<TicketPriority, string> = {
  Low: 'bg-chart-1/15 text-chart-1 border-transparent',
  Medium: 'bg-chart-3/15 text-chart-3 border-transparent',
  High: 'bg-chart-4/15 text-chart-4 border-transparent',
  Urgent: 'bg-destructive/15 text-destructive border-transparent',
};

const statusStyles: Record<TicketStatus, string> = {
    Open: 'bg-muted/70 text-muted-foreground border-transparent',
    Assigned: 'bg-chart-2/15 text-chart-2 border-transparent',
    'In-Progress': 'bg-chart-5/15 text-chart-5 border-transparent',
    Resolved: 'bg-chart-1/15 text-chart-1 border-transparent',
    Closed: 'bg-secondary text-secondary-foreground border-transparent',
};

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const ticket = tickets.find((t) => t.id === params.id);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="grid flex-1 items-start gap-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-6 md:gap-8 lg:col-span-2">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" className="h-9 w-9" asChild>
            <Link href="/dashboard/tickets">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Ticket ID: {ticket.id}</p>
            <h1 className="text-2xl font-bold tracking-tight sm:grow-0 font-headline">
                {ticket.title}
            </h1>
          </div>
          <Badge className={cn('ml-auto sm:ml-0 capitalize', statusStyles[ticket.status])}>
            {ticket.status}
          </Badge>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5 text-sm"><AlertCircle className="h-4 w-4" /> Priority</CardDescription>
              <CardTitle className="text-xl">
                <Badge className={cn('text-base border-transparent capitalize', priorityStyles[ticket.priority])}>{ticket.priority}</Badge>
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5 text-sm"><Wrench className="h-4 w-4" /> Category</CardDescription>
              <CardTitle className="text-xl">{ticket.category}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5 text-sm"><Calendar className="h-4 w-4" /> Created</CardDescription>
              <CardTitle className="text-xl">
                {format(parseISO(ticket.createdAt), 'MMM d, yyyy')}
              </CardTitle>
            </CardHeader>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-1.5 text-sm"><Clock className="h-4 w-4" /> Last Updated</CardDescription>
              <CardTitle className="text-xl">
                {format(parseISO(ticket.updatedAt), 'MMM d, yyyy')}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Ticket Details</CardTitle>
            </CardHeader>
            <CardContent className="text-base prose prose-sm max-w-none text-foreground prose-p:text-muted-foreground">
                <p>{ticket.description}</p>
            </CardContent>
        </Card>
        {ticket.aiSummary && (
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                        <Zap className="h-5 w-5" />
                        AI Summary & Suggestions
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold text-foreground">Summary</h3>
                        <p className="text-sm text-muted-foreground">{ticket.aiSummary}</p>
                    </div>
                    {ticket.aiSuggestedFix && (
                        <div>
                            <h3 className="font-semibold text-foreground">Suggested Fix</h3>
                            <div className="text-sm text-muted-foreground whitespace-pre-line prose prose-sm">{ticket.aiSuggestedFix}</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
      </div>
      <div className="grid auto-rows-max items-start gap-6 md:gap-8">
        <Card>
          <CardHeader className="flex flex-row items-start">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Customer
              </CardTitle>
              <CardDescription>{ticket.customer.name}</CardDescription>
            </div>
            <div className="ml-auto">
                <Avatar>
                    <AvatarImage src={ticket.customer.avatar} alt={ticket.customer.name} />
                    <AvatarFallback>{ticket.customer.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                </Avatar>
            </div>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Location</span>
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
                     <div className="ml-auto">
                        <Avatar>
                            <AvatarImage src={ticket.technician.avatar} alt={ticket.technician.name} />
                            <AvatarFallback>{ticket.technician.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
                        </Avatar>
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
