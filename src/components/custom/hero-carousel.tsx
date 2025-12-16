"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const images = [
  "/hero-3.png",
  "/hero-4.png",
  // "/hero-2.png",
  "/hero_banner-3.png",
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const prevImage = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  const nextImage = () => setCurrentIndex((currentIndex + 1) % images.length);

  return (
    <section className="relative min-h-3 rounded-xl flex items-center justify-center overflow-hidden">
      <div className="flex justify-end">
        <Image
          src={images[currentIndex]}
          alt={`Hero Banner ${currentIndex + 1}`}
          width={1800}
          height={430}
          className="object-cover object-right w-full h-[430px] rounded-xl transition-all duration-700"
          priority
        />
      </div>
      <div className="absolute left-1/2 bottom-8 z-20 -translate-x-1/2 flex gap-6 items-center bg-black/30 px-4 py-2 rounded-full ">
        <Button
          variant="ghost"
          className="rounded-full w-14 h-14 bg-amber-50  border border-white/30 p-0 flex items-center justify-center shadow-md hover:scale-105 transition hover:bg-amber-50"
          onClick={prevImage}
        >
          <svg width="26" height="26" fill="none" viewBox="0 0 25 24">
            <path
              d="M15.23 19.71 7.73 12.21 15.23 4.71"
              stroke="#184a45"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <div className="flex items-center gap-3">
          {images.map((_, idx) => (
            <Button
              key={idx}
              variant="ghost"
              aria-label={`Go to item ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`rounded-full w-5 h-5 border-2 border-white p-0 
                ${idx === currentIndex ? "bg-white shadow" : "bg-transparent"}`}
              tabIndex={0}
            />
          ))}
        </div>
        <Button
          variant="ghost"
          onClick={nextImage}
          className="rounded-full w-14 h-14 bg-amber-50 border border-white/30 p-0 flex items-center justify-center shadow-md hover:scale-105 transition hover:bg-amber-50"
        >
          <svg width="26" height="26" fill="none" viewBox="0 0 25 24">
            <path
              d="M9.5 4.5 17 12l-7.5 7.5"
              stroke="#184a45"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </section>
  );
}
