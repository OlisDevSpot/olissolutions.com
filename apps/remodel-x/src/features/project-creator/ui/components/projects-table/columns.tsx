"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { formatRelative } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import type { GetProjectsOutput } from "@/features/project-creator/data/queries/get-projects";

import { capitalize } from "@olis/core/lib/formatters";
import { Badge } from "@olis/ui/components/badge";
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

export const columns: ColumnDef<GetProjectsOutput[number]>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Created date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      console.log(row.original.project.createdAt);
      const formattedDate = formatRelative(row.original.project.createdAt, new Date());
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "address",
    header: () => <div className="">Address</div>,
    cell: ({ row }) => {
      const address = row.original.fullAddress;
      const addressComponents = address.split(", ");

      return (
        <div className="">
          <p className="font-bold">{addressComponents[0]}</p>
          <p className="text-muted-foreground">{`${addressComponents[1]}, ${addressComponents[2]}`}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "customers",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center"
        >
          Customers
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const fullNames = row.original.customers.map(customer => `${capitalize(customer.firstName)} ${capitalize(customer.lastName)}`);

      return (
        <div className="flex gap-2">
          {fullNames.map((fullName, index) => (
            <Badge key={`lastName-${index}`} className="border-muted-foreground/30 border rounded-lg gap-2">
              <div className="text-left font-medium">{fullName}</div>
            </Badge>
          ))}
        </div>
      )
    },
  },
  
  {
    id: "actions",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      const project = row.original.project;
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
