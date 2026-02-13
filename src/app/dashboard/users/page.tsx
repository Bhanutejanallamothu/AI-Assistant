
'use client';

import { UserDataTable } from '@/components/dashboard/user-data-table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { users } from '@/lib/data';
import { PlusCircle, Users as UsersIcon } from 'lucide-react';

export default function UserManagementPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight font-headline">User Management</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <UserDataTable users={users} />
        </CardContent>
      </Card>
    </div>
  );
}
