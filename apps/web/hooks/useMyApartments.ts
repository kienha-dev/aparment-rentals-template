import { queryKeys } from "@/constants/query";
import { getMyApartments } from "@/services/apartment";
import { useQuery } from "@tanstack/react-query";

export const useMyApartments = () => {
  const query = useQuery({
    queryKey: [queryKeys.realtor.apartment.me],
    queryFn: getMyApartments,
  });

  return query;
};
