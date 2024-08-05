import { Button } from "@/components/ui/button";
import { APP_ROUTER } from "@/constants";
import { queryKeys } from "@/constants/query";
import queryClient from "@/lib/react-query";
import {
  addApartmentToFavorite,
  removeApartmentFromFavorite,
} from "@/services/apartment";
import { Apartment } from "@/services/apartment/type";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

type ApartmentItemProps = {
  apartment: Apartment;
  isFavorite?: boolean;
  allowRemoveFavorite?: boolean;
};

export const ApartmentItem = ({
  apartment,
  isFavorite,
  allowRemoveFavorite,
}: ApartmentItemProps) => {
  const handleAddToFavorite = async (id: string) => {
    try {
      await addApartmentToFavorite(id);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.user.apartment.favorite],
      });
      toast.success("Add to favorite successfully");
    } catch (err) {
      toast.error("Add to favorite failed");
    }
  };

  const handleRemoveFromFavorite = async (id: string) => {
    try {
      await removeApartmentFromFavorite(id);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.user.apartment.favorite],
      });
      toast.success("Remove from favorite successfully");
    } catch (err) {
      toast.error("Remove from favorite failed");
    }
  };

  return (
    <div className="shadow rounded-lg overflow-hidden space-y-2">
      <div className="relative w-full">
        <Image
          className="aspect-video object-cover"
          width={1920}
          height={1080}
          src={apartment.previewImage}
          alt={apartment.title}
        />
        <Button
          onClick={() => {
            if (allowRemoveFavorite) {
              handleRemoveFromFavorite(apartment.id);
            } else {
              if (isFavorite) {
                handleRemoveFromFavorite(apartment.id);
              } else {
                handleAddToFavorite(apartment.id);
              }
            }
          }}
          variant="ghost"
          className="absolute top-2 right-2"
        >
          <Heart
            color="#ef4444"
            fill={allowRemoveFavorite || isFavorite ? "#ef4444" : "#fff"}
          />
        </Button>
      </div>
      <div className="flex items-end py-4 px-6">
        <div className="flex-1">
          <h1 className="font-bold text-2xl line-clamp-1">{apartment.title}</h1>
          <p className="text-gray-500">Price: {apartment.price}$/month</p>
          <p className="text-gray-500">Room size: {apartment.areaSize}m2</p>
        </div>
        <Link
          href={APP_ROUTER.APARTMENT.DETAIL(apartment.id)}
          className="hover:underline"
        >
          View detail
        </Link>
      </div>
    </div>
  );
};
