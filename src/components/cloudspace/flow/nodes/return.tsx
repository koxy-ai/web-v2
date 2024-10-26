"use client";

import type { ReturnNode } from "@/types/koxy";
import { NodeProps } from "../types";
import { CodeGenerator } from "@/utils/code-generator";
import NodeLayout from "./layout";

export default function ReturnNode({
  node,
  store,
  update,
}: NodeProps<ReturnNode>) {
  const generator = new CodeGenerator(store);

  return (
    <NodeLayout node={node} defaultOpen={false} store={store} update={update}>
      <div></div>
    </NodeLayout>
  );
}
