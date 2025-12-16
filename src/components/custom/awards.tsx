"use client";

import { Typography } from "@/components/ui/typography";
import { AwardIcon } from "@/components/icons/icons";

export function Awards() {
  return (
    <section className="w-full py-12 flex justify-center bg-transparent">
      <div className="w-full max-w-7xl bg-neutral-900 rounded-3xl px-10 py-12 flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-4 m-4 ">
          <div className="bg-neutral-700 rounded-4xl px-8 py-3 w-fit">
            <AwardIcon className="w-8 h-8 text-white" />
          </div>

          <Typography
            as="h2"
            variant="h2"
            className="text-white font-normal tracking-tight text-3xl border-none"
          >
            Featured In
          </Typography>

          <Typography
            as="p"
            variant="muted"
            className="text-neutral-300 text-sm leading-snug"
          >
            Our award-winning designs are shaping the future of everyday wear
          </Typography>
        </div>

        <div className="flex-[1.8] grid grid-cols-6 gap-4 w-full">
          <div className="col-span-2 bg-neutral-800 rounded-xl py-5 text-center text-white font-semibold">
            Forbes
          </div>

          <div className="col-span-4 bg-neutral-800 rounded-xl py-5 text-center text-white font-serif whitespace-nowrap">
            The Economic Times
          </div>

          <div className="col-span-4 bg-neutral-800 rounded-xl py-5 text-center text-white font-serif">
            THE HINDU
          </div>

          <div className="col-span-2 bg-neutral-800 rounded-xl py-5 text-center text-white font-bold">
            YOURSTORY
          </div>

          <div className="col-span-3 bg-neutral-800 rounded-xl py-5 text-center text-white font-semibold">
            Inc42
          </div>

          <div className="col-span-3 bg-neutral-800 rounded-xl py-5 text-center text-white font-serif">
            Entrepreneur
          </div>
        </div>
      </div>
    </section>
  );
}
