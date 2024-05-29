'use client'

import * as React from 'react'
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
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Modal from '@/components/ui/modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import { deleteTodo, upsertTodo } from '../actions'
import { Todo } from '../types'

type TodoDataTable = {
  data: Todo[]
}

export function TodoDataTable({ data }: TodoDataTable) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [todoToDelete, setTodoToDelete] = React.useState<Todo | null>(null)

  const router = useRouter()

  const handleToggleDoneTodo = async (todo: Todo) => {
    const doneAt = todo.doneAt ? null : new Date()
    await upsertTodo({
      id: todo.id,
      doneAt,
    })
    router.refresh()

    toast({
      title: 'Update Successful',
      description: 'The todo has been updated successfully!',
    })
  }

  const openDeleteModal = (todo: Todo) => {
    setIsDeleteModalOpen(true)
    setTodoToDelete(todo)
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setTodoToDelete(null)
  }

  const handleDeleteTodo = async (todo: Todo) => {
    setIsDeleteModalOpen(false)
    await deleteTodo({ id: todo.id })
    router.refresh()

    toast({
      title: 'Deletion Successful',
      description: 'The todo has been deleted successfully!',
    })
  }

  const columns: ColumnDef<Todo>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const doneAt = row.original.doneAt
        const status: 'done' | 'waiting' = doneAt ? 'done' : 'waiting'
        const variant: 'secondary' | 'default' = doneAt
          ? 'secondary'
          : 'default'

        return <Badge variant={variant}>{status}</Badge>
      },
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'createdAt',
      header: () => <div className="text-right">createdAt</div>,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
        const createdAtFormatted = format(createdAt, 'dd/MM/yyyy')

        return (
          <div className="text-right font-medium">{createdAtFormatted}</div>
        )
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const todo = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(todo.id)}
              >
                Copy Todo ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleToggleDoneTodo(todo)}>
                Mark as done
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDeleteModal(todo)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      {todoToDelete && (
        <Modal isOpen={isDeleteModalOpen} setIsOpen={closeDeleteModal}>
          <div className="flex flex-col gap-4 bg-background ring-offset-0 ring-0 p-4 w-[500px] h-[200px] rounded-lg justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-3">Delete Todo</h2>
              <p className="text-muted-foreground text-sm">
                Are you sure you want to delete this todo? This action cannot be
                undone.
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => handleDeleteTodo(todoToDelete)}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(
                  ({ isPlaceholder, column, id, getContext }) => {
                    return (
                      <TableHead key={id}>
                        {isPlaceholder
                          ? null
                          : flexRender(column.columnDef.header, getContext())}
                      </TableHead>
                    )
                  },
                )}
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
                        cell.getContext(),
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
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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
    </div>
  )
}
