"use client";

import Button from "@/components/tailus-ui/Button";
import DotPattern from "@/components/ui/dot-pattern";
import { CompCall, Flow } from "@/types/koxy";
import {
  IconPlus,
  IconRocket,
  IconSettings,
  IconTestPipe,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";
import Canvas from "./canvas";

export default function FlowMain({ api, data }: CompCall) {
  data = data as { flow: Flow; path: string };
  const [state, setState] = useState(data);

  useEffect(() => {
    setState(data);
  }, [data]);

  return (
    <>
      <div className="absolute w-full z-20 px-2 h-10 border-b-1 border-border/60 flex items-center gap-3 bg-gray-900/10 backdrop-blur-md">
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
            intent="gray"
            className="min-w-max border"
          >
            <Button.Icon
              type="only"
              className="min-w-3.5 min-h-3.5 max-w-3.5 max-h-3.5"
            >
              <IconSettings size={16} />
            </Button.Icon>
          </Button.Root>
          <Button.Root
            size="xs"
            variant="soft"
            intent="gray"
            className="min-w-max border"
          >
            <Button.Icon className="min-w-3 min-h-3 max-w-3 max-h-3">
              <IconTestPipe size={16} />
            </Button.Icon>
            <Button.Label className="text-xs font-semibold min-w-max">
              Test
            </Button.Label>
          </Button.Root>
          <Button.Root
            size="xs"
            variant="solid"
            intent="neutral"
            className="min-w-max"
          >
            <Button.Label className="text-xs font-semibold min-w-max">
              Deploy
            </Button.Label>
            <Button.Icon
              type="trailing"
              className="min-w-4 min-h-4 max-w-4 max-h-4"
            >
              <IconRocket size={16} />
            </Button.Icon>
          </Button.Root>
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center p-6 relative overflow-auto mt-10">
        <DotPattern className="opacity-20 -top-2 -left-2 z-0" />
        <Canvas api={api} flow={state.flow} path={state.path} />
        <div className="h-screen"></div>
      </div>
    </>
  );
}
