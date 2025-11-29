"use client";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { GetProjectsOutput } from "@/features/project-creator/data/queries/get-projects";

import { ROOTS } from "@olis/core/constants";
import { Button } from "@olis/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@olis/ui/components/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onEmptyButtonClick?: () => void;
}

export function DataTable<TData extends GetProjectsOutput[number], TValue>({
  columns,
  data,
  onEmptyButtonClick,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: true,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
  });

  return (
    <div className="bg-card h-full flex flex-col justify-between">
      <div className="overflow-hidden rounded-md border">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize(), }}
                    className="px-0"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer bg-background hover:bg-background/80 h-20"
                      onClick={() => router.push(`${ROOTS.remodelX.getProjectsRoot()}/${row.original.project.id}`)}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id} className="p-0 h-20">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      <div className="flex flex-col justify-center gap-2 items-center w-full">
                        No results.
                        <Button 
                          size="sm" 
                          className="w-fit" 
                          variant="outline" 
                          onClick={() => {
                            onEmptyButtonClick?.();
                          }}
                        >
                          <PlusIcon />
                          Add Project
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-4 py-4 px-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPageIndex(table.getState().pagination.pageIndex - 1);
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page
          {" "}
          {table.getState().pagination.pageIndex + 1}
          {" "}
          of
          {" "}
          {table.getPageCount() ? table.getPageCount() : 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setPageIndex(table.getState().pagination.pageIndex + 1);
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
