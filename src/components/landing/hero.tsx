"use client";

import WordRotate from "@/components/ui/word-rotate";
import { IconChevronRight, IconConfetti } from "@tabler/icons-react";
import Button from "../tailus-ui/Button";
import { Waitlist } from "./waitlist";

export function LandingHero() {
  return (
    <div className="w-full flex flex-col gap-5 z-20 relative">
      <div>
        <div className="text-xs p-1 px-4 font-semibold border rounded-full max-w-max mb-1 bg-gray-900/50 backdrop-blur flex items-center gap-2">
          <IconConfetti size={16} />
          V2 coming soon!
        </div>
        <div
          className="text-4xl"
          style={{
            fontWeight: "400",
          }}
        >
          <div className="flex items-center gap-2">
            AI-Powered{" "}
            <WordRotate
              className="text-purple-400 px-1"
              style={{
                textShadow: "0px 0px 4px #c084fc",
              }}
              words={[
                "Serverless APIs",
                "Backend Tasks",
                "AI Automations",
                "Real-time Apps",
              ]}
            />{" "}
            <br />
          </div>
          Low-Code Builder
        </div>
      </div>
      <div className="opacity-70 max-w-[80%] pl-5 border-l-3 ml-1">
        AI-powered serverless low-code platform that lets you build, deploy, and
        scale backend tasks in minutes without writing a line of code.
        <br />
        <br />
        Create workflows with powerful pre-built nodes, custom scripts in
        TypeScript/Python, or let AI generate unique nodes from your voice or
        text instructions.
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
