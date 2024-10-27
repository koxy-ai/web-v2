"use client";

import { LandingHero } from "@/components/landing/hero";
import { KoxyChip } from "@/components/landing/koxy-chip";
import {
  IconApi,
  IconBrandPython,
  IconBrandTypescript,
  IconCpu,
  IconDatabase,
  IconFolder,
  IconRobotFace,
  IconRouteSquare2,
  IconAi,
  IconChartArrowsVertical,
  IconCloud,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

export function HeroSide() {
  return (
    <div className="w-full flex items-center gap-3">
      <LandingHero />
      <div className="w-72 flex flex-col z-20 items-center justify-center">
        <div className="flex items-center gap-5">
          <div className="flex flex-col items-center justify-center">
            <div className="w-6 h-6 border bg-gray-900/50 backdrop-blur rounded-md flex items-center justify-center p-1 text-blue-400 relative">
              <IconBrandTypescript size={16} />
              <IconBrandTypescript
                size={16}
                className="absolute blur-sm opacity-70"
              />
            </div>
            <div className="h-8 w-2 bg-gray-900/70 border border-t-0 border-b-0 border-border/70"></div>
            <div className="w-4 h-2 bg-black border border-border/70"></div>
            <div className="text-[8px] absolute">typescript</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-6 h-6 border bg-gray-900/50 backdrop-blur rounded-md flex items-center justify-center p-1 text-yellow-400 relative">
              <IconBrandPython size={16} />
              <IconBrandPython
                size={16}
                className="absolute blur-sm opacity-70"
              />
            </div>
            <div className="h-8 w-2 bg-gray-900/70 border border-t-0 border-b-0 border-border/70"></div>
            <div className="w-4 h-2 bg-black border border-border/70"></div>
            <div className="text-[8px] absolute">python</div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-6 h-6 border bg-gray-900/50 backdrop-blur rounded-md flex items-center justify-center p-1 text-pink-400 relative">
              <IconRouteSquare2 size={16} />
              <IconRouteSquare2
                size={16}
                className="absolute blur-sm opacity-70"
              />
            </div>
            <div className="h-8 w-2 bg-gray-900/70 border border-t-0 border-b-0 border-border/70"></div>
            <div className="w-4 h-2 bg-black border border-border/70"></div>
            <div className="text-[8px] absolute">no-code</div>
          </div>
        </div>
        <div className="flex items-center pl-14">
          <KoxyChip />
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center">
              <div className="w-2 h-4 bg-black border border-border/70"></div>
              <div className="h-2 w-6 bg-gray-900/70 border border-l-0 border-r-0 border-border/70"></div>
              <div className="w-6 h-6 border bg-gray-900/50 backdrop-blur rounded-md flex items-center justify-center p-1 text-purple-400 relative">
                <IconAi size={16} />
                <IconAi size={16} className="absolute blur-sm opacity-70" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-2 h-4 bg-black border border-border/70"></div>
              <div className="h-2 w-6 bg-gray-900/70 border border-l-0 border-r-0 border-border/70"></div>
              <div className="w-6 h-6 border bg-gray-900/50 backdrop-blur rounded-md flex items-center justify-center p-1 text-white relative">
                <IconCpu size={16} />
                <IconCpu size={16} className="absolute blur-sm opacity-70" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center justify-center">
            <div className="w-4 h-2 bg-black border border-border/70"></div>
            <div className="h-8 w-2 bg-gray-900/70 border border-t-0 border-b-0 border-border/70"></div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-4 h-2 bg-black border border-border/70"></div>
            <div className="h-8 w-2 bg-gray-900/70 border border-t-0 border-b-0 border-border/70"></div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-4 h-2 bg-black border border-border/70"></div>
            <div className="h-8 w-2 bg-gray-900/70 border border-t-0 border-b-0 border-border/70"></div>
          </div>
        </div>
        <div className="w-full h-36 border rounded-lg bg-gray-900/30 backdrop-blur border-border/70 grid grid-cols-4 p-4 flex gap-4 relative">
          <div className="absolute w-3 h-3 bg-purple-400 rounded-full animate-bounce absolute left-4 -top-8 mr-0.5"></div>
          <div className="absolute w-3 h-3 bg-purple-400 rounded-full animate-bounce absolute left-4 -top-8 mr-0.5 blur-sm"></div>
          <div className="absolute w-3 h-3 bg-purple-400 rounded-full animate-bounce absolute left-4 -top-8 mr-0.5 blur-lg"></div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-full border rounded-lg flex items-center justify-center hover:bg-gray-900/40">
                  <IconDatabase size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>Embedded database</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-full border rounded-lg flex items-center justify-center hover:bg-gray-900/40">
                  <IconApi size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>API</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-full border rounded-lg flex items-center justify-center hover:bg-gray-900/40">
                  <IconFolder size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>Persistent storage</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-full border rounded-lg flex items-center justify-center hover:bg-gray-900/40">
                  <IconRobotFace size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>AI Models</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-full border rounded-lg flex items-center justify-center hover:bg-gray-900/40">
                  <IconChartArrowsVertical size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>Auto-scaling</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-full border rounded-lg flex items-center justify-center hover:bg-gray-900/40">
                  <IconCloud size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>Serverless</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
