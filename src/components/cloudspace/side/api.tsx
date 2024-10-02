"use client";

import { CompCall } from "@/types/koxy";
import { IconPlus, IconRoute } from "@tabler/icons-react";
import EmptyCard from "../empty-card";
import NewApiRoute from "../new-api-route";
import Button from "@/components/tailus-ui/Button";
import { FlowStructure } from "./api-flow-viewer";

export default function SideApi({ api, openTab }: CompCall) {
  const n = Object.keys(api.flows);

  if (n.length < 1) {
    return (
      <div className="p-4 flex flex-col gap-3">
        <EmptyCard
          title="Create API route"
          description="Let's get started with something fun"
          icon={<IconRoute className="text-black opacity-70" />}
          onClick={() => openTab("new api", NewApiRoute)}
        />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-3">
      <Button.Root
        size="xs"
        intent="neutral"
        variant="soft"
        className="border"
        onClick={() => openTab("new api", NewApiRoute)}
      >
        <Button.Icon size="sm">
          <IconPlus size={13} className="w-4 h-4" />
        </Button.Icon>
        <Button.Label className="text-xs">New API Route</Button.Label>
      </Button.Root>
      <FlowStructure api={api} />
    </div>
  );
}
