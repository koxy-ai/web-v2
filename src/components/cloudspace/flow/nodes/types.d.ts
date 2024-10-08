import { Flow, KoxyNode } from "@/types/koxy";
import type { FlowStore } from "@/utils/flow";

export interface NodeProps<T = KoxyNode> {
  node: T;
  path: string;
  store: FlowStore;
  update: (d: Flow) => any;
}
