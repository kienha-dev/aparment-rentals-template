"use client";

import ListApartments from "@/components/module/apartments/list";
import { useMyFavoriteApartments } from "@/hooks/useMyFavoriteApartments";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FavoriteApartmentPage() {
  const { data: apartments, isLoading } = useMyFavoriteApartments();
  const router = useRouter();

  return (
    <main className="container mx-auto min-h-screen p-24">
      <div className="flex flex-col items-center justify-center space">
        <div className="w-full">
          <span
            onClick={() => router.back()}
            className="flex cursor-pointer items-center space-x-2 hover:underline"
          >
            <ChevronLeft size={16} />
            Back to Home
          </span>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-bold">My favorite apartments</h1>
        </div>
        <div className="w-full mt-10">
          {Array.isArray(apartments) && apartments.length > 0 ? (
            <ListApartments
              apartments={apartments}
              isLoading={isLoading}
              allowRemoveFavorite
            />
          ) : (
            <div>No apartments in favorite</div>
          )}
        </div>
      </div>
    </main>
  );
}
