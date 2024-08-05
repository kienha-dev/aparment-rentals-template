"use client";

import { REALTOR_SIDEBAR_MENU } from "@/constants";
import { cn } from "@/lib/utils";
import { icons } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathName = usePathname();
  return (
    <div className="flex flex-col space-y-2">
      {REALTOR_SIDEBAR_MENU.map((item) => {
        const LucideIcon = icons[item.icon];
        return (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium",
              pathName.includes(item.path) ? "bg-gray-100" : "hover:bg-gray-100"
            )}
          >
            <LucideIcon name={item.icon} size={24} />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export { Navigation };
