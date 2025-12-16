"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

type Item = {
  id: string;
  title: string;
  badge?: string;
  image: string;
  rating?: number;
  reviews?: number;
};

export default function RecentlyViewed({
  items,
  prevBtn,
  nextBtn,
}: {
  items: Item[];
  prevBtn: string;
  nextBtn: string;
}) {
  const scroller = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const prev = document.querySelector<HTMLButtonElement>(prevBtn);
    const next = document.querySelector<HTMLButtonElement>(nextBtn);
    const el = scroller.current;
    if (!el || !prev || !next) return;

    const onPrev = () => el.scrollBy({ left: -320, behavior: "smooth" });
    const onNext = () => el.scrollBy({ left: 320, behavior: "smooth" });

    prev.addEventListener("click", onPrev);
    next.addEventListener("click", onNext);
    return () => {
      prev.removeEventListener("click", onPrev);
      next.removeEventListener("click", onNext);
    };
  }, [prevBtn, nextBtn]);

  return (
    <>
      <div
        ref={scroller}
        className="mt-4 flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-2"
      >
        {items.map((p) => {
          const badges = (p.badge ?? "")
            .split("|")
            .map((s) => s.trim())
            .filter(Boolean);
          return (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="min-w-[260px] max-w-[260px] rounded-xl border border-gray-200 overflow-hidden bg-white"
            >
              <div className="relative h-48 bg-gray-50">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-contain p-4"
                  sizes="260px"
                />
                <div className="absolute left-2 top-2 flex gap-2">
                  {badges.map((b) => (
                    <span
                      key={b}
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        b === "Best Seller"
                          ? "bg-blue-50 border-blue-200 text-blue-700"
                          : b === "Trending"
                          ? "bg-green-50 border-green-200 text-green-700"
                          : b === "New"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : ""
                      }`}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 space-y-2">
                <div className="flex items-center gap-1 text-xs text-gray-700">
                  <Star className="h-3 w-3 fill-yellow-400 stroke-yellow-400" />
                  <span>{p.rating?.toFixed(2) ?? "4.6"}</span>
                  <span className="text-gray-500">({p.reviews ?? 0})</span>
                </div>
                <p className="text-sm text-gray-800 line-clamp-2">{p.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
