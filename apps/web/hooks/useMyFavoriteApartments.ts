import { queryKeys } from "@/constants/query";
import { getAllFavorite } from "@/services/apartment";
import { useQuery } from "@tanstack/react-query";

export const useMyFavoriteApartments = () => {
  const query = useQuery({
    queryKey: [queryKeys.user.apartment.favorite],
    queryFn: getAllFavorite,
  });

  return query;
};
