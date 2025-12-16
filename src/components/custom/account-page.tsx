"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, LogOut, Pencil } from "lucide-react";
import RecentlyViewed from "./recently-viewed";
import { Button } from "@/components/ui/button";
import router from "next/router";
import { logout } from "@/services/api";

type User = { name: string; email: string; phone?: string | null };
type Item = {
  id: string;
  title: string;
  badge?: string;
  image: string;
  rating?: number;
  reviews?: number;
};

export default function AccountPage({
  user,
  recent,
}: {
  user: User;
  recent: Item[];
}) {
  return (
    <div className="w-full bg-[#f6f6f4] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-3 text-sm text-gray-600">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">›</span>
        Your Account
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-serif tracking-wide text-center py-6">
          Your Account
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          <aside className="bg-white rounded-xl border border-gray-200 p-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-900 font-medium">
              <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                <path d="M3 5h14v2H3V5zm0 4h10v2H3V9zm0 4h14v2H3v-2z" />
              </svg>
              Account Home
            </div>
            <nav className="mt-2 space-y-2">
              <Link
                href="/account/profile"
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 20c2-3 10-3 12 0" />
                  </svg>
                  My Profile
                </span>
              </Link>
              <Link
                href="/account/orders"
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M3 3h18l-1.5 9h-15L3 3z" />
                    <path d="M6 21a1 1 0 100-2 1 1 0 000 2zm12 0a1 1 0 100-2 1 1 0 000 2z" />
                  </svg>
                  My Orders
                </span>
              </Link>
              <Link
                href="/account/addresses"
                className="block px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700"
              >
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M12 2l7 7-7 13-7-13 7-7z" />
                  </svg>
                  My Addresses
                </span>
              </Link>
            </nav>
            <Button
              onClick={async () => {
                try {
                  await logout({ email: user.email }); // backend logout
                  // Clear client storage after successful logout
                  localStorage.removeItem("authToken");
                  // or your context clearing logic
                } catch (e) {
                  console.error(e);
                } finally {
                  router.push("/sign-in");
                }
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </aside>

          {/* Content */}
          <section className="space-y-6">
            {/* User card */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
                  <span className="text-xl font-semibold">
                    {user.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </span>
                </div>
                <div className="leading-tight">
                  <p className="text-xl font-medium">{user.name}</p>
                  {user.email ? (
                    <p className="text-sm text-gray-600">{user.email}</p>
                  ) : null}
                  {user.phone ? (
                    <p className="text-sm text-gray-600">{user.phone}</p>
                  ) : null}
                </div>
              </div>
              <Link
                href="/account/profile"
                className="inline-flex h-9 items-center gap-2 rounded-full border px-3 text-sm hover:bg-gray-50"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>
            </div>

            {/* Recently Viewed */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-serif">Recently Viewed</h2>
                <div className="flex gap-2">
                  <Button
                    className="h-8 w-8 inline-flex items-center justify-center hover:bg-gray-100 rounded"
                    id="rv-prev"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    className="h-8 w-8 inline-flex items-center justify-center hover:bg-gray-100 rounded"
                    id="rv-next"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <RecentlyViewed
                items={recent}
                prevBtn="#rv-prev"
                nextBtn="#rv-next"
              />
            </div>

            {/* Help & Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-2">
              <h3 className="sr-only">Help & Info</h3>
              <ul className="divide-y">
                <li className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded border">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M3 7h18M6 3h12M6 21h12M3 17h18" />
                      </svg>
                    </span>
                    <span>Track Order</span>
                  </div>
                  <Link
                    href="/track-order"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    {">"}
                  </Link>
                </li>
                <li className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded border">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M12 20v-6m0-4V4m-6 8h12" />
                      </svg>
                    </span>
                    <span>FAQs</span>
                  </div>
                  <Link
                    href="/help/faqs"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    {">"}
                  </Link>
                </li>
                <li className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded border">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M21 10v10H3V4h11l7 6z" />
                      </svg>
                    </span>
                    <span>Contact Us</span>
                  </div>
                  <Link
                    href="/contact"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    {">"}
                  </Link>
                </li>
                <li className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded border">
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M4 7h16M4 12h16M4 17h16" />
                      </svg>
                    </span>
                    <span>Terms & Conditions</span>
                  </div>
                  <Link
                    href="/legal/terms"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    {">"}
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
