"use client";

import { Button } from "@/components/ui/button";
import { APP_ROUTER } from "@/constants";
import { queryKeys } from "@/constants/query";
import queryClient from "@/lib/react-query";
import { deleteApartmentById } from "@/services/apartment";
import { Apartment } from "@/services/apartment/type";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const columns: ColumnDef<Apartment>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "roomNo",
    header: "Room No.",
  },
  {
    accessorKey: "areaSize",
    header: "Area size",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "",
    header: "Action",
    maxSize: 100,
    cell: ({ row }) => {
      return (
        <div>
          <Button variant="ghost">
            <Link href={APP_ROUTER.REALTOR.APARTMENT.DETAIL(row.original.id)}>
              <Edit size={16} />
            </Link>
          </Button>
          <Button
            onClick={async () => {
              try {
                await deleteApartmentById(row.original.id);
                queryClient.invalidateQueries({
                  queryKey: [queryKeys.realtor.apartment.me],
                });
                toast.success("Delete apartment successful");
              } catch (err) {
                toast.error("Delete apartment failed");
              }
            }}
            variant="ghost"
          >
            <Trash size={16} />
          </Button>
        </div>
      );
    },
  },
];
