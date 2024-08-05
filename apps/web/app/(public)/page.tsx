"use client";

import ListApartments from "@/components/module/apartments/list";
import FilterContainer from "@/components/module/home/filter-container";
import { useApartments } from "@/hooks/useApartments";
import { useMyFavoriteApartments } from "@/hooks/useMyFavoriteApartments";
import { GetApartmentsParams } from "@/services/apartment/type";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function Homepage() {
  const [searchState, setSearchState] = useState<GetApartmentsParams>({
    keyword: "",
    maxSize: "",
    minSize: "",
    maxPrice: "",
    minPrice: "",
  });
  const { data: apartments, isLoading } = useApartments(searchState);
  const { data: favorites } = useMyFavoriteApartments();

  const renderApartments = useMemo(() => {
    if (isLoading || !Array.isArray(apartments) || !Array.isArray(favorites)) {
      return [];
    }
    return apartments.map((apartments) => {
      const isFavorite =
        favorites.findIndex((f) => f.id === apartments.id) > -1;
      return {
        ...apartments,
        isFavorite,
      };
    });
  }, [apartments, favorites, isLoading]);

  return (
    <main className="container mx-auto min-h-screen p-24">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/svg/logo.svg"
            width={96}
            height={96}
            alt="logo"
            className="w-24 h-24"
          />
          <h1 className="text-4xl font-bold">Welcome to Apartment Rentals</h1>
          <h2 className="text-2xl font-bold">A place to rent apartments</h2>
        </div>
        <div className="mt-10">
          <FilterContainer onSearch={setSearchState} />
        </div>
        <div className="w-full mt-10">
          <ListApartments apartments={renderApartments} isLoading={isLoading} />
        </div>
      </div>
    </main>
  );
}
