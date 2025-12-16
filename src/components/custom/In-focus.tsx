"use client";

import { Typography } from "@/components/ui/typography";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { focusImages, hotspots } from "@/constants/product-in-focus";

export function ProductInFocus() {
  return (
    <section className="w-full bg-white py-10">
      <Typography as="h2" variant="h2" className="text-center mb-8 text-black">
        Product in Focus
      </Typography>
      <div className="relative mx-auto w-full max-w-7xl aspect-16/7 bg-gray-100 rounded-2xl overflow-hidden">
        <Image
          src={focusImages.desktop}
          alt="Product in Focus"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {hotspots.map((hotspot) => (
          <Link
            key={hotspot.title}
            href={hotspot.href}
            tabIndex={0}
            className={`
              absolute flex items-center gap-2 px-6 py-3 rounded-full
              bg-white/90 shadow-lg border border-gray-200 hover:shadow-xl
              transition no-underline text-black text-left font-medium
              min-w-44 max-w-xs
              ${hotspot.classes}
            `}
          >
            <Typography as="span" variant="muted" className="font-medium">
              {hotspot.title}
            </Typography>
            <ChevronRight className="w-5 h-5 text-teal-600" />
          </Link>
        ))}
      </div>
    </section>
  );
}
