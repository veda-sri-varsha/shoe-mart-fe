import { Categories } from "@/components/custom/categories";
import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nemman's-All Products",
  description: "Shopping Website",
};

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Categories />
      {children}
      <Footer />
    </>
  );
}
