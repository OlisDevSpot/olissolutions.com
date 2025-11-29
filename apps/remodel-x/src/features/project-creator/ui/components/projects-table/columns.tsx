"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { formatRelative } from "date-fns";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import type { GetProjectsOutput } from "@/features/project-creator/data/queries/get-projects";

import { capitalize, convertUTCToPST } from "@olis/core/lib/formatters";
import { Badge } from "@olis/ui/components/badge";
import { Button } from "@olis/ui/components/button";
import { Checkbox } from "@olis/ui/components/checkbox";
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
    id: "select",
    header: ({ table }) => (
      <div 
        onClick={(e) => {
          e.stopPropagation();
          if (e.currentTarget.attributes.getNamedItem("type")?.value === "checkbox") {
            return undefined
          }
          table.toggleAllPageRowsSelected()
        }}
        className="flex justify-center items-center w-full h-full pr-4"
      >
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected()
            || (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div 
        onClick={(e) => {
          e.stopPropagation();
          if (e.currentTarget.attributes.getNamedItem("type")?.value === "checkbox") {
            return undefined
          }
          row.toggleSelected()
        }}
        className="flex justify-center items-center w-full h-full pr-4 select-none"
      >
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    maxSize: 30,
    size: 30,
    minSize: 30
  },
  {
    accessorKey: "project.createdAt",
    header: ({ column }) => {
      return (
        <div
          onClick={() => { 
            column.toggleSorting(column.getIsSorted() === "asc") 
          }}
          className="cursor-pointer flex items-center select-none"
        >
          Created date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const pstDate = convertUTCToPST(row.original.project.createdAt);
      const formattedDate = formatRelative(pstDate, new Date());
      return <div className="w-full h-full flex items-center">{formattedDate}</div>;
    },
    size: 50,
    maxSize: 50,
    minSize: 50
  },
  {
    accessorKey: "fullAddress",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer flex items-center select-none"
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      )
    },
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
          className="cursor-pointer flex items-center select-none"
        >
          Customers
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const fullNames = row.original.customers.map(customer => `${capitalize(customer.firstName)} ${capitalize(customer.lastName)}`);

      return (
        <div className="flex gap-2 h-full w-full items-center flex-wrap">
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
