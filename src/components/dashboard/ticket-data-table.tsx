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
import { MoreHorizontal, ArrowUpDown, Search, PlusCircle } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
    accessorKey: 'title',
    header: 'Ticket',
    cell: ({ row }) => (
      <div>
        <Link href={`/dashboard/tickets/${row.original.id}`} className="font-semibold text-primary hover:underline">{row.original.id}</Link>
        <div className="font-medium max-w-xs truncate">{row.original.title}</div>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <Badge className={cn('capitalize font-semibold px-2.5 py-1', statusStyles[row.getValue('status') as TicketStatus])}>
            {row.getValue('status')}
        </Badge>
      </div>
    ),
    filterFn: (row, id, value) => {
        return value ? value === row.getValue(id) : true
    }
  },
  {
    accessorKey: 'priority',
    header: () => <div className="text-center">Priority</div>,
    cell: ({ row }) => (
       <div className="text-center">
            <Badge className={cn('capitalize font-semibold px-2.5 py-1', priorityStyles[row.getValue('priority') as TicketPriority])}>
                {row.getValue('priority')}
            </Badge>
      </div>
    ),
    filterFn: (row, id, value) => {
        return value ? value === row.getValue(id) : true
    }
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
      <div className="text-right">
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="text-right"
        >
            Last Update
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="text-muted-foreground text-sm text-right"><ClientFormattedDate isoDate={row.getValue('updatedAt')} /></div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <div className="flex justify-end">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
  const [sorting, setSorting] = React.useState<SortingState>([ { id: 'updatedAt', desc: true }]);
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
       <div className="flex items-center pb-4 gap-2">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
            placeholder="Filter tickets..."
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
                table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className="pl-9 rounded-lg"
            />
        </div>
        <Select onValueChange={(value) => table.getColumn('status')?.setFilterValue(value === 'all' ? undefined : value)}>
            <SelectTrigger className="w-[180px] rounded-lg">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="Assigned">Assigned</SelectItem>
                <SelectItem value="In-Progress">In-Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
        </Select>
        <Select onValueChange={(value) => table.getColumn('priority')?.setFilterValue(value === 'all' ? undefined : value)}>
            <SelectTrigger className="w-[180px] rounded-lg">
                <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
        </Select>
        <Button className="rounded-lg">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Ticket
        </Button>
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
                  className="h-14 group hover:bg-accent/50"
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
