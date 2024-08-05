"use client";

import { Loader } from "lucide-react";
import { ApartmentItem } from "./item";
import { Apartment } from "@/services/apartment/type";

type Props = {
  apartments: Apartment[];
  isLoading?: boolean;
  allowRemoveFavorite?: boolean;
};

export default function ListApartments({
  apartments,
  isLoading,
  allowRemoveFavorite,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : apartments.length === 0 ? (
        <div>No apartment</div>
      ) : (
        apartments.map((apartment) => {
          return (
            <ApartmentItem
              key={apartment.id}
              apartment={apartment}
              isFavorite={apartment.isFavorite}
              allowRemoveFavorite={allowRemoveFavorite}
            />
          );
        })
      )}
    </div>
  );
}
