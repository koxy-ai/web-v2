"use client";

import { Flow, KoxyNode, StartNode } from "@/types/koxy";
import StartNodeComp from "./nodes/start";
import { FlowStore } from "@/utils/flow";
import { StraightEdge } from "./edges";
import ReturnNode from "./nodes/return";

interface Props {
  node: KoxyNode | StartNode;
  store: FlowStore;
  path: string;
  update: (payload: Flow) => any;
}

export default function NodeComp({ node, store, path, update }: Props) {
  if (node.type === "start") {
    return (
        <>
            <StartNodeComp node={node} store={store} path={path} update={update} />
            <StraightEdge hasNext={store.validString(node.next)} hasStart />
        </>
    )
  }

  if (node.type === "return") {
    return <ReturnNode node={node} store={store} path={path} update={update} />
  }

  return <></>;
}
