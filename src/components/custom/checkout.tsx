/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart-context";
import { generateRazorPayOrderId, verifyPayment } from "@/services/api/orders";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import { Trash2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (document.getElementById("razorpay-sdk")) return resolve(true);
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export function CheckoutPage() {
  const { items, updateQuantity, remove, clear } = useCart();
  const [isPaying, setIsPaying] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

  const cartTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handlePayment = async () => {
    if (!items.length) return toast.error("Your cart is empty.");
    if (!shippingName || !shippingPhone)
      return toast.error("Please fill name and phone.");

    setIsPaying(true);

    try {
      const sdkLoaded = await loadRazorpayScript();
      if (!sdkLoaded) {
        toast.error("Razorpay SDK failed to load.");
        setIsPaying(false);
        return;
      }

      const orderRes = await generateRazorPayOrderId({
        amount: cartTotal,
        currency: "INR",
      });
      const orderData = orderRes.data ?? orderRes;
      if (!orderRes?.orderId) {
        toast.error("Unable to start payment.");
        setIsPaying(false);
        return;
      }

      const { orderId, amount, currency } = orderData;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
        amount,
        currency,
        name: "Shoe Mart",
        description: "Order Payment",
        order_id: orderId,
        prefill: {
          name: shippingName,
          email: shippingEmail || undefined,
          contact: shippingPhone,
        },
        theme: { color: "#1f2937" },
        handler: async (response: any) => {
          try {
            const verifyRes = await verifyPayment({
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes?.data) {
              toast.success("Payment successful!");
              clear();
              setShippingName("");
              setShippingEmail("");
              setShippingPhone("");
              window.location.href = "/";
            }
          } catch {
            toast.error("Payment verification failed!");
          }
        },
        modal: { ondismiss: () => toast.info("Payment cancelled.") },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      toast.error("Unable to start payment. Try again.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Cart Summary */}
      <div className="p-6 rounded-2xl shadow-neumorphism bg-gray-50">
        <Typography
          as="h2"
          variant="h2"
          className="mb-6 text-gray-900 font-bold"
        >
          Your Cart
        </Typography>

        {items.length === 0 ? (
          <Typography variant="p" className="text-gray-600">
            Your cart is empty.
          </Typography>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={`${item.product._id}-${item.size ?? ""}`}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-100 shadow-inner-neumorphism"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={item.product.images[0]?.url || ""}
                    alt={item.product.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover border border-gray-200 shadow-sm"
                    unoptimized
                  />
                  <div className="flex flex-col">
                    <Typography
                      variant="h3"
                      className="text-gray-900 font-medium"
                    >
                      {item.product.name}
                    </Typography>
                    <Typography
                      variant="muted"
                      className="text-gray-600 text-sm"
                    >
                      Size: {item.size ?? "UK 7"}
                    </Typography>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </Button>

                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200">
                        <Typography className="text-gray-900 font-medium hover:bg-gray-300">
                          {item.quantity}
                        </Typography>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                        onClick={() =>
                          updateQuantity(
                            item.product._id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-gray-300"
                        onClick={() => remove(item.product._id, item.size)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500 " />
                      </Button>
                    </div>
                  </div>
                </div>
                <Typography
                  variant="h3"
                  className="text-gray-900 font-semibold"
                >
                  ₹
                  {(item.product.price * item.quantity).toLocaleString("en-IN")}
                </Typography>
              </div>
            ))}

            <div className="flex justify-between mt-6 text-lg font-bold border-t pt-3">
              <Typography variant="h3" className="text-gray-900">
                Total:
              </Typography>
              <Typography variant="h3" className="text-gray-900">
                ₹{cartTotal.toLocaleString("en-IN")}
              </Typography>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 rounded-2xl shadow-neumorphism bg-gray-50 flex flex-col gap-4">
        <Typography
          as="h2"
          variant="h2"
          className="mb-4 text-gray-900 font-bold"
        >
          Shipping Information
        </Typography>

        <Input
          placeholder="Full Name"
          value={shippingName}
          onChange={(e) => setShippingName(e.target.value)}
          required
          className="shadow-inner-neumorphism"
        />
        <Input
          placeholder="Email (optional)"
          value={shippingEmail}
          onChange={(e) => setShippingEmail(e.target.value)}
          className="shadow-inner-neumorphism"
        />
        <Input
          placeholder="Phone"
          value={shippingPhone}
          onChange={(e) => setShippingPhone(e.target.value)}
          required
          className="shadow-inner-neumorphism"
        />

        <Button
          className="w-full mt-4 bg-gray-900 text-white hover:bg-gray-800 transition-all shadow-neumorphism"
          onClick={handlePayment}
          disabled={isPaying || items.length === 0}
        >
          {isPaying ? "Processing..." : `Pay ₹${cartTotal}`}
        </Button>
      </div>
    </div>
  );
}
