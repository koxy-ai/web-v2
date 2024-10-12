import { Flow, Input, InputUi, KoxyNode, StartNode } from "@/types/koxy";
import type { FlowStore } from "@/utils/flow";

export interface NodeProps<T = KoxyNode> {
  node: T;
  path: string;
  store: FlowStore;
  update: (d: Flow) => any;
}

export interface NodeSimpleInputProps {
  node: KoxyNode | StartNode;
  updateValue: (content: string) => any;
  store: FlowStore;
  value?: string;
  input: [Input, string, InputUi];
}