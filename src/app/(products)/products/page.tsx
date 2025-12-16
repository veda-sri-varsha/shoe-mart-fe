"use client";

import * as React from "react";
import Link from "next/link";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ProductList } from "./_components/product-list";
import { ProductFilters } from "./_components/product-filters";
import { Product } from "@/types/products";
import { ChevronRight, Home } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getAllProducts } from "@/services/api/products";
import { useFilters } from "@/hooks/useFilters";
import { SORT_OPTIONS } from "@/constants/products-card";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function ProductsPage() {
  const [selectedSort, setSelectedSort] = React.useState(SORT_OPTIONS[0]);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const PAGE_SIZE = 25;
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  // Use custom hook for filters
  const { selectedFilters, toggleFilter, filteredProducts } =
    useFilters(products);

  // Fetch products page wise and append
  const fetchProducts = React.useCallback(
    async (pageToLoad: number) => {
      if ((loadingMore && pageToLoad !== 1) || (!hasMore && pageToLoad !== 1))
        return;

      if (pageToLoad === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const response = await getAllProducts({
          page: pageToLoad,
          limit: PAGE_SIZE,
          search: search,
        });

        if (pageToLoad === 1) {
          setProducts(response.products);
        } else {
          setProducts((prev) => [...prev, ...response.products]);
        }

        setPage(response.page);
        setHasMore(response.page * response.limit < response.totalProducts);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [loadingMore, hasMore, search]
  );

  // Initial fetch
  React.useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  // Load more handler
  const loadMore = React.useCallback(() => {
    if (hasMore && !loadingMore) {
      fetchProducts(page + 1);
    }
  }, [fetchProducts, hasMore, loadingMore, page]);

  // IntersectionObserver to trigger loadMore on scroll near bottom
  React.useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [loadMore]);

  const sortedProducts = React.useMemo(() => {
    const sorted = [...filteredProducts];
    switch (selectedSort.value) {
      case "price-low-high":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return sorted.sort((a, b) => b.price - a.price);
      case "featured":
      default:
        return sorted.sort((a, b) => b.sold - a.sold);
    }
  }, [filteredProducts, selectedSort]);

  return (
    <div className="bg-neutral-50 pb-10 min-h-screen">
      <div className="max-w-8xl mx-auto w-full px-6 pt-8">
        <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6">
          <Image
            src="/products-banner.png"
            alt="All Products Banner"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-6 left-6 text-white">
            <Typography as="h1" variant="h2" className="text-white">
              All Products
            </Typography>
            <p className="text-white/90 text-sm">
              Explore comfort & style for every step
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-muted-foreground text-base">
            <Link href="/" tabIndex={0}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Home size={20} />
              </Button>
            </Link>
            <ChevronRight size={18} className="text-muted-foreground" />
          </div>
          <div className="flex items-end justify-between">
            <Typography
              as="h1"
              variant="h2"
              className="font-semibold text-left text-accent tracking-tight border-none pb-0 mb-0"
            >
              All Products
            </Typography>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full hover:bg-white border border-muted px-6 py-2 text-base flex items-center gap-2 min-w-12 justify-between"
                >
                  <span className="text-muted-foreground">Sort by:</span>
                  <span className="text-foreground font-medium">
                    {selectedSort.label}
                  </span>
                  <ChevronRight
                    size={18}
                    className="ml-2 rotate-90 text-muted-foreground"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {SORT_OPTIONS.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() => setSelectedSort(option)}
                    className={
                      option.value === selectedSort.value ? "font-bold" : ""
                    }
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="border-b border-neutral-200 mt-4"></div>
      </div>
      <main className="max-w-7xl mx-auto flex pt-10 px-6 gap-10">
        <aside className="w-72 hidden lg:block">
          <ProductFilters
            selectedFilters={selectedFilters}
            toggleFilterAction={toggleFilter}
          />
        </aside>
        <section className="flex-1">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <>
              <ProductList products={sortedProducts} />
              <div ref={bottomRef} className="h-10" />
              {loadingMore && (
                <Button disabled className="w-full rounded-full">
                  Loading more...
                </Button>
              )}
              {!hasMore && !loading && (
                <p className="text-center py-4 text-muted-foreground">
                  You have seen all products.
                </p>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
