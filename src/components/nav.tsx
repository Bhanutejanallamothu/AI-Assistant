
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
  SidebarFooter,
  useSidebar,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from './logo';
import { Button } from './ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  userRole: UserRole;
}

export function Nav({ userRole, className, ...props }: NavProps) {
  const pathname = usePathname();
  const { toggleSidebar, state } = useSidebar();

  return (
    <nav
      className={cn(
        'flex flex-col h-full',
        className
      )}
      {...props}
    >
       <div className="flex h-16 items-center border-b border-sidebar-border px-4">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <Logo className="h-7 w-7 text-sidebar-primary" />
            <span className="font-headline text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">ServicePulse</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
            <SidebarMenu className="p-2">
                {navLinks
                .filter((link) => link.roles.includes(userRole))
                .map((link) => (
                    <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton
                        asChild
                        isActive={pathname.startsWith(link.href)}
                        tooltip={{ children: link.label }}
                    >
                        <Link href={link.href}>
                        <link.icon />
                        <span>{link.label}</span>
                        </Link>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </div>
        <SidebarFooter className="p-2 border-t border-sidebar-border mt-auto">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton onClick={toggleSidebar}>
                        {state === 'expanded' ? <PanelLeftClose /> : <PanelLeftOpen />}
                        <span>Collapse</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </nav>
  );
}
