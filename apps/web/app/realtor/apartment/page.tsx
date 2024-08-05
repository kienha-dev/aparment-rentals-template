"use client";

import { Button } from "@/components/ui/button";
import { APP_ROUTER } from "@/constants";
import { Loader, PlusIcon } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useMyApartments } from "@/hooks/useMyApartments";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { Role } from "@/services/auth/type";

export default function RealtorApartment() {
  // const { data: user } = useUser();
  // const router = useRouter();
  const { data: myApartment, isLoading } = useMyApartments();

  // if (!user || user.role !== Role.REALTOR) {
  //   router.push(APP_ROUTER.HOME);
  // }

  return (
    <main className="container mx-auto min-h-screen p-8">
      <h2 className="text-3xl font-bold">Apartments</h2>
      <div className="mt-20 flex justify-between">
        {/* <Input placeholder="Search by name" className="w-80" /> */}
        <div />
        <Button asChild>
          <Link
            className="space-x-2"
            href={APP_ROUTER.REALTOR.APARTMENT.CREATE}
          >
            <PlusIcon size={16} />
            <span>Post new apartment</span>
          </Link>
        </Button>
      </div>
      <div className="mt-6">
        {isLoading ? (
          <Loader className="animate-spin" />
        ) : (
          Array.isArray(myApartment) && (
            <DataTable columns={columns} data={myApartment} />
          )
        )}
      </div>
    </main>
  );
}
