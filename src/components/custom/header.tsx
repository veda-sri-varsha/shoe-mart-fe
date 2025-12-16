"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Store, AccountIcon } from "@/components/icons/icons";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  NAVIGATION_ITEMS,
  ANNOUNCEMENTS,
  ABOUT_MENU_ITEMS,
  HELP_MENU_ITEMS,
} from "@/constants/header";
import { CartSheet } from "@/components/custom/cart";
import { useAuth } from "@/hooks/use-auth";
import { useDebounce } from "@/hooks/useDebounce";

export function Header() {
  const [index, setIndex] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const debouncedSearch = useDebounce(search, 200);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () =>
    setIndex(
      (prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length
    );
  const handleNext = () =>
    setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);

  const handleAccountClick = () => {
    if (isAuthenticated) {
      router.push("/account");
    } else {
      router.push("/account");
    }
  };

  React.useEffect(() => {
    const query = debouncedSearch.trim();

    if (query.length > 0) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
    }
  }, [debouncedSearch, router]);

  return (
    <header className="w-full">
      <div className="flex items-center justify-between h-12 px-8 bg-primary cursor-pointer">
        <div className="flex items-center gap-2">
          <Store />
          <Typography as="span" variant="small" className="text-white">
            Nearby Stores
          </Typography>
        </div>
        <div className="flex items-center justify-center flex-1 max-w-md relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 text-white hover:bg-white/20 h-8 w-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Typography
            as="span"
            variant="muted"
            className="text-white font-medium text-center px-10"
          >
            {ANNOUNCEMENTS[index]}
          </Typography>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 text-white hover:bg-white/20 h-8 w-8"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/track-order" className="text-white hover:text-white/80">
            <Typography as="span" variant="small" className="font-medium">
              Track Order
            </Typography>
          </Link>
          <div className="relative group">
            <Button className="flex items-center gap-1 text-white hover:text-white/80">
              <Typography as="span" variant="small" className="font-medium">
                About
              </Typography>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block min-w-48 bg-white rounded shadow-lg border border-gray-200 z-50">
              <ul className="py-1">
                {ABOUT_MENU_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <Typography
                        as="span"
                        variant="small"
                        className="text-gray-700"
                      >
                        {item.label}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative group">
            <Button className="flex items-center gap-1 text-white hover:text-white/80">
              <Typography as="span" variant="small" className="font-medium">
                Help
              </Typography>
              <ChevronDown className="h-4 w-4" />
            </Button>
            <div className="absolute right-0 top-full mt-2 hidden group-hover:block min-w-48 bg-white rounded shadow-lg border border-gray-200 z-50">
              <ul className="py-1">
                {HELP_MENU_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                    >
                      <Typography
                        as="span"
                        variant="small"
                        className="text-gray-700"
                      >
                        {item.label}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <nav className="w-full flex items-center px-8 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-8">
          <Link href="/" className="no-underline hover:no-underline">
            <Typography
              as="h1"
              variant="h3"
              className="text-black font-serif tracking-wider "
            >
              SHOE MART
            </Typography>
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationMenuItem key={item}>
                  <Link href="/products">
                    <NavigationMenuLink
                      asChild
                      className="px-3 py-2 rounded hover:bg-gray-100 transition-colors no-underline"
                    >
                      <Typography
                        as="span"
                        variant="muted"
                        className="text-gray-700 font-medium"
                      >
                        {item}
                      </Typography>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center ml-auto gap-4">
          <form>
            <Input
              placeholder="Search Loafers"
              className="w-64 border-gray-300 bg-gray-50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="relative">
            <Button
              onClick={handleAccountClick}
              variant="ghost"
              className="flex flex-col items-center text-gray-700 hover:text-black bg-transparent hover:bg-gray-100 shadow-none p-2"
            >
              <AccountIcon />
              <Typography
                as="span"
                variant="small"
                className="text-xs text-black"
              >
                ACCOUNT
              </Typography>
            </Button>
          </div>
          <CartSheet />
        </div>
      </nav>
    </header>
  );
}
