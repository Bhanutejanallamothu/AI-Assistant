import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { tickets, users } from '@/lib/data';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { MapPin, Play, Check, Navigation } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { TicketPriority } from '@/lib/types';

export default function TechnicianDashboard() {
  const technicianId = users.find(u => u.role === 'Field Technician')?.id;
  const technicianJobs = tickets.filter(t => t.technician?.id === technicianId && (t.status === 'Assigned' || t.status === 'In-Progress'));

  const priorityStyles: Record<TicketPriority, string> = {
    Low: 'bg-chart-1/15 text-chart-1 border-transparent',
    Medium: 'bg-chart-3/15 text-chart-3 border-transparent',
    High: 'bg-chart-4/15 text-chart-4 border-transparent',
    Urgent: 'bg-destructive/15 text-destructive border-transparent',
  };

  return (
    <div className="grid auto-rows-max items-start gap-6 md:gap-8">
        <h2 className="text-xl font-bold tracking-tight font-headline">My Assigned Jobs</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {technicianJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Link href={`/dashboard/tickets/${job.id}`} className="font-semibold hover:underline">{job.id}</Link>
                <Badge
                  className={cn(
                    'border-transparent capitalize',
                    priorityStyles[job.priority]
                  )}
                >
                  {job.priority}
                </Badge>
              </div>
              <CardTitle className="pt-2 text-xl">{job.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 pt-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={job.customer.avatar} alt={job.customer.name} />
                        <AvatarFallback>{job.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{job.customer.name}</p>
                        <p className="text-sm text-muted-foreground">Customer</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/tickets/${job.id}`}>View Details</Link>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Navigation className="h-4 w-4" />
                </Button>
                {job.status === 'Assigned' && (
                    <Button size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Start Work
                    </Button>
                )}
                {job.status === 'In-Progress' && (
                    <Button size="sm" variant="secondary">
                        <Check className="mr-2 h-4 w-4" />
                        Complete Job
                    </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
