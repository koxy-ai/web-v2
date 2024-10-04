"use client";

import { Flow } from "@/types/koxy";
import { FlowStore } from "@/utils/flow";
import { useEffect, useState } from "react";
import NodeComp from "./node";

interface Props {
  path: string;
  flow: Flow;
}

export default function Canvas({ path, flow }: Props) {
  const [store, setStore] = useState<FlowStore>(new FlowStore(flow));

  useEffect(() => {
    store.set(flow);
  }, [flow]);

  return (
    <div className="w-full flex flex-col items-center">
      <NodeComp node={flow.start} store={store} path={path} />

      {flow.nodes.map((node, index) => (
        <div key={`node-${node.id}-${index}`}>
          <NodeComp node={node} store={store} path={path} />
        </div>
      ))}
    </div>
  );
}
