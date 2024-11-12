"use client";

import Link from "next/link";
import Button from "../tailus-ui/Button";
import { useState } from "react";
import { IconChevronDown, IconRoute, IconSparkles, IconUsersGroup } from "@tabler/icons-react";
import { Waitlist } from "./waitlist";

export function LandingNavbar() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <div className="absolute top-0 left-0 w-full p-3 px-5 flex items-center justify-center z-50">
        <div className="p-2.5 border rounded-xl flex flex-col gap-3 px-4 bg-gray-950/80 backdrop-blur-lg w-[95%] md:w-[50%] transition-all duration-500">
          <div className="w-full flex items-center">
            <Link href="/" className="flex items-center gap-0.5 min-w-max">
              <div className="w-2.5 h-4 rounded-tl-[999px] border border-white/20  bg-white"></div>
              <div className="w-2.5 h-4 rounded-br-[999px] border border-white/20  bg-white "></div>
              <div className="text-xs font-semibold ml-1">Koxy</div>
            </Link>
            <div className="flex items-center gap-2 px-3">
              <Button.Root
                size="xs"
                intent="gray"
                variant="ghost"
                className="opacity-70 hover:opacity-100"
                onClick={() =>
                  setOpen((prev) => (prev === "features" ? null : "features"))
                }
              >
                <Button.Label className="text-xs">Features</Button.Label>
                <Button.Icon type="trailing" size="sm">
                  <IconChevronDown
                    className={`${
                      open === "features" ? "rotate-[180deg]" : ""
                    }`}
                    size={10}
                  />
                </Button.Icon>
              </Button.Root>
            </div>
            <div className="w-full flex items-center justify-end">
              <Waitlist>
                <Button.Root size="xs" intent="secondary" className="border">
                  <Button.Label className="text-xs">Join waitlist</Button.Label>
                </Button.Root>
              </Waitlist>
            </div>
          </div>
          {typeof open === "string" && (
            <div className="h-48 border-t-1 grid grid-cols-3 p-3 flex gap-4">
              {open === "features" && (
                <>
                  <Link
                    href="#features"
                    className="p-4 border rounded-xl bg-gray-900/50 flex flex-col hover:border-white/10"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <IconSparkles size={36} className="opacity-60" />
                    </div>
                    <div className="text-sm mb-1">Tech features</div>
                    <div className="text-xs opacity-70">
                      General features shipped built-in
                    </div>
                  </Link>
                  <Link
                    href="#builder"
                    className="p-4 border rounded-xl bg-gray-900/50 flex flex-col hover:border-white/10"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <IconRoute size={36} className="opacity-60" />
                    </div>
                    <div className="text-sm mb-1">Visual Builder</div>
                    <div className="text-xs opacity-70">
                      AI-powered low-code builder
                    </div>
                  </Link>
                  <Link
                    href="#teams"
                    className="p-4 border rounded-xl bg-gray-900/50 flex flex-col hover:border-white/10"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <IconUsersGroup size={36} className="opacity-60" />
                    </div>
                    <div className="text-sm mb-1">Teams</div>
                    <div className="text-xs opacity-70">
                      AI-powered low-code builder
                    </div>
                  </Link>
                </>
              )}
            </div>
          )}
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
