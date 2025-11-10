"use client";

import type {
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { AllProjectsOutput } from "@/features/project-creator/data/queries/get-projects";

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
}

// const mockData = [
//   {
//     id: "1",
//     customers: {
//       firstName: "John",
//       lastName: "Doe",
//     },
//     fullAddress: "123 Main St",
//     date: "2020-01-01",
//   },
//   {
//     id: "2",
//     customers: {
//       firstName: "Sarah",
//       lastName: "Johnson",
//     },
//     fullAddress: "456 Oak Avenue",
//     date: "2021-03-15",
//   },
//   {
//     id: "3",
//     customers: {
//       firstName: "Michael",
//       lastName: "Chen",
//     },
//     fullAddress: "789 Pine Road",
//     date: "2021-07-22",
//   },
//   {
//     id: "4",
//     customers: {
//       firstName: "Emily",
//       lastName: "Rodriguez",
//     },
//     fullAddress: "321 Elm Street",
//     date: "2022-01-08",
//   },
//   {
//     id: "5",
//     customers: {
//       firstName: "David",
//       lastName: "Thompson",
//     },
//     fullAddress: "654 Maple Drive",
//     date: "2022-05-30",
//   },
//   {
//     id: "6",
//     customers: {
//       firstName: "Jessica",
//       lastName: "Wilson",
//     },
//     fullAddress: "987 Cedar Lane",
//     date: "2022-09-14",
//   },
//   {
//     id: "7",
//     customers: {
//       firstName: "Robert",
//       lastName: "Martinez",
//     },
//     fullAddress: "147 Birch Court",
//     date: "2023-02-11",
//   },
//   {
//     id: "8",
//     customers: {
//       firstName: "Amanda",
//       lastName: "Taylor",
//     },
//     fullAddress: "258 Spruce Way",
//     date: "2023-06-07",
//   },
//   {
//     id: "9",
//     customers: {
//       firstName: "Christopher",
//       lastName: "Anderson",
//     },
//     fullAddress: "369 Willow Boulevard",
//     date: "2023-10-19",
//   },
//   {
//     id: "10",
//     customers: {
//       firstName: "Lisa",
//       lastName: "Garcia",
//     },
//     fullAddress: "741 Poplar Street",
//     date: "2024-01-25",
//   },
//   {
//     id: "11",
//     customers: {
//       firstName: "Kevin",
//       lastName: "Brown",
//     },
//     fullAddress: "852 Hickory Avenue",
//     date: "2024-04-12",
//   },
//   {
//     id: "12",
//     customers: {
//       firstName: "Rachel",
//       lastName: "Davis",
//     },
//     fullAddress: "963 Sycamore Road",
//     date: "2024-08-03",
//   },
//   {
//     id: "13",
//     customers: {
//       firstName: "Brandon",
//       lastName: "Miller",
//     },
//     fullAddress: "174 Dogwood Circle",
//     date: "2024-09-18",
//   },
//   {
//     id: "14",
//     customers: {
//       firstName: "Nicole",
//       lastName: "Moore",
//     },
//     fullAddress: "285 Magnolia Place",
//     date: "2024-11-02",
//   },
//   {
//     id: "15",
//     customers: {
//       firstName: "Tyler",
//       lastName: "Jackson",
//     },
//     fullAddress: "396 Chestnut Drive",
//     date: "2023-12-15",
//   },
//   {
//     id: "16",
//     customers: {
//       firstName: "Stephanie",
//       lastName: "White",
//     },
//     fullAddress: "507 Walnut Lane",
//     date: "2022-11-28",
//   },
//   {
//     id: "17",
//     customers: {
//       firstName: "Jonathan",
//       lastName: "Harris",
//     },
//     fullAddress: "618 Ash Street",
//     date: "2023-03-09",
//   },
//   {
//     id: "18",
//     customers: {
//       firstName: "Megan",
//       lastName: "Clark",
//     },
//     fullAddress: "729 Redwood Avenue",
//     date: "2021-12-06",
//   },
//   {
//     id: "19",
//     customers: {
//       firstName: "Andrew",
//       lastName: "Lewis",
//     },
//     fullAddress: "830 Cypress Court",
//     date: "2020-08-21",
//   },
//   {
//     id: "20",
//     customers: {
//       firstName: "Samantha",
//       lastName: "Young",
//     },
//     fullAddress: "941 Juniper Way",
//     date: "2024-07-14",
//   },
// ];

export function DataTable<TData extends AllProjectsOutput[number], TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
  });

  return (
    <div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer"
                      onClick={() => router.push(`${ROOTS.remodelX.getProjectsRoot()}/${row.original.id}`)}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4 px-4">
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
        Page
        {" "}
        {table.getState().pagination.pageIndex + 1}
        {" "}
        of
        {" "}
        {table.getPageCount()}
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
