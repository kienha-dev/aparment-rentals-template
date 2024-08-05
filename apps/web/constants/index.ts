import { icons } from "lucide-react";

export const COOKIE = {
  TOKEN: "token",
  ROLE: "role",
};

export const APP = {
  ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
  REALTOR_DOMAIN: `http://realtor.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
};

export const APP_ROUTER = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  APARTMENT: {
    FAVORITE: "/apartment/favorite",
    DETAIL: (id: string) => `/apartment/${id}`,
  },
  REALTOR: {
    APARTMENT: {
      LIST: "/realtor/apartment",
      DETAIL: (id: string) => `/realtor/apartment/${id}`,
      CREATE: "/realtor/apartment/create",
    },
  },
};

export const REALTOR_SIDEBAR_MENU: {
  title: string;
  path: string;
  icon: keyof typeof icons;
}[] = [
  {
    title: "Apartments",
    path: APP_ROUTER.REALTOR.APARTMENT.LIST,
    icon: "House",
  },
];
