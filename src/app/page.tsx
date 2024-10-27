import { FeaturedOn } from "@/components/landing/featured";
import { HeroSide } from "@/components/landing/hero-side";
import { LandingNavbar } from "@/components/landing/navbar";
import { Features } from "@/components/landing/features";

export default function Home() {
  return (
    <>
      <LandingNavbar />

      <img
        src="https://i.gifer.com/origin/6b/6bb14b1f413cac62614e813c19d9d94f_w200.gif"
        className="fixed top-0 left-0 w-screen h-screen inset-0 z-10 opacity-[3%] border-b-1"
      />

      <img
        src="/hero-bg.jpg"
        className="absolute -top-4 left-0 w-full inset-0 z-0 opacity-60"
      />

      <div className="w-full px-64 flex flex-col items-center z-20 pt-32 min-h-screen">
        <HeroSide />
        <FeaturedOn />
        <Features />
      </div>
    </>
  );
}
