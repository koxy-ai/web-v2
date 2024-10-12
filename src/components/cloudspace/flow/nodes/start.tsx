"use client";

import Button from "@/components/tailus-ui/Button";
import { StartNode } from "@/types/koxy";
import { FlowStore } from "@/utils/flow";
import { IconChevronDown, IconDots } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { NodeProps } from "../types";
import NodeLayout from "./layout";

export default function StartNodeComp({
  node,
  path,
  store,
  update
}: NodeProps<StartNode>) {
  return (
    <NodeLayout node={node} defaultOpen={false} store={store} update={update}>
      <div
        className="p-2"
        onClick={() =>
          update({
            ...store.flow,
            start: { ...store.flow.start, label: `Start ${Date.now()}` },
          })
        }
      >
        node body
      </div>
    </NodeLayout>
  );
}
