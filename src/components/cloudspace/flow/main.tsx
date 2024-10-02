"use client";

import Button from "@/components/tailus-ui/Button";
import { CompCall, Flow } from "@/types/koxy";
import { IconPlus, IconRocket, IconTestPipe } from "@tabler/icons-react";

export default function FlowMain({ data }: CompCall) {
  const flow = data as Flow;

  return (
    <>
      <div className="w-full p-2 border-b-1 border-border/60 flex items-center gap-3">
        <Button.Root
          size="xs"
          variant="ghost"
          intent="gray"
          className="min-w-max"
        >
          <Button.Icon className="min-w-3.5 min-h-3.5 max-w-3.5 max-h-3.5">
            <IconPlus size={16} />
          </Button.Icon>
          <Button.Label className="text-xs min-w-max">Add node</Button.Label>
        </Button.Root>
        <div className="w-full flex items-center gap-3 justify-end">
        <Button.Root
            size="xs"
            variant="soft"
            intent="neutral"
            className="min-w-max border"
          >
            <Button.Icon className="min-w-3 min-h-3 max-w-3 max-h-3">
              <IconTestPipe size={16} />
            </Button.Icon>
            <Button.Label className="text-xs font-semibold min-w-max">Test</Button.Label>
          </Button.Root>
          <Button.Root
            size="xs"
            variant="solid"
            intent="neutral"
            className="min-w-max"
          >
            <Button.Label className="text-xs font-semibold min-w-max">Deploy</Button.Label>
            <Button.Icon type="trailing" className="min-w-4 min-h-4 max-w-4 max-h-4">
              <IconRocket size={16} />
            </Button.Icon>
          </Button.Root>
        </div>
      </div>
    </>
  );
}
