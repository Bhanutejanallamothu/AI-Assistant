
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { navLinks } from '@/lib/data';
import { type UserRole } from '@/lib/types';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Logo } from './logo';

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  userRole: UserRole;
}

export function Nav({ userRole, className, ...props }: NavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex flex-col h-full',
        className
      )}
      {...props}
    >
       <div className="flex h-14 items-center border-b border-sidebar-border px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Logo className="h-6 w-6 text-sidebar-primary" />
            <span className="font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">ServicePulse AI</span>
          </Link>
        </div>
        <div className="flex-1">
            <SidebarMenu className="p-2">
                {navLinks
                .filter((link) => link.roles.includes(userRole))
                .map((link) => (
                    <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname === link.href}
                        tooltip={{ children: link.label }}
                    >
                        <Link href={link.href}>
                        <link.icon className="h-4 w-4" />
                        <span>{link.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </div>
    </nav>
  );
}
