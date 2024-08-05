"use client";

import { Button } from "@/components/ui/button";
import { APP_ROUTER, COOKIE } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import queryClient from "@/lib/react-query";
import { deleteCookie } from "cookies-next";
import { FolderHeart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    deleteCookie(COOKIE.TOKEN);
    queryClient.clear();
    router.push(APP_ROUTER.SIGN_IN);
  };

  return (
    <header className="h-16 shadow sticky z-50 top-0 backdrop-blur">
      <div className="h-full flex justify-between items-center container mx-auto py-3">
        <div className="flex items-center space-x-2">
          <Image
            src="/svg/logo.svg"
            width={24}
            height={24}
            alt="logo"
            className="w-6 h-6"
          />
          <h1 className="font-bold">Apartment Rentals</h1>
        </div>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Link href={APP_ROUTER.APARTMENT.FAVORITE}>
              <FolderHeart />
            </Link>
            <Button onClick={() => handleSignOut()}>Sign out</Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Button asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
