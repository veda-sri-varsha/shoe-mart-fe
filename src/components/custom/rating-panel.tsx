"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { BrandRatingIcon } from "@/components/icons/icons";
import { Typography } from "@/components/ui/typography";

export function BrandRatingPanel() {
  return (
    <section className="w-full py-15 px-8 bg-brown-200 rounded-xl">
      <Card className="flex flex-col md:flex-row items-center justify-between mx-auto rounded-2xl shadow-none bg-amber-100 border-0 px-20 py-18">
        <div className="flex items-center gap-6">
          <div className="block md:hidden">
            <BrandRatingIcon className="text-yellow-700" />
          </div>
          <div>
            <Typography
              as="h6"
              variant="small"
              className="text-yellow-700 mb-2"
            >
              The Ratings Say It All
            </Typography>
            <Typography as="h2" variant="h2" className="text-gray-900">
              Comfort loved and trusted by 4M+ customers
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-8 mt-8 md:mt-0">
          <div className="flex flex-col items-center">
            <Image
              src="/amazon.png"
              alt="Flipkart"
              width={86}
              height={86}
              className="mb-2 object-contain"
            />
            <Typography as="span" variant="small" className="text-yellow-700">
              Flipkart
            </Typography>
          </div>
          <div className="hidden md:block w-px h-12 bg-yellow-300" />
          <div className="flex flex-col items-center">
            <Image
              src="https://neemans.com/cdn/shop/files/Amazon.svg?v=1757056794&width=200"
              alt="Amazon"
              width={86}
              height={86}
              className="mb-2 object-contain"
              unoptimized
            />
            <Typography as="span" variant="small" className="text-yellow-700">
              Amazon
            </Typography>
          </div>
        </div>
      </Card>
    </section>
  );
}
