"use client";

import {
  UserRatingIcon,
  MadeInIndiaIcon,
  RecycleBottleIcon,
  EMIIcon,
  PlantIcon,
} from "@/components/icons/icons";

export default function TextIcons() {
  return (
    <>
      <section className="w-full px-6 p-6">
        <div className="bg-neutral-800 rounded-xl py-15 flex flex-col md:flex-row items-center justify-between max-w-full md:max-w-8xl mx-auto gap-8 md:gap-0">
          <div className="flex flex-col items-center flex-1 min-w-[120px]">
            <UserRatingIcon />
            <p className="mt-2 font-semibold text-base text-neutral-500 text-center">
              4M+ Happy Customers
            </p>
          </div>
          <div className="flex flex-col items-center flex-1 min-w-[120px]">
            <MadeInIndiaIcon />
            <p className="mt-2 font-semibold text-base text-neutral-500 text-center">
              Proudly Made in India
            </p>
          </div>
          <div className="flex flex-col items-center flex-1 min-w-[120px]">
            <RecycleBottleIcon />
            <p className="mt-2 font-semibold text-base text-neutral-500 text-center">
              3.2M+ Plastic bottles recycled
            </p>
          </div>
          <div className="flex flex-col items-center flex-1 min-w-[120px]">
            <EMIIcon />
            <p className="mt-2 font-semibold text-base text-neutral-500 text-center">
              No Cost EMIs via UPI
            </p>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-12 flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-30 h-16 border border-gray-300 rounded-full mb-4">
            <PlantIcon />
          </div>
          <h2 className="text-green-700 text-3xl md:text-4xl font-medium text-center mb-2">
            Good for You &amp; Better for the Planet
          </h2>
          <div className="text-gray-600 text-base md:text-lg text-center max-w-5xl font-normal">
            We are mindful of what we create and how it shapes the world around
            us. With a focus on circularity and transparency,{" "}
            <span className="text-green-700 font-semibold">
              we’re crafting a future that’s better than yesterday.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
