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

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight font-headline">Dashboard</h1>
      
      <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as UserRole)}>
        <div className="flex items-center justify-between">
            <TabsList>
                {users.map((user) => (
                    <TabsTrigger key={user.id} value={user.role}>
                        {user.role}
                    </TabsTrigger>
                ))}
            </TabsList>
            <p className="text-sm text-muted-foreground">
                Currently viewing as: <span className="font-semibold text-foreground">{users.find(u => u.role === activeRole)?.name}</span>
            </p>
        </div>
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
