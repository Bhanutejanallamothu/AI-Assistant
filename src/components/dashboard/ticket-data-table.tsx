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
import { type Ticket, type TicketStatus, type TicketPriority } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';

const statusStyles: Record<TicketStatus, string> = {
  Open: 'bg-chart-2/20 text-chart-2',
  Assigned: 'bg-chart-3/20 text-chart-3',
  'In-Progress': 'bg-chart-5/20 text-chart-5',
  Resolved: 'bg-chart-1/20 text-chart-1',
  Closed: 'bg-secondary text-secondary-foreground',
};

const priorityStyles: Record<TicketPriority, string> = {
  Low: 'bg-chart-1/20 text-chart-1',
  Medium: 'bg-chart-3/20 text-chart-3',
  High: 'bg-chart-4/20 text-chart-4',
  Urgent: 'bg-destructive/20 text-destructive',
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
      <Badge className={cn('capitalize border-transparent', statusStyles[row.getValue('status') as TicketStatus])}>
        {row.getValue('status')}
      </Badge>
    ),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <Badge className={cn('capitalize border-transparent', priorityStyles[row.getValue('priority') as TicketPriority])}>
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
