"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { Navigation } from "./navigation";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { APP_ROUTER, COOKIE } from "@/constants";
import { useUser } from "@/hooks/useUser";
import queryClient from "@/lib/react-query";

type Props = {};

export default function Sidebar({}: Props) {
  const router = useRouter();
  const { data: user } = useUser();

  const signOut = () => {
    deleteCookie(COOKIE.TOKEN);
    queryClient.clear();
    router.push(APP_ROUTER.SIGN_IN);
  };

  return (
    <aside className="flex flex-col p-3 w-72 h-svh shadow">
      <div className="flex-1">
        <div className="flex space-x-2 items-center p-3 pb-6">
          <Image
            src="/svg/logo.svg"
            width={24}
            height={24}
            alt="logo"
            className="w-6 h-6"
          />
          <h1 className="font-bold text-sm">Apartment Rentals</h1>
        </div>
        <Navigation />
      </div>
      <Separator />
      <div className="flex pt-2 items-center px-3">
        <p className="font-semibold text-sm text-ellipsis overflow-hidden">
          {user?.email || ""}
        </p>
        <Button onClick={() => signOut()} variant="ghost">
          <LogOut />
        </Button>
      </div>
    </aside>
  );
}
