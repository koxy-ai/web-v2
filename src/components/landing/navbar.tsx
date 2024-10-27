"use client";

import Link from "next/link";
import Button from "../tailus-ui/Button";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

export function LandingNavbar() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <div className="absolute top-0 left-0 w-full p-3 px-5 flex items-center justify-center z-50">
        <div className="p-2.5 border rounded-xl flex flex-col gap-3 px-4 bg-gray-950/40 backdrop-blur-lg w-[50%] transition-all duration-500">
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
                <Button.Icon type="trailing">
                  <IconChevronDown
                    className={`size-2 ${
                      open === "features" ? "rotate-[180deg]" : ""
                    }`}
                    size={15}
                  />
                </Button.Icon>
              </Button.Root>
            </div>
            <div className="w-full flex items-center justify-end">
              <Button.Root size="xs" intent="secondary" className="border">
                <Button.Label className="text-xs">Join waitlist</Button.Label>
              </Button.Root>
            </div>
          </div>
          {typeof open === "string" && <div className="h-48 border-t-1"></div>}
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
