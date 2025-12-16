"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/products";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { badgeClassMap } from "@/constants/products-card";
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  const mainImage = product.images?.[0]?.url ?? "/placeholder.png";
  const { add } = useCart();

  const handleAddToCart = () => {
    add({ product, quantity: 1, size: "default" });
    toast.success("Added to cart!");
  };

  const badges = Array.isArray(product.badge)
    ? product.badge
    : product.badge
    ? [product.badge]
    : [];

  return (
    <Card className="rounded-2xl bg-gray-100 flex flex-col h-full">
      <CardHeader className="flex gap-2">
        {badges.map((badge) => {
          const key = badge.trim().toLowerCase();
          const badgeClass =
            badgeClassMap[key] || "bg-neutral-100 text-neutral-700";
          return (
            <Badge
              key={badge}
              className={`${badgeClass} uppercase text-xs font-semibold px-2 py-1 rounded`}
            >
              {badge}
            </Badge>
          );
        })}
      </CardHeader>

      <CardContent className="flex justify-center items-center pt-4 pb-3">
        <Link
          href={`/products/${product._id}`}
          className="group relative overflow-hidden rounded-2xl"
        >
          {" "}
          <Image
            src={mainImage}
            width={300}
            height={140}
            alt={product.name}
            className="object-contain"
            unoptimized
          />
        </Link>
      </CardContent>
      <div className="flex items-center bg-amber-50 border border-neutral-200 rounded-full px-3 py-1 w-fit mx-auto mb-3 shadow-sm ml-2">
        <Typography
          variant="lead"
          className="text-sm font-semibold text-neutral-800"
        >
          {product.ratings?.toFixed(2)} ({product.sold})
        </Typography>
      </div>

      <div className="bg-white rounded-2xl px-3 py-2 flex flex-col gap-2 m-2">
        <Typography
          variant="muted"
          className="text-neutral-900 font-medium truncate"
        >
          {product.name}
        </Typography>

        <Typography variant="muted" className="font-medium text-neutral-900">
          Rs. {product.price?.toLocaleString()}
        </Typography>

        <Button
          variant="outline"
          className="w-full rounded-full border-2 border-gray-200 hover:bg-gray-200"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5" />
          <Typography as="span" variant="muted">
            Add to Cart
          </Typography>
        </Button>
      </div>
    </Card>
  );
}
