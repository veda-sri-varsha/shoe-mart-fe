"use client";

import { Awards } from "@/components/custom/awards";
import { Categories } from "@/components/custom/categories";
import CollectionGrid from "@/components/custom/collections";
import DealOfTheDayGrid from "@/components/custom/deals";
import { FeaturedIn } from "@/components/custom/featured-In";
import { Footer } from "@/components/custom/footer";
import { Header } from "@/components/custom/header";
import { HeroCarousel } from "@/components/custom/hero-carousel";
import { ProductInFocus } from "@/components/custom/In-focus";
import { InnovationInAction } from "@/components/custom/Innovation-action";
import NewLaunches from "@/components/custom/new-launches";
import { BrandRatingPanel } from "@/components/custom/rating-panel";
import { CustomerTestimonials } from "@/components/custom/reviews";
import TextwithIcons from "@/components/custom/text-icons";

export default function HomePage() {
  return (
    <>
      <Header />
      <Categories />
      <HeroCarousel />
      <TextwithIcons />
      <CollectionGrid />
      <DealOfTheDayGrid />
      <BrandRatingPanel />
      <CustomerTestimonials />
      <NewLaunches />
      <ProductInFocus />
      <InnovationInAction />
      <FeaturedIn />
      <Awards />
      <Footer />
    </>
  );
}
