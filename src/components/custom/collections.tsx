"use client";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    label: "Men",
    image: "/men-shoe.png",
    alt: "Men's Shoe",
  },
  {
    label: "Women",
    image: "/women-shoe.png",
    alt: "Women's Shoe",
  },
  {
    label: "Limited stocks",
    image: "/limited-stock.png",
    alt: "Limited Stock",
  },
  {
    label: "Trending",
    image: "/trending-shoes.png",
    alt: "Trending Shoe",
  },
];

export default function CollectionGrid() {
  return (
    <>
      <section className="w-full px-6 py-12 bg-white">
        <div className="flex flex-col items-center">
          <Typography
            as="h2"
            variant="h2"
            className="text-neutral-700 text-center mb-10 font-normal"
          >
            Shop by Collection
          </Typography>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {collections.map((item) => (
              <Link
                key={item.label}
                href={`/products?category=${encodeURIComponent(item.label)}`}
                className="relative rounded-3xl flex flex-col items-center py-8 px-4 shadow transition-transform cursor-pointer min-h-112 overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="relative z-10 flex flex-col items-center w-full h-full">
                  <Typography
                    as="span"
                    variant="h2"
                    className="text-neutral-700 text-3xl md:text-2xl font-primary mt-10 mb-8"
                  >
                    {item.label}
                  </Typography>
                  <Button
                    variant="ghost"
                    className="w-full max-w-[90%] h-12 mt-auto rounded-full bg-white text-neutral-800 font-secondary text-lg font-normal shadow-none border-none flex items-center justify-center gap-2 hover:bg-neutral-50 transition"
                  >
                    <Typography
                      as="span"
                      variant="lead"
                      className="font-normal text-base"
                    >
                      View Product
                    </Typography>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              className="flex items-center gap-2 px-8 py-6 rounded-full border border-neutral-400 bg-white text-neutral-800 font-secondary text-sm font-normal hover:bg-neutral-50 transition tracking-wide shadow-none"
            >
              <Typography
                as="span"
                variant="lead"
                className="font-normal text-black"
              >
                View All
              </Typography>
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      </section>
      <div className="w-full">
        <Image
          src="/banner.png"
          alt="banner"
          width={1920}
          height={400}
          className="w-full h-auto"
          priority
        />
      </div>
    </>
  );
}
