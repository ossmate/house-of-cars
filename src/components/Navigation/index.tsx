"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/NavigationMenu";
import Link from "next/link";
import { button } from "@shadow-panda/styled-system/recipes";

const Navigation = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link className={button({ variant: "ghost" })} href="/">
              Home
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link className={button({ variant: "ghost" })} href="/cars">
              Cars
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { Navigation };
