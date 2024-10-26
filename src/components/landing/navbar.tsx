"use client";

import Link from "next/link";
import Button from "../tailus-ui/Button";

export function LandingNavbar() {
  return (
    <>
      <div className="absolute top-0 left-0 w-full p-3 px-5 flex items-center justify-center z-50">
        <div className="h-10 border rounded-xl flex items-center px-3 bg-gray-950/20 backdrop-blur w-[50%]">
          <Link href="/" className="flex items-center gap-0.5 min-w-max">
            <div className="w-2.5 h-4 rounded-tl-[999px] border border-white/20  bg-white"></div>
            <div className="w-2.5 h-4 rounded-br-[999px] border border-white/20  bg-white "></div>
            <div className="text-xs font-semibold ml-1">Koxy AI</div>
          </Link>
          <div className="w-full flex items-center justify-end">
            <Button.Root size="xs" intent="secondary" className="border">
              <Button.Label className="text-xs">Join waitlist</Button.Label>
            </Button.Root>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full p-3 px-5 flex items-center justify-center z-10">
        <div
          className="h-10 rounded-xl flex items-center px-3 w-[50%]"
          style={{
            boxShadow: "0px 0px 300px 0px #c084fc",
          }}
        ></div>
      </div>
    </>
  );
}
