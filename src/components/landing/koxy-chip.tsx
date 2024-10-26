"use client";

// import { BorderBeam } from "@/components/ui/border-beam";

export function KoxyChip() {
  return (
    <div className="w-24 h-24 before:absolute before:inset-0 before:-z-40 before:[background-image:url('/grainy-bg.svg')] before:opacity-[0.030] relative border-2 border-border/30 rounded-xl overflow-hidden bg-[#141414]/50 backdrop-blur">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-black rounded-xl z-10"></div>
      {/* <BorderBeam duration={12} delay={9} /> */}

      <div className="w-3 h-3 rounded-full bg-purple-400 absolute top-2 right-2 border-2 z-20 animate-pulse"></div>
      <div className="w-3 h-3 rounded-full bg-white absolute top-2 right-6 border-2 z-20 animate-pulse"></div>
      <div className="w-3 h-3 rounded-full bg-purple-400 absolute top-2 right-2 border-2 z-20 blur-sm animate-pulse"></div>
      <div className="w-3 h-3 rounded-full bg-white absolute top-2 right-6 border-2 z-20 blur-sm animate-pulse"></div>

      <div className="w-full h-0.5 border-b-1 absolute top-6 left-0 opacity-30"></div>
      <div className="w-full h-0.5 border-b-1 absolute top-7 left-0 opacity-30"></div>
      <div className="w-full h-0.5 border-b-1 absolute bottom-8 left-0 opacity-30"></div>
      <div className="w-full h-0.5 border-b-1 absolute bottom-9 left-0 opacity-30"></div>

      <div className="w-0.5 h-full border-r-1 absolute top-0 left-4 opacity-30"></div>
      <div className="w-0.5 h-full border-r-1 absolute top-0 left-8 opacity-30"></div>
      <div className="w-0.5 h-full border-r-1 absolute top-0 left-12 opacity-30"></div>
      <div className="w-0.5 h-full border-r-1 absolute top-0 left-16 opacity-30"></div>
      <div className="w-0.5 h-full border-r-1 absolute top-0 left-20 opacity-30"></div>

      <div
        className="flex items-center gap-0.5 min-w-max absolute bottom-3 left-3 blur-sm text-black"
        style={{
          textShadow: "0px 0px 2px black",
        }}
      >
        <div className="w-1.5 h-3 rounded-tl-[999px] border border-white/20 bg-black"></div>
        <div className="w-1.5 h-3 rounded-br-[999px] border border-white/20 bg-black "></div>
        <div className="text-[9px] font-semibold ml-0.5">Koxy AI</div>
      </div>
      <div
        className="flex items-center gap-0.5 min-w-max absolute bottom-3 left-3 opacity-80"
        style={{
          textShadow: "0px 0px 2px black",
        }}
      >
        <div className="w-1.5 h-3 rounded-tl-[999px] border border-white/20  bg-white"></div>
        <div className="w-1.5 h-3 rounded-br-[999px] border border-white/20  bg-white "></div>
        <div className="text-[9px] font-semibold ml-0.5">Koxy AI</div>
      </div>
    </div>
  );
}
