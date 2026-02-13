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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const statusStyles: Record<TicketStatus, string> = {
  Open: 'bg-muted/70 text-muted-foreground border-transparent',
  Assigned: 'bg-chart-2/15 text-chart-2 border-transparent',
  'In-Progress': 'bg-chart-5/15 text-chart-5 border-transparent',
  Resolved: 'bg-chart-1/15 text-chart-1 border-transparent',
  Closed: 'bg-secondary text-secondary-foreground border-transparent',
};

const priorityStyles: Record<TicketPriority, string> = {
  Low: 'bg-chart-1/15 text-chart-1 border-transparent',
  Medium: 'bg-chart-3/15 text-chart-3 border-transparent',
  High: 'bg-chart-4/15 text-chart-4 border-transparent',
  Urgent: 'bg-destructive/15 text-destructive border-transparent',
};


// Component to safely render dates on the client to avoid hydration errors
const ClientFormattedDate = ({ isoDate }: { isoDate: string }) => {
  const [formattedDate, setFormattedDate] = React.useState('');

  React.useEffect(() => {
    if (isoDate) {
      setFormattedDate(format(parseISO(isoDate), 'PP'));
    }
  }, [isoDate]);

  return <>{formattedDate}</>;
};

const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: 'id',
    header: 'Ticket',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <Link href={`/dashboard/tickets/${row.getValue('id')}`} className="font-semibold hover:underline">{row.getValue('id')}</Link>
        <div className="text-xs text-muted-foreground max-w-xs truncate">{row.original.title}</div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge className={cn('capitalize', statusStyles[row.getValue('status') as TicketStatus])}>
        {row.getValue('status')}
      </Badge>
    ),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <Badge className={cn('capitalize', priorityStyles[row.getValue('priority') as TicketPriority])}>
        {row.getValue('priority')}
      </Badge>
    ),
  },
  {
    id: 'users',
    header: 'Users',
    cell: ({ row }) => {
        const ticket = row.original;
        const customer = ticket.customer;
        const technician = ticket.technician;
        return (
            <div className="flex items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Avatar className="h-7 w-7 border-2 border-background">
                                <AvatarImage src={customer.avatar} alt={customer.name} />
                                <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Customer: {customer.name}</p>
                        </TooltipContent>
                    </Tooltip>
                    {technician && (
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <Avatar className="-ml-2 h-7 w-7 border-2 border-background">
                                    <AvatarImage src={technician.avatar} alt={technician.name} />
                                    <AvatarFallback>{technician.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                             <TooltipContent>
                                <p>Technician: {technician.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </TooltipProvider>
            </div>
        )
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="-ml-4"
      >
        Last Update
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-muted-foreground text-sm"><ClientFormattedDate isoDate={row.getValue('updatedAt')} /></div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <div className="flex justify-end">
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
        </div>
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
    React.useState<VisibilityState>({ title: false });

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
      <div className="flex items-center pb-4">
        <Input
          placeholder="Filter tickets..."
          value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-lg border">
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
