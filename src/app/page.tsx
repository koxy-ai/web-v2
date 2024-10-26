"use client";

import { LandingNavbar } from "@/components/landing/navbar";
import { LandingHero } from "@/components/landing/hero";
import { KoxyChip } from "@/components/landing/koxy-chip";

export default function Home() {
  return (
    <>
      <LandingNavbar />

      <img
        src="/hero-bg.jpg"
        className="absolute -top-4 left-0 w-full inset-0 z-0 opacity-60"
      />

      <div className="w-full px-64 flex flex-col items-center z-20 pt-36">
        <div className="w-full flex items-center gap-3">
          <LandingHero />
          <div className="w-72 flex flex-col z-20 items-center justify-center">
            <KoxyChip />
            <div className="flex items-center gap-4">
              <div className="h-8 w-2 bg-gray-900/70"></div>
              <div className="h-8 w-2 bg-gray-900/70"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
