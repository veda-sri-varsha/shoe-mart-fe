"use client";

import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { deals } from "@/constants/index";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/cart-context";

export default function NewLaunches() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  const { add } = useCart();

  return (
    <section className="w-full bg-gray-200 py-10 px-4 md:px-10">
      <div className="flex items-center justify-between mb-6">
        <Typography
          as="h2"
          variant="h2"
          className="text-neutral-800 font-normal"
        >
          Deal of the Day
        </Typography>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center border border-gray-300 hover:bg-gray-200"
            onClick={() => scroll(-320)}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-amber-50 border border-gray-600 hover:bg-gray-200"
            onClick={() => scroll(320)}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 md:gap-6 overflow-x-auto scrollbar-hide pb-2"
      >
        {deals.map((item, idx) => (
          <div className="flex-none w-72 max-w-xs" key={idx}>
            <Card className="rounded-2xl shadow flex flex-col border-0 bg-white transition hover:shadow-md h-full">
              <CardContent className="flex flex-col w-full p-0">
                <div className="w-full flex flex-col items-center pt-6 pb-2 px-4">
                  <div className="flex gap-2 w-full mb-2">
                    {item.badges.map((badge) => (
                      <Typography
                        as="span"
                        variant="small"
                        key={badge}
                        className={
                          "px-2 py-1 rounded-full text-xs font-semibold " +
                          (badge === "Best Seller"
                            ? "bg-blue-100 text-blue-700"
                            : badge === "Deal of Day"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-200 text-green-800")
                        }
                      >
                        {badge}
                      </Typography>
                    ))}
                  </div>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={170}
                    height={170}
                    className="object-contain drop-shadow mb-2"
                    unoptimized
                  />

                  <div className="flex items-center gap-1 mb-2 mt-1 w-full">
                    <Typography
                      as="span"
                      variant="muted"
                      className="inline-flex items-center px-2 py-1 bg-gray-100 rounded-full text-neutral-600 text-xs font-medium"
                    >
                      <Star className="w-4 h-4 text-[#fac917] fill-[#fac917] mr-1" />
                      {item.rating} ({item.reviews})
                    </Typography>
                  </div>

                  <div className="w-full flex items-center justify-center rounded-xl my-2 py-2 px-1 gap-2 bg-gray-50">
                    {item.colors.map((color, cidx) => (
                      <div
                        key={cidx}
                        className="w-8 h-8 rounded border flex items-center justify-center bg-white"
                      >
                        <Image
                          src={color}
                          alt=""
                          width={100}
                          height={100}
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col px-4 pb-6 pt-4 grow">
                  <Typography
                    as="h3"
                    variant="p"
                    className="mb-2 font-medium text-sm text-neutral-900"
                  >
                    {item.title}
                  </Typography>
                  <div className="flex items-end gap-2 mb-3">
                    <Typography
                      as="span"
                      variant="lead"
                      className="text-green-700 text-lg font-bold"
                    >
                      ₹{item.price.toLocaleString()}
                    </Typography>
                    <Typography
                      as="span"
                      variant="muted"
                      className="line-through text-gray-500 text-base"
                    >
                      ₹{item.oldPrice.toLocaleString()}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-green-700 font-semibold"
                    >
                      {item.discount}
                    </Typography>
                  </div>
                  <Button
                    variant="default"
                    className="w-full bg-neutral-800 text-white rounded-full py-3 font-semibold text-base flex items-center justify-center gap-2 hover:bg-neutral-900 transition"
                    onClick={() => {
                      add({
                        product: {
                          _id: `temp-${idx}`,
                          name: item.title,
                          price: item.price,
                          images: [{ url: item.image }],
                          brand: "Neeman’s",
                          description: item.title,
                          ratings: Number(item.rating),
                          category: "",
                          stock: 0,
                          sold: 0,
                          collectionId: "",
                          isDeleted: false,
                        },
                        quantity: 1,
                        size: "default",
                      });
                      toast.success("Added to cart!");
                    }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <Typography
                      as="span"
                      variant="small"
                      className="font-semibold"
                    >
                      Add to Cart
                    </Typography>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
