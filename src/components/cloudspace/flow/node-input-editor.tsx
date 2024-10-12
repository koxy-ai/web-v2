"use client";

import { Input, InputUi, KoxyNode, StartNode } from "@/types/koxy";
import { FlowStore } from "@/utils/flow";

interface Props {
  node: KoxyNode | StartNode;
  input: [Input, string, InputUi];
  value: string;
  store: FlowStore;
}

export default function NodeInputEditor({ node, input, value, store }: Props) {

  return <></>;
}
