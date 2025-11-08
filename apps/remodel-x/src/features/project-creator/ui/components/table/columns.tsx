"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import type { AllProjects } from "@/features/project-creator/data/queries/get-projects";

import { Button } from "@olis/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@olis/ui/components/dropdown-menu";

import { DeleteProjectButton } from "../delete-project-button";

export const columns: ColumnDef<AllProjects[number]>[] = [
  {
    accessorKey: "address",
    header: () => <div>Address</div>,
    cell: ({ row }) => {
      const address = row.original.fullAddress;

      return <div>{address}</div>;
    },
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const firstName = row.original.customers?.firstName;

      return <div className="text-left font-medium">{firstName}</div>;
    },
  },
  {
    accessorKey: "lastName",
    header: () => <div>Last name</div>,

    cell: ({ row }) => {
      const lastName = row.original.customers?.lastName;

      return <div className="text-left font-medium">{lastName}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.createdAt;
      return <div>{date}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const project = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(project.id);
              }}
            >
              Copy project ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View project details</DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteProjectButton projectId={project.id} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
