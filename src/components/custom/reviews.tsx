"use client";

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";
import { testimonials } from "@/constants/index";
import { ChevronRight } from "lucide-react";

export function CustomerTestimonials() {
  return (
    <section className="w-full bg-white py-10 px-4 md:px-12">
      <Typography as="h1" variant="h3" className="mb-10 text-black text-center">
        What Our Customers Say
      </Typography>
      <div className="flex gap-8 md:gap-10 py-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {testimonials.map((testimonial, idx) => (
          <Card
            key={idx}
            className="rounded-2xl bg-neutral-100 shadow-sm flex flex-row w-full md:w-1/2 max-w-2xl min-w-[320px] md:min-w-[600px] shrink-0 snap-center cursor-pointer hover:shadow-lg transition"
          >
            <div className="flex items-start">
              <Image
                src={testimonial.customerImage}
                alt="Customer"
                width={240}
                height={280}
                className="h-96 w-48 md:w-60 p-3 rounded-xl object-cover border border-gray-200"
                unoptimized
              />
            </div>
            <div className="flex flex-col justify-between flex-1 px-6 py-4">
              <div>
                <Typography
                  as="h3"
                  variant="h3"
                  className="mb-2 leading-tight text-black text-left"
                >
                  {testimonial.title}
                </Typography>
                <Typography
                  as="p"
                  variant="muted"
                  className="leading-snug text-left"
                >
                  {testimonial.description}
                </Typography>
              </div>
              <Link
                href={testimonial.product.link}
                className="flex items-center gap-4 mt-6 border rounded-xl bg-white p-4 hover:shadow transition no-underline hover:no-underline"
              >
                <Image
                  src={testimonial.product.image}
                  alt={testimonial.product.name}
                  width={70}
                  height={55}
                  className="object-contain rounded-md"
                  unoptimized
                />
                <div className="flex flex-col flex-1">
                  <Typography
                    as="span"
                    variant="small"
                    className="bg-teal-500 text-white px-2 py-1 rounded w-fit mb-1"
                  >
                    {testimonial.product.badge}
                  </Typography>
                  <Typography as="h4" variant="muted" className="font-semibold">
                    {testimonial.product.name}
                  </Typography>
                  <Typography
                    as="span"
                    variant="small"
                    className="text-yellow-700"
                  >
                    ⭐ {testimonial.product.rating.toFixed(2)} (
                    {testimonial.product.reviews})
                  </Typography>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
