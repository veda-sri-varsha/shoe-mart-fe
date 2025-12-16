"use client";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { IMPACT_IMAGE, COMFORT_IMAGE, BULK_IMAGE } from "@/constants/index";
import { LeafIcon, StoreIcon, GiftIcon } from "@/components/icons/icons";
import { ChevronRight } from "lucide-react";

export function FeaturedIn() {
  return (
    <section className="w-full py-10 space-y-7">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-slate-200 flex flex-col items-center justify-center py-36 px-8">
          <div className="mb-8 flex items-center justify-center rounded-full bg-white py-4 px-8">
            <LeafIcon className="text-green-700 w-8 h-8" />
          </div>
          <Typography
            as="h2"
            variant="h2"
            className="text-center mb-6 text-black font-normal"
          >
            Making Every Step Count
          </Typography>
          <Typography
            as="p"
            variant="muted"
            className="text-center mb-8 font-normal max-w-md text-gray-700"
          >
            See how our designs, practices, and choices create impact for people
            and the planet.
          </Typography>
          <Button
            size="lg"
            variant="default"
            className="rounded-full font-semibold px-8 py-3 bg-black text-white flex items-center gap-2 shadow-none"
          >
            View Our Impact
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
        <div className="rounded-3xl overflow-hidden flex items-center justify-center min-h-[380px] bg-white">
          <Image
            src={IMPACT_IMAGE}
            alt="Making Every Step Count"
            width={800}
            height={550}
            className="object-cover w-full h-full"
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl overflow-hidden flex items-center justify-center min-h-[380px] bg-white">
          <Image
            src={COMFORT_IMAGE}
            alt="You Comfort Zone is Nearby"
            width={800}
            height={550}
            className="object-cover w-full h-full"
            priority
            unoptimized
          />
        </div>
        <div className="rounded-3xl bg-gray-100 flex flex-col items-center justify-center py-36 px-8">
          <div className="mb-8 flex items-center justify-center rounded-full bg-white py-4 px-8">
            <StoreIcon className="text-gray-600 w-8 h-8" />
          </div>
          <Typography
            as="h2"
            variant="h2"
            className="text-center mb-6 text-black font-normal"
          >
            You Comfort Zone is Nearby
          </Typography>
          <Typography
            as="p"
            variant="muted"
            className="text-center mb-8 font-normal max-w-md text-gray-700"
          >
            All your favorite styles are ready at a Neeman’s store nearby.
          </Typography>
          <Button
            size="lg"
            variant="default"
            className="rounded-full font-semibold px-8 py-3 bg-black text-white flex items-center gap-2 shadow-none"
          >
            Find Nearest Store
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-3xl bg-yellow-100 flex flex-col items-center justify-center py-36 px-8">
          <div className="mb-8 flex items-center justify-center rounded-full bg-white py-4 px-8">
            <GiftIcon className="text-yellow-700 w-8 h-8" />
          </div>
          <Typography
            as="h2"
            variant="h2"
            className="text-center mb-6 text-black font-normal"
          >
            Corporate &amp; Bulk Orders
          </Typography>
          <Typography
            as="p"
            variant="muted"
            className="text-center mb-8 font-normal max-w-md text-gray-700"
          >
            Connect with us for bulk and corporate orders and enjoy seamless
            service from start to finish.
          </Typography>
          <Button
            size="lg"
            variant="default"
            className="rounded-full font-semibold px-8 py-3 bg-black text-white flex items-center gap-2 shadow-none"
          >
            Enquire Now
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
        <div className="rounded-3xl overflow-hidden flex items-center justify-center min-h-[380px] bg-white">
          <Image
            src={BULK_IMAGE}
            alt="Corporate & Bulk Orders"
            width={800}
            height={550}
            className="object-cover w-full h-full"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
