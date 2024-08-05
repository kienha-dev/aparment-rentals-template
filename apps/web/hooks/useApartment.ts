import { queryKeys } from "@/constants/query";
import { getApartmentById } from "@/services/apartment";
import { useQuery } from "@tanstack/react-query";

export const useApartment = (id: string) => {
  const query = useQuery({
    queryKey: [queryKeys.user.apartment.favorite],
    queryFn: () => getApartmentById(id),
  });

  return query;
};
