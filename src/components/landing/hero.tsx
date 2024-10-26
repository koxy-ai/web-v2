"use client";

import WordRotate from "@/components/ui/word-rotate";
import { IconChevronRight, IconConfetti } from "@tabler/icons-react";
import { KoxyChip } from "./koxy-chip";
import Button from "../tailus-ui/Button";

export function LandingHero() {
  return (
    <div className="w-full flex flex-col gap-5 z-20 relative">
      <div>
        <div className="text-xs p-1 px-4 font-semibold border rounded-full max-w-max mb-1 bg-gray-900/30 backdrop-blur flex items-center gap-2">
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
        Koxy AI is an AI-first Serverless low-code backend builder that allows
        you to build and deploy any back-end tasks without writing any code in
        minutes.
        <br />
        <br />
        Use built-in nodes, build your own in TS/JS or Python, or let AI
        generate custom nodes from your text/voice instructions.
        <br />
        <br />
        Now you can deploy your flows to custom serverless containers with
        dedicated CPUs, RAM, and GPUs!
      </div>

      <Button.Root
        size="md"
        intent="secondary"
        className="border max-w-max"
        data-rounded="xlarge"
        style={{
          boxShadow: "0px 0px 5px 0px #c084fc",
        }}
      >
        <Button.Label className="text-xs font-semibold">
          Join the waitlist
        </Button.Label>
        <Button.Icon type="trailing">
          <IconChevronRight size={16} />
        </Button.Icon>
      </Button.Root>
    </div>
  );
}
