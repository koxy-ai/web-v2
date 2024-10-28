"use client";

import Link from "next/link";
import Button from "../tailus-ui/Button";
import { Waitlist } from "./waitlist";

export function Footer() {
  return (
    <div className="w-full border-t-1 bg-gray-900/20 py-10 px-64 flex flex-col z-20">
      <div className="w-full flex justify-between z-10 gap-10">
        <div className="flex flex-col gap-5 min-w-64">
          <Link href="/" className="flex items-center gap-0.5 min-w-max">
            <div className="w-3 h-5 rounded-tl-[999px] border border-white/20  bg-white"></div>
            <div className="w-3 h-5 rounded-br-[999px] border border-white/20  bg-white "></div>
            <div className="text-xs font-semibold ml-1">Koxy</div>
          </Link>
          <div className="text-xs opacity-60">
            Koxy is a brand new AI-powered low-code Serverless backend builder.
          </div>
          <div className="text-xs opacity-60">
            Built with love by{" "}
            <Link
              href="https://x.com/kais_rad"
              target="_blank"
              className="text-purple-300 underline cursor-pointer"
            >
              @kais_rad
            </Link>
            .
          </div>
          <div className="text-xs opacity-40">
            © 2023-2024 Koxy AI. All rights reserved.
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="text-xs font-semibold">V2 Waitlist</div>
          <div className="text-xs opacity-60">
            After 1 year of development, V2 is finally close to be released!
          </div>
          <Waitlist>
            <Button.Root
              size="xs"
              intent="secondary"
              className="border max-w-max"
              data-rounded="xlarge"
            >
              <Button.Label className="text-xs">Join the waitlist</Button.Label>
            </Button.Root>
          </Waitlist>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="text-xs font-semibold">Product</div>
          <div className="flex flex-col gap-2">
            <Link href="#builder" className="text-xs opacity-60 hover:opacity-80">Visual Builder</Link>
            <Link href="#features" className="text-xs opacity-60 hover:opacity-80">Features</Link>
            <Link href="#autodocs" className="text-xs opacity-60 hover:opacity-80">Auto Docs</Link>
            <Link href="#teams" className="text-xs opacity-60 hover:opacity-80">Teams</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
