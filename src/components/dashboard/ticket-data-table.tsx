'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { format, parseISO } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { type Ticket } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

const statusStyles = {
  Open: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  Assigned: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'In-Progress': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300',
  Resolved: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
  Closed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
};

const priorityStyles = {
  Low: 'border-green-500/50 text-green-600',
  Medium: 'border-yellow-500/50 text-yellow-600',
  High: 'border-orange-500/50 text-orange-600',
  Urgent: 'border-red-500/50 text-red-600',
};

// Component to safely render dates on the client to avoid hydration errors
const ClientFormattedDate = ({ isoDate }: { isoDate: string }) => {
  const [formattedDate, setFormattedDate] = React.useState('');

  React.useEffect(() => {
    if (isoDate) {
      setFormattedDate(format(parseISO(isoDate), 'PPpp'));
    }
  }, [isoDate]);

  return <>{formattedDate}</>;
};

const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Ticket ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Link href={`/dashboard/tickets/${row.getValue('id')}`} className="font-medium hover:underline">{row.getValue('id')}</Link>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Issue',
    cell: ({ row }) => <div className="max-w-xs truncate">{row.getValue('title')}</div>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant="outline" className={cn('border-transparent capitalize', statusStyles[row.getValue('status')])}>
        {row.getValue('status')}
      </Badge>
    ),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <Badge variant="outline" className={cn('capitalize', priorityStyles[row.getValue('priority')])}>
        {row.getValue('priority')}
      </Badge>
    ),
  },
  {
    accessorKey: 'customer.name',
    header: 'Customer',
  },
  {
    accessorKey: 'technician',
    header: 'Technician',
    cell: ({ row }) => {
        const technician = row.getValue('technician') as Ticket['technician'];
        return technician ? (
            <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                    <AvatarImage src={technician.avatar} alt={technician.name} />
                    <AvatarFallback>{technician.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{technician.name}</span>
            </div>
        ) : <span className="text-muted-foreground">Unassigned</span>
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Last Update
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <ClientFormattedDate isoDate={row.getValue('updatedAt')} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
                <Link href={`/dashboard/tickets/${ticket.id}`}>View Details</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Assign Technician</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              Delete Ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function TicketDataTable({ tickets }: { tickets: Ticket[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data: tickets,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by issue..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
