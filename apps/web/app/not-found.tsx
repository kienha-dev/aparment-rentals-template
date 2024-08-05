import { Button } from "@/components/ui/button";
import { APP_ROUTER } from "@/constants";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href={APP_ROUTER.HOME}>Go to Homepage</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
