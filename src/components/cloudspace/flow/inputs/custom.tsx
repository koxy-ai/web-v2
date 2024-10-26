"use client";

import { KoxyNode, StartNode, Input, InputUi, Flow } from "@/types/koxy";
import { FlowStore } from "@/utils/flow";

interface Props {
  node: KoxyNode | StartNode;
  input: [Input, string, InputUi];
  store: FlowStore;
  update: (f: Flow) => any;
}

export default function CustomInputEditor({ node, input, store, update }: Props) {
  return <></>;
}
