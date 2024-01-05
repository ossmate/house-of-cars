"use client";

import { useAuthProvider } from "@/app/AuthProvider";
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

export const Navigation = () => {
  const {
    authState: { jwtToken },
  } = useAuthProvider();
  const pathname = usePathname();

  const menuItems = [
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Cars", href: "/cars" },
    { id: 3, label: "Favorites", href: "/favorite", enabled: jwtToken },
    { id: 4, label: "Settings", href: "/settings", enabled: jwtToken },
    { id: 5, label: "Sign In", href: "/sign-in", enabled: !jwtToken },
  ];

  return (
    <NavigationMenu className="bg-green-400 p-10 min-w-full d-flex justify-end">
      <NavigationMenuList>
        {menuItems.map(({ id, label, href, enabled = true }) => {
          if (!enabled) return null;

          return (
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
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
