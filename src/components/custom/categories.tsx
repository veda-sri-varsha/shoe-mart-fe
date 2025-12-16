"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { categories } from "@/constants/categories";
import Link from "next/link";

export function Categories() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative px-10 py-3 bg-white">
      <Button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-2 border border-gray-200"
      >
        <ChevronLeft className="h-5 w-5 text-gray-700" />
      </Button>

      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-6 scrollbar-hide"
      >
        {categories.map((cat) => (
          <Link
            key={cat.title}
            href={`/products?category=${encodeURIComponent(cat.title)}`}
            className="focus:outline-none"
          >
            <div
              key={cat.title}
              className={`flex flex-col items-center justify-center min-w-32 min-h-15 rounded-2xl shadow-sm border border-gray-200 cursor-pointer transition ${cat.bg}`}
            >
              <Image
                src={cat.image}
                width={80}
                height={40}
                alt={cat.title}
                className="object-contain mt-2"
                unoptimized
              />
              <Typography
                as="span"
                variant="small"
                className="font-medium text-center mt-2 mb-3 text-black px-2"
              >
                {cat.title}
              </Typography>
            </div>
          </Link>
        ))}
      </div>

      <Button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 shadow-md rounded-full p-2 border border-gray-200"
      >
        <ChevronRight className="h-5 w-5 text-gray-700" />
      </Button>
    </div>
  );
}
