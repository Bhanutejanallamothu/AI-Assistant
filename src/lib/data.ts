import { type User, type Ticket, type NavLink } from './types';
import {
  LayoutDashboard,
  Ticket as TicketIcon,
  Wrench,
  Settings,
  AreaChart,
  LifeBuoy,
} from 'lucide-react';

export const users: User[] = [
  {
    id: 'USR-001',
    name: 'Admin User',
    email: 'admin@servicepulse.ai',
    avatar: 'https://picsum.photos/seed/1/100/100',
    role: 'Admin',
  },
  {
    id: 'USR-002',
    name: 'Sarah Agent',
    email: 'sarah.agent@servicepulse.ai',
    avatar: 'https://picsum.photos/seed/2/100/100',
    role: 'Support Agent',
  },
  {
    id: 'USR-003',
    name: 'Mike Technician',
    email: 'mike.tech@servicepulse.ai',
    avatar: 'https://picsum.photos/seed/3/100/100',
    role: 'Field Technician',
  },
  {
    id: 'USR-004',
    name: 'John Customer',
    email: 'john.customer@email.com',
    avatar: 'https://picsum.photos/seed/4/100/100',
    role: 'Customer',
  },
  {
    id: 'USR-005',
    name: 'Emily Customer',
    email: 'emily.customer@email.com',
    avatar: 'https://picsum.photos/seed/5/100/100',
    role: 'Customer',
  },
  {
    id: 'USR-006',
    name: 'David Technician',
    email: 'dave.tech@servicepulse.ai',
    avatar: 'https://picsum.photos/seed/6/100/100',
    role: 'Field Technician',
  },
];

export const tickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Internet connection is intermittent',
    description: 'My WiFi keeps dropping every few minutes. I have tried restarting the router but the issue persists. All lights on the router seem to be green.',
    customer: {
      id: 'USR-004',
      name: 'John Customer',
      avatar: 'https://picsum.photos/seed/4/100/100',
    },
    technician: {
      id: 'USR-003',
      name: 'Mike Technician',
      avatar: 'https://picsum.photos/seed/3/100/100',
    },
    category: 'Network',
    status: 'Assigned',
    priority: 'High',
    createdAt: '2024-07-22T10:00:00Z',
    updatedAt: '2024-07-22T11:30:00Z',
    location: '123 Main St, Anytown, USA',
    aiSummary: 'User is experiencing frequent internet disconnects despite router restart. Router lights are green, suggesting a potential signal interference or ISP issue.',
    aiSuggestedFix: '1. Check for physical obstructions around the router.\n2. Change the WiFi channel to avoid interference.\n3. Connect directly to the router with an Ethernet cable to check if the issue is with WiFi only.'
  },
  {
    id: 'TKT-002',
    title: 'Cannot log in to my account',
    description: 'I am unable to log in to my account. I have tried resetting my password, but I am not receiving the reset email.',
    customer: {
      id: 'USR-005',
      name: 'Emily Customer',
      avatar: 'https://picsum.photos/seed/5/100/100',
    },
    category: 'Account',
    status: 'Open',
    priority: 'Medium',
    createdAt: '2024-07-22T09:30:00Z',
    updatedAt: '2024-07-22T09:30:00Z',
    location: 'Remote',
    aiSummary: 'User is locked out of their account and not receiving password reset emails, indicating a possible email delivery problem or incorrect email on file.',
    aiSuggestedFix: '1. Check spam/junk folder for the password reset email.\n2. Verify the email address associated with the account.\n3. Attempt to log in using a different browser or device.'
  },
  {
    id: 'TKT-003',
    title: 'Printer is not working',
    description: 'My office printer is showing an error "Paper Jam" but there is no paper stuck inside. I have checked all trays.',
    customer: {
      id: 'USR-004',
      name: 'John Customer',
      avatar: 'https://picsum.photos/seed/4/100/100',
    },
    technician: {
      id: 'USR-006',
      name: 'David Technician',
      avatar: 'https://picsum.photos/seed/6/100/100',
    },
    category: 'Hardware',
    status: 'In-Progress',
    priority: 'Medium',
    createdAt: '2024-07-21T14:00:00Z',
    updatedAt: '2024-07-22T08:15:00Z',
    location: '456 Oak Ave, Anytown, USA',
    aiSummary: 'User reports a "Paper Jam" error on a printer without any visible paper jam, suggesting a sensor issue or an internal mechanical fault.',
  },
  {
    id: 'TKT-004',
    title: 'Application running very slow',
    description: 'The CRM software has been extremely slow since yesterday. It takes minutes to load a new page.',
    customer: {
      id: 'USR-005',
      name: 'Emily Customer',
      avatar: 'https://picsum.photos/seed/5/100/100',
    },
    category: 'Software',
    status: 'Resolved',
    priority: 'Low',
    createdAt: '2024-07-20T11:00:00Z',
    updatedAt: '2024-07-21T16:45:00Z',
    location: 'Remote',
    resolutionDate: '2024-07-21T16:45:00Z',
  },
  {
    id: 'TKT-005',
    title: 'New server installation',
    description: 'We need a technician to come on-site to install and configure our new rack server.',
    customer: {
      id: 'USR-004',
      name: 'John Customer',
      avatar: 'https://picsum.photos/seed/4/100/100',
    },
    category: 'Installation',
    status: 'Open',
    priority: 'High',
    createdAt: '2024-07-22T12:00:00Z',
    updatedAt: '2024-07-22T12:00:00Z',
    location: '789 Pine Ln, Anytown, USA',
  },
];


export const navLinks: NavLink[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    roles: ['Admin', 'Support Agent', 'Field Technician', 'Customer'],
  },
  {
    href: '/dashboard/tickets',
    label: 'All Tickets',
    icon: TicketIcon,
    roles: ['Admin', 'Support Agent'],
  },
  {
    href: '/dashboard/my-tickets',
    label: 'My Requests',
    icon: TicketIcon,
    roles: ['Customer'],
  },
  {
    href: '/dashboard/my-jobs',
    label: 'My Jobs',
    icon: Wrench,
    roles: ['Field Technician'],
  },
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: AreaChart,
    roles: ['Admin'],
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
    roles: ['Admin', 'Support Agent', 'Field Technician', 'Customer'],
  },
  {
    href: '/dashboard/support',
    label: 'Support',
    icon: LifeBuoy,
    roles: ['Admin', 'Support Agent', 'Field Technician', 'Customer'],
  },
];
