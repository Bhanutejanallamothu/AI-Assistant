'use client';

import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type UserRole } from '@/lib/types';
import AdminDashboard from '@/components/dashboard/admin-dashboard';
import AgentDashboard from '@/components/dashboard/agent-dashboard';
import TechnicianDashboard from '@/components/dashboard/technician-dashboard';
import CustomerDashboard from '@/components/dashboard/customer-dashboard';
import { users } from '@/lib/data';

export default function DashboardPage() {
  const [activeRole, setActiveRole] = React.useState<UserRole>('Admin');
  const currentUser = users.find(u => u.role === activeRole);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Welcome back, {currentUser?.name.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">Here's a summary of what's happening.</p>
        </div>
        <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as UserRole)}>
            <TabsList>
                {users.map((user) => (
                    <TabsTrigger key={user.id} value={user.role}>
                        {user.role}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
      </div>
      
      <Tabs value={activeRole} className="w-full">
        <TabsContent value="Admin">
            <AdminDashboard />
        </TabsContent>
        <TabsContent value="Support Agent">
            <AgentDashboard />
        </TabsContent>
        <TabsContent value="Field Technician">
            <TechnicianDashboard />
        </TabsContent>
        <TabsContent value="Customer">
            <CustomerDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
