"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import {
  CATEGORY_LIST,
  USE_LIST,
  FOOTER_LINKS,
  PAYMENT_ICONS,
  SOCIAL_ICONS,
  RECENT_SEARCHES,
} from "@/constants/footer";

export function Footer() {
  return (
    <footer className="w-full bg-stone-100 border-t border-neutral-200">
      <div className="w-full py-10 flex items-center justify-center border-b border-neutral-200 bg-stone-100 ">
        <Typography
          as="h2"
          variant="h1"
          className="uppercase text-neutral-200 tracking-widest font-extrabold flex items-center text-3xl md:text-4xl"
        >
          DESIGNED FOR YOU &amp; PLANET
          <span className="inline-block mx-2">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 20 20"
              className="text-neutral-100"
            >
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            </svg>
          </span>
          DESIGNED FOR YOU
        </Typography>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        <div>
          <Typography
            as="h3"
            variant="muted"
            className="uppercase text-neutral-600 tracking-wide border-b border-neutral-300 mb-4 pb-1"
          >
            Shop By Category
          </Typography>
          <div className="grid grid-cols-2 gap-y-1 md:gap-y-2 gap-x-8 text-neutral-700">
            {CATEGORY_LIST.slice(0, 5).map((cat) => (
              <span key={cat}>{cat}</span>
            ))}
            {CATEGORY_LIST.slice(5).map((cat) => (
              <span key={cat}>{cat}</span>
            ))}
          </div>
        </div>
        <div>
          <Typography
            as="h3"
            variant="muted"
            className="uppercase text-neutral-600 tracking-wide border-b border-neutral-300 mb-4 pb-1"
          >
            Shop By Use
          </Typography>
          <div className="grid grid-cols-2 gap-y-1 md:gap-y-2 gap-x-8 text-neutral-700">
            {USE_LIST.slice(0, 6).map((use) => (
              <span key={use}>{use}</span>
            ))}
            {USE_LIST.slice(6).map((use) => (
              <span key={use}>{use}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Card className="bg-[#e4ecdf] rounded-lg px-6 py-8 w-full max-w-md">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-[#d9e9d4] p-2 mb-2">
                <svg width="24" height="24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2C13.66 2 15 3.34 15 5V7.08C17.93 8.17 20 10.94 20 14V19H4V14C4 10.94 6.07 8.17 9 7.08V5C9 3.34 10.34 2 12 2Z"
                    stroke="#48b96f"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <Typography
                as="h3"
                variant="h1"
                className="text-neutral-700 mb-2 text-center"
              >
                Let’s walk greener paths Together!
              </Typography>
              <Typography
                as="p"
                variant="muted"
                className="text-neutral-700 mb-3 text-center"
              >
                Discover comfort that cares — for you and the earth.
              </Typography>
              <form className="w-full flex flex-col sm:flex-row gap-2">
                <Input
                  placeholder="Enter your email address"
                  className="flex-1 rounded-full"
                />
                <Button className="rounded-full font-semibold bg-gray-900 text-white px-6 py-3">
                  Subscribe
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-6 gap-x-10 gap-y-8 py-10 border-t border-neutral-200">
        {FOOTER_LINKS.map(({ title, items }) => (
          <div key={title}>
            <Typography
              as="h6"
              variant="muted"
              className="text-neutral-600 border-b border-neutral-300 pb-1 mb-2 uppercase tracking-wide"
            >
              {title}
            </Typography>
            <ul className="space-y-1 text-base text-neutral-800">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {title === "Contact Us" && (
              <div className="flex flex-col gap-3">
                <div className="flex gap-4 mb-1">
                  <Card className="flex-1 flex flex-col  items-center justify-center rounded-md border border-neutral-300 bg-white shadow px-15 py-4">
                    <Typography
                      as="span"
                      variant="muted"
                      className="text-neutral-800 text-sm font-semibold"
                    >
                      Live chat
                    </Typography>
                  </Card>
                  <Card className="flex-1 flex flex-col items-center justify-center rounded-md border border-neutral-300 bg-white shadow px-15 py-4">
                    <Typography
                      as="span"
                      variant="muted"
                      className="text-neutral-800 text-sm font-semibold"
                    >
                      +91 90599 38941
                    </Typography>
                  </Card>
                </div>
                <div className="flex justify-center gap-2 text-neutral-600 text-sm">
                  Everyday (10 AM - 7 PM)
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-4 py-6 border-t border-neutral-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Typography
              as="span"
              variant="muted"
              className="font-bold text-neutral-600"
            >
              Social
            </Typography>
            <div className="flex gap-2">
              {SOCIAL_ICONS.map(({ name, Icon }) => (
                <Button
                  key={name}
                  variant="ghost"
                  size="icon"
                  className="rounded-md border border-neutral-300 hover:bg-neutral-200"
                >
                  <Icon className="w-8 h-8 text-neutral-800" />
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {PAYMENT_ICONS.map(({ name, url }) => (
            <Image
              key={name}
              src={url}
              alt={name}
              width={56}
              height={24}
              className="object-contain border border-neutral-200 rounded-md px-1"
              loading="lazy"
              unoptimized
            />
          ))}
        </div>

        <Typography
          as="div"
          variant="small"
          className="flex justify-center text-neutral-600 font-medium pt-4"
        >
          <svg width="20" height="20" fill="none" className="mr-2">
            <circle
              cx="10"
              cy="10"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M7 10.5l2 2 4-4"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          100% Secure Transaction
        </Typography>
      </div>

      <div className="max-w-7xl mx-auto border-t border-neutral-200 py-8 px-4">
        <Typography
          as="h6"
          variant="muted"
          className="mb-2 font-semibold text-neutral-800"
        >
          Neeman’s was founded in 2017
        </Typography>
        <Typography
          as="p"
          variant="muted"
          className="mb-6 max-w-8xl text-neutral-700"
        >
          The idea of Neeman’s came to life while addressing the problem
          statement of ‘Why can’t there be one shoe for everything?’. So, we
          went to work creating minimal designs that are multi-use and fit
          effortlessly into everyday lives. But we didn’t just stop there, for
          we wanted to deliver fashion that is both comfortable and responsible,
          good for you & the planet. 5 years and over a million pairs sold
          later, Neeman’s is now largely regarded as the brand that is
          revolutionizing footwear trends in the country and encouraging Indians
          to Change The Norm with what they buy.
        </Typography>
        <Typography
          as="h6"
          variant="muted"
          className="mt-4 mb-2 font-bold text-neutral-800"
        >
          Recent Searches
        </Typography>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-base">
          {RECENT_SEARCHES.map((term) => (
            <Link href="#" key={term} className="underline text-sm">
              {term}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full">
        <Typography
          as="div"
          variant="muted"
          className="text-neutral-500 font-semibold text-center mb-2 py-4 border-t border-neutral-200"
        >
          © 2025 Neeman’s - All rights Reserved
        </Typography>
      </div>
    </footer>
  );
}
