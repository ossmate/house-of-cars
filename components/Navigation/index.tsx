"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { id: 1, label: "Home", href: "/" },
  { id: 2, label: "Cars", href: "/cars" },
  { id: 3, label: "Favorite", href: "/favorite" },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <NavigationMenu className="bg-green-400 p-10 min-w-full d-flex justify-end">
      <NavigationMenuList>
        {menuItems.map(({ id, label, href }) => (
          <NavigationMenuItem key={id}>
            <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink
                active={pathname === href}
                className={cn(navigationMenuTriggerStyle())}
              >
                {label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
