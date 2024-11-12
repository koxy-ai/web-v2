"use client";

import { apiSample, newApiFromSample } from "@/utils/apis";
import Button from "../tailus-ui/Button";
import NodeLayout from "../cloudspace/flow/nodes/layout";
import { IconChevronDown, IconDots, IconEdit } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { StraightEdge } from "../cloudspace/flow/edges";

export function Builder() {
  const api = newApiFromSample();

  return (
    <div id="builder" className="w-full flex flex-col items-center p-10 pb-36 z-10 bg-gray-900/20 border border-b-0 border-border/70 rounded-t-xl">
      <div className="text-4xl md:text-7xl landingSubtitle opacity-60 w-full">
        Visual Builder
      </div>
      <div className="w-full flex flex-col md:flex-row gap-6 mb-8 mt-2">
        <div className="text-xl md:text-3xl font-semibold w-full">
          Low-code Workflow builder with type-safety
        </div>
        <div className="w-full text-xs opacity-70">
          Build APIs, back-end tasks, automations, or train AI models all using
          a simple workflow AI-powered builder with no code, once you need to
          insert your code, the editor is one-click awat from you
          <br />
          <br />
          Built to be suitable for both simple and complex tasks, with
          type-safety between nodes, ensuring safety and less bugs
        </div>
      </div>
      <div className="w-full rounded-xl relative p-10 flex flex-col items-center justify-center">
        <div className="p-2 bg-black/60 backdrop-blur z-10 rounded-2xl">
          <div className="nodeLayout border-0">
            <div className="w-full flex items-center gap-2 p-1">
              <Button.Root
                variant="ghost"
                intent="gray"
                size="xs"
                className="min-w-max p-1"
              >
                <Button.Icon type="only">
                  <IconChevronDown
                    className={`transition-all w-2 h-2 opacity-70 cursor-pointer hover:opacity-90 transition-all p-0.5`}
                    size={12}
                  />
                </Button.Icon>
              </Button.Root>
              <div className="w-full truncate opacity-80">Fetch item</div>
              <div className="flex items-center min-w-max gap-2">
                <Button.Root variant="ghost" intent="gray" size="xs">
                  <Button.Icon type="only">
                    <IconDots className="w-3 h-3 p-0.5" />
                  </Button.Icon>
                </Button.Root>
              </div>
            </div>
            <div className="w-full border-t-1 border-border/60"></div>
            <div className="p-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-xs opacity-70 w-12 truncate cursor-default">
                        ID
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="">
                      ID: The item ID to fetch
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div
                  className={`w-full h-7 flex items-center gap-2 bg-gray-900/20 border rounded-md px-2 transition-all`}
                >
                  <input
                    className={`min-w-0 w-full text-xs h-7 bg-transparent outline-none`}
                    placeholder="Item ID (string)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="z-10">
          <IconChevronDown className="text-black" size={15} />
        </div>
        <div className="p-2 bg-black/60 backdrop-blur z-10 rounded-2xl">
          <div className="nodeLayout border-0">
            <div className="w-full flex items-center gap-2 p-1">
              <Button.Root
                variant="ghost"
                intent="gray"
                size="xs"
                className="min-w-max p-1"
              >
                <Button.Icon type="only">
                  <IconChevronDown
                    className={`transition-all w-2 h-2 opacity-70 cursor-pointer hover:opacity-90 transition-all p-0.5`}
                    size={12}
                  />
                </Button.Icon>
              </Button.Root>
              <div className="w-full truncate opacity-80">Return</div>
              <div className="flex items-center min-w-max gap-2">
                <Button.Root variant="ghost" intent="gray" size="xs">
                  <Button.Icon type="only">
                    <IconDots className="w-3 h-3 p-0.5" />
                  </Button.Icon>
                </Button.Root>
              </div>
            </div>
            <div className="w-full border-t-1 border-border/60"></div>
            <div className="p-3 py-1 pt-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-xs opacity-70 w-12 truncate cursor-default">
                        Status
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="">
                      Status: The response status
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div
                  className={`w-full h-7 flex items-center gap-2 bg-gray-900/20 border rounded-md px-2 transition-all`}
                >
                  <input
                    className={`min-w-0 w-full text-xs h-7 bg-transparent outline-none`}
                    placeholder="Status (number)"
                    defaultValue={200}
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="p-3 py-1 pb-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="text-xs opacity-70 w-12 truncate cursor-default">
                        Body
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="">
                      Body: The response body
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div
                  className={`w-full h-7 flex items-center justify-center gap-2 bg-gray-900/40 border rounded-md px-2 transition-all text-center cursor-pointer hover:border-white/10`}
                >
                    <IconEdit size={14} className="opacity-70" />
                  <div className="opacity-70">open editor</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src="/assets/wallpaper11-BC_Et7Hp.jpg"
          className="w-full h-full rounded-xl absolute top-0 left-0 object-cover inset-0 z-0"
        />
      </div>
    </div>
  );
}
