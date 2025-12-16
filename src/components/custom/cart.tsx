"use client";

import React from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Typography } from "@/components/ui/typography";
import { CartItem as CartIcon } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import { Trash2, Truck, ShoppingCart, CheckCircle2, ChevronRight } from "lucide-react";

const recommendedCategories = [
  { label: "Sneakers", href: "/sneakers" },
  { label: "Slip Ons", href: "/slip-ons" },
  { label: "Loafers", href: "/loafers" },
  { label: "Oxfords", href: "/oxfords" },
  { label: "Flip Flops", href: "/flip-flops" },
];

export function CartSheet() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [couponCode, setCouponCode] = React.useState("");
  const { items, cartCount, remove, updateQuantity } = useCart(); // Ensure updateQuantity exists

  // Progress bar logic
  const barStages = [
    { label: "7% OFF", threshold: 2 },
    { label: "10% OFF", threshold: 3 },
  ];

  const currentDiscount = barStages.find((s) => cartCount >= s.threshold)?.label || "";
  const needed = Math.max(0, barStages[0].threshold - cartCount);
  const progressPercent = cartCount >= barStages[1].threshold ? 100 : cartCount >= barStages[0].threshold ? 67 : cartCount * 33;

  const cartTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleQuantityChange = (productId: string, size: string | undefined, delta: number) => {
    const item = items.find((i) => i.product._id === productId && i.size === size);
    if (!item) return;

    const newQuantity = item.quantity + delta;
    if (newQuantity <= 0) {
      remove(productId, size);
    } else {
      updateQuantity(productId, size, newQuantity); // This must exist in context
    }
  };

  return (
    <>
      {/* Cart Button */}
      <Button
        onClick={() => setIsCartOpen(true)}
        variant="ghost"
        className="relative flex flex-col items-center gap-1 px-4 py-2 hover:bg-gray-50"
      >
        <CartIcon className="h-6 w-6" />
        <Typography variant="small" className="text-sm text-black">Cart</Typography>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-600 text-xs text-white flex items-center justify-center font-medium">
            {cartCount}
          </span>
        )}
      </Button>

      {/* Cart Sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="right" className="w-full max-w-md bg-white flex flex-col overflow-hidden shadow-md">
          <SheetTitle className="sr-only">Cart</SheetTitle>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <Typography variant="h1" className="text-2xl font-normal text-accent">Cart ({cartCount})</Typography>
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)} className="h-8 w-8 rounded-full hover:bg-gray-100" />
          </div>

          {/* Discount Progress */}
          {cartCount > 0 && (
            <div className="px-6 py-3 bg-[#e8f5e1] border-b border-gray-200 rounded-lg mb-2">
              <Typography variant="small" className="text-sm text-gray-900 font-medium mb-2 block">
                {needed > 0 ? `Add ${needed} more product for Extra 7% OFF` : `Discount Available: ${currentDiscount}`}
              </Typography>
              <div className="relative h-2 bg-white rounded-full overflow-hidden mb-2">
                <div className="h-2 bg-[#16a34a] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                <div
                  className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
                  style={{ left: `${progressPercent}%`, marginLeft: "-12px" }}
                >
                  <div className="w-6 h-6 bg-[#16a34a] rounded-full flex items-center justify-center shadow-md">
                    <ShoppingCart className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-[11px] text-gray-600">
                {barStages.map((stage, i) => (
                  <span key={i} className="flex items-start gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-1"></span>
                    <span>{stage.label}<br />{stage.threshold} items</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cartCount === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <CartIcon className="h-16 w-16 text-gray-300 mb-4" />
                <Typography variant="h3" className="text-2xl font-semibold mb-2">Your cart is empty!</Typography>
                <Typography variant="muted" className="text-gray-500 mb-6">Find your perfect fit in our trending collections.</Typography>
                <div className="flex flex-wrap gap-2 justify-center">
                  {recommendedCategories.map((cat) => (
                    <Button key={cat.href} variant="outline" size="sm" className="rounded-full" asChild>
                      <Link href={cat.href}>{cat.label}</Link>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={`${item.product._id}-${item.size ?? ""}`} className="flex gap-3 pb-4 border-b border-gray-200 last:border-b-0">
                      <Image
                        src={item.product.images[0]?.url ?? ""}
                        alt={item.product.name}
                        width={80}
                        height={100}
                        className="rounded-md object-cover bg-white border border-gray-200"
                        unoptimized
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <Typography variant="p" className="text-sm font-medium leading-tight text-accent">{item.product.name}</Typography>
                          <Button variant="ghost" size="icon" onClick={() => remove(item.product._id, item.size)} className="h-6 w-6 hover:bg-gray-100">
                            <Trash2 className="h-4 w-4 text-gray-400" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Typography variant="p" className="text-base font-bold text-gray-700">Rs. {item.product.price.toLocaleString("en-IN")}</Typography>
                          {item.product.badge && <Typography variant="small" className="text-xs text-green-700 font-semibold">{item.product.badge}</Typography>}
                        </div>
                        <Typography variant="muted" className="text-xs text-gray-500 mb-1">Size: {item.size ?? "UK 7"}</Typography>
                        <Typography variant="muted" className="text-xs text-gray-500 mb-2">GST Benefit: Rs. 194/pair</Typography>
                        <div className="flex items-center border border-gray-300 rounded w-fit overflow-hidden">
                          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.product._id, item.size, -1)} className="h-8 w-8 hover:bg-gray-50">−</Button>
                          <span className="text-sm w-8 text-center border-x border-gray-300 py-1 font-medium">{item.quantity}</span>
                          <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(item.product._id, item.size, 1)} className="h-8 w-8 hover:bg-gray-50">+</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Similar Products */}
                <div className="py-4 border-t border-gray-200">
                  <Typography variant="h3" className="text-lg font-medium mb-3">Similar products</Typography>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="shrink-0 w-32 h-40 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                        <Typography variant="muted" className="text-xs">Product {i}</Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          {cartCount > 0 && (
            <div className="border-t border-gray-200 bg-white mt-auto">
              {/* Delivery */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-gray-600" />
                  <Typography variant="small" className="text-sm text-gray-700">Check Delivery Date</Typography>
                </div>
                <Button variant="outline" size="sm" className="h-8 px-6 rounded hover:bg-gray-300 text-sm font-medium">Check</Button>
              </div>

              {/* Price and Checkout */}
              <div className="px-6 py-4">
                <div className="flex items-end justify-between mb-3">
                  <div>
                    <Typography variant="h3" className="text-lg font-bold mb-1 text-black">Rs. {cartTotal.toLocaleString("en-IN")}.00</Typography>
                    <Button variant="link" onClick={() => setShowDetails(!showDetails)} className="h-auto p-0 text-xs text-blue-600 hover:no-underline">View Details</Button>
                  </div>
                  <Button className="px-6 py-2.5 rounded bg-black text-white text-sm font-semibold hover:bg-neutral-900" asChild>
                    <Link href="/checkout" className="flex items-center gap-2">Proceed To Checkout <ChevronRight className="w-4 h-4" /></Link>
                  </Button>
                </div>

                {showDetails && (
                  <div className="pt-3 border-t border-gray-200 space-y-3">
                    <div className="flex justify-between text-sm">
                      <Typography variant="muted">Discounted Price</Typography>
                      <Typography>Rs. {(cartTotal + 150).toLocaleString("en-IN")}</Typography>
                    </div>
                    <div className="flex justify-between text-sm">
                      <Typography variant="muted">Shipping</Typography>
                      <Typography className="text-green-600 font-semibold">FREE</Typography>
                    </div>

                    {/* Coupon Section */}
                    <div className="pt-3 border-t border-gray-200">
                      <Typography variant="muted" className="text-sm mb-2">Additional Discount:</Typography>
                      <div className="flex gap-2 mb-3">
                        <Input type="text" placeholder="Enter Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="flex-1 h-10" />
                        <Button className="px-6 bg-[#d97706] hover:bg-[#b45309] text-white font-semibold">Apply</Button>
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-gray-50 rounded border border-gray-200">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <Typography variant="muted" className="text-xs mb-1 text-black">Recommended</Typography>
                          <div className="flex items-center justify-between">
                            <div>
                              <Typography variant="p" className="text-sm font-bold text-green-700">COMFORT5</Typography>
                              <Typography variant="muted" className="text-xs">Extra 5% discount</Typography>
                            </div>
                            <Button variant="link" className="h-auto p-0 text-sm font-semibold text-[#d97706] hover:no-underline">Apply</Button>
                          </div>
                        </div>
                      </div>
                      <Typography variant="muted" className="text-xs mt-2">* More coupons & offers available in checkout</Typography>
                    </div>

                    {/* Final Price */}
                    <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                      <Typography variant="p" className="text-base font-semibold text-black">Final Price</Typography>
                      <Typography variant="p" className="text-base font-bold">Rs. {cartTotal.toLocaleString("en-IN")}</Typography>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
