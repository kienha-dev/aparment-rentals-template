"use client";

import { useUser } from "./useUser";

export const useAuth = () => {
  const { data: user } = useUser();

  return {
    isLoggedIn: !!user,
  };
};
