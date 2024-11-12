"use client";

import { RetroGrid } from "../ui/retro";
import Button from "../tailus-ui/Button";
import { Waitlist } from "./waitlist";
import { IconChevronRight } from "@tabler/icons-react";

export function Cta() {
  return (
    <div className=" w-full p-24 px-10 md:px-24 flex flex-col items-center justify-center text-center z-20 relative">
      <RetroGrid />
      <div className="text-5xl md:text-7xl landingSubtitle opacity-60 w-full z-10">
        V2 soon
      </div>
      <div className="text-sm z-10 mb-4 opacity-60">
        Koxy V2 will be out really soon, join the waitlist now to get 20% off
        during the first 3 months
      </div>
      <Waitlist>
        <Button.Root
          size="md"
          intent="secondary"
          className="border max-w-max"
          data-rounded="xlarge"
        >
          <Button.Label className="text-xs font-semibold">
            Join the waitlist
          </Button.Label>
          <Button.Icon type="trailing">
            <IconChevronRight size={16} />
          </Button.Icon>
        </Button.Root>
      </Waitlist>
    </div>
  );
}
