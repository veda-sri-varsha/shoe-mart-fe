import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "Nemman's",
  description: "Shopping Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Toaster position="bottom-right" richColors />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
