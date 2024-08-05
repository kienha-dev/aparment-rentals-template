import { queryKeys } from "@/constants/query";
import { currentUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  const query = useQuery({
    queryKey: [queryKeys.user.me],
    queryFn: currentUser,
  });

  return query;
};
