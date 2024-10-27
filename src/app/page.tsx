"use client";

import { FeaturedOn } from "@/components/landing/featured";
import { HeroSide } from "@/components/landing/hero-side";
import { LandingNavbar } from "@/components/landing/navbar";

export default function Home() {
  return (
    <>
      <LandingNavbar />

      <img
        src="/hero-bg.jpg"
        className="absolute -top-4 left-0 w-full inset-0 z-0 opacity-60"
      />

      <div className="w-full px-64 flex flex-col items-center z-20 pt-32">
        <HeroSide />
        <FeaturedOn />
      </div>
    </>
  );
}
