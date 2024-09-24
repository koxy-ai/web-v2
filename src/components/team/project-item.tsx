"use client";

import { Api } from "@/types/koxy";
import { Project, Team } from "@prisma/client";
import DropdownMenu from "../tailus-ui/DropdownMenu";
import {
  IconChevronRight,
  IconEyeShare,
  IconServerBolt,
  IconTool,
} from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { useState } from "react";
import Button from "../tailus-ui/Button";
import { formatDistanceToNow } from "date-fns";
import SeparatorRoot from "../tailus-ui/Seperator";

interface Props {
  project: Project;
  team: Team;
}

export default function ProjectItem({ project, team }: Props) {
  const [computeOpen, setComputeOpen] = useState(false);
  const api = JSON.parse(project.api) as Api;

  const updatedAt = new Date(project.updatedAt);
  const timeAgo = formatDistanceToNow(updatedAt, { addSuffix: true });

  return (
    <Link
      href={`/app/${team.uniqueName}/cloudspace/${project.id}`}
      passHref={true}
      className="p-5 bg-gray-900/20 rounded-xl border border-border/60 relative hover:bg-gray-900/40 hover:border-border transition-all"
    >
      <IconChevronRight
        size={16}
        className="absolute top-4 right-4 opacity-60"
      />
      <div className="text-sm mb-2">{project.name}</div>
      <DropdownMenu.Root open={computeOpen} onOpenChange={setComputeOpen}>
        <DropdownMenu.Trigger asChild>
          <div
            className="text-xs p-0.5 px-2 border rounded-md text-gray-400 max-w-max mb-12"
            onMouseEnter={() => {
              if (!computeOpen) setComputeOpen(true);
            }}
          >
            {api.container_type}
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            onMouseLeave={() => setComputeOpen(false)}
            className="p-0 text-xs bg-background rounded-md min-w-64 shadow-lg"
            mixed
            sideOffset={5}
          >
            <div className="bg-gray-900/50 p-4 border-b-1 flex flex-col gap-4">
              <div className="text-xs opacity-50">Compute size</div>
              <div className="flex items-start gap-4">
                <div className="text-xs p-0.5 px-2 border rounded-md text-gray-400 max-w-max max-h-max">
                  {api.container_type}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <span className="opacity-60">CPU:</span> {api.cpu ?? 0.5}{" "}
                    {"->"} {(api.cpu ?? 0.5) + 4} cores
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="opacity-60">Memory:</span> {api.memory}MB{" "}
                    {"->"} {api.memory_limit}MB
                  </div>
                  {api.gpu && (
                    <div className="flex items-center gap-1">
                      <span className="opacity-60">GPU:</span>{" "}
                      {`${api.gpu.count} ${api.gpu.type}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div>Configure compute size</div>
              <div className="opacity-70 text-[12px] max-w-sm mt-1 mb-3">
                {"You're"} only billed for the compute hours you use, you can
                scale to 64 cores, 128GB RAM, and mutliple GPUs
              </div>
              <Button.Root
                size="xs"
                intent="gray"
                variant="soft"
                className="border"
              >
                <Button.Icon>
                  <IconTool size={8} className="opacity-70" />
                </Button.Icon>
                <Button.Label className="text-xs">
                  configure compute size
                </Button.Label>
              </Button.Root>
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <div className="flex items-center gap-3 text-xs">
        <div className="text-[12px] opacity-60">updated {timeAgo}</div>
        <SeparatorRoot
          decorative
          orientation="vertical"
          className="h-4 opacity-70"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IconEyeShare
                size={16}
                className={`${api.keep_warm ? "opacity-100" : "opacity-30"}`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Keep warm containers: {api.keep_warm ? "On" : "Off"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IconServerBolt
                size={16}
                className={`${api.keep_warm ? "opacity-100" : "opacity-30"}`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>GPU containers: {api.gpu ? "On" : "Off"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Link>
  );
}
