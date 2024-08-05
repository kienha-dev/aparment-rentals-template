import { queryKeys } from "@/constants/query";
import { getAllApartments } from "@/services/apartment";
import { GetApartmentsParams } from "@/services/apartment/type";
import { useQuery } from "@tanstack/react-query";

export const useApartments = (searchParams?: GetApartmentsParams) => {
  const query = useQuery({
    queryKey: [queryKeys.user.apartment.all, searchParams],
    queryFn: () => getAllApartments(searchParams),
  });

  return query;
};
