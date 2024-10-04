"use client";

import { KoxyNode, StartNode } from "@/types/koxy";
import StartNodeComp from "./nodes/start";
import { FlowStore } from "@/utils/flow";
import { StraightEdge } from "./edges";

interface Props {
  node: KoxyNode | StartNode;
  store: FlowStore;
  path: string;
}

export default function NodeComp({ node, store, path }: Props) {
  if (node.type === "start") {
    return (
        <>
            <StartNodeComp node={node} store={store} path={path} />
            <StraightEdge hasNext={store.validString(node.next)} hasStart />
        </>
    )
  }

  return <></>;
}
