"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export const Navigation = () => {
  const { status } = useSession();
  const pathname = usePathname();

  const isAuthenticated = status === "authenticated";

  const menuItems = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Cars", href: "/cars" },
    { id: 3, label: "Favorites", href: "/favorite" },
    { id: 4, label: "Settings", href: "/settings", enabled: isAuthenticated },
    {
      id: 5,
      label: "Sign In",
      href: "/api/auth/signin",
      enabled: !isAuthenticated,
    },
    {
      id: 6,
      label: "Sign Out",
      href: "/sign-out",
      onClick: () =>
        signOut({ redirect: false, callbackUrl: "http://localhost:3000/" }),
      enabled: isAuthenticated,
    },
  ];

  return (
    <NavigationMenu className="bg-green-400 p-10 min-w-full d-flex justify-end">
      <NavigationMenuList>
        {menuItems.map(
          ({ id, label, href, enabled = true, onClick = () => null }) => {
            if (!enabled) return null;

            return (
              <NavigationMenuItem key={id}>
                <Link href={href} legacyBehavior passHref>
                  <NavigationMenuLink
                    active={pathname === href}
                    className={cn(navigationMenuTriggerStyle())}
                    onClick={onClick}
                  >
                    {label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          },
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
