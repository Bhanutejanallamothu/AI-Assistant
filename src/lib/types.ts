import { type LucideIcon } from 'lucide-react';

export type UserRole = 'Admin' | 'Support Agent' | 'Field Technician' | 'Customer';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
};

export type TicketStatus = 'Open' | 'Assigned' | 'In-Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type Ticket = {
  id: string;
  title: string;
  description: string;
  customer: Pick<User, 'id' | 'name' | 'avatar'>;
  technician?: Pick<User, 'id' | 'name' | 'avatar'>;
  category: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  aiSummary?: string;
  aiSuggestedFix?: string;
  location?: string;
  resolutionDate?: string;
};

export type Message = {
    id: string;
    ticketId: string;
    sender: Pick<User, 'id' | 'name' | 'avatar'>;
    content: string;
    timestamp: string;
    isBot: boolean;
};

export type ServiceReport = {
    id: string;
    ticketId: string;
    technician: Pick<User, 'id' | 'name'>;
    summary: string;
    partsUsed: string[];
    images: string[];
    customerSignature?: string;
    createdAt: string;
};

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
};
