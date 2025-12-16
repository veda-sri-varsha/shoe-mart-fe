"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { getProductById } from "@/services/api/products";
import { Product } from "@/types/products";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { add } = useCart();

  useEffect(() => {
    if (!id) return;
    const productId = Array.isArray(id) ? id[0] : id;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await getProductById({ productId });
        if (!res.data?.product) setProduct(null);
        else setProduct(res.data.product);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    add({ product, quantity: 1 });
    toast.success("Added to cart!");
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-12">
      <div className="flex-1 flex justify-center">
        <Image
          src={product.images[0]?.url ?? "/placeholder.png"}
          width={600}
          height={600}
          className="rounded-xl object-contain"
          alt={product.name}
          unoptimized
        />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <h1 className="text-4xl font-bold">{product.name}</h1>
        <p className="text-3xl font-semibold text-green-700">
          ₹{product.price}
        </p>
        <p className="text-gray-600">Brand: {product.brand}</p>
        <p>
          ⭐ {product.ratings} | Sold: {product.sold}
        </p>

        <p className="text-gray-800 mt-4">{product.description}</p>

        <Button
          className="w-full rounded-full bg-black text-white py-4 flex items-center justify-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
