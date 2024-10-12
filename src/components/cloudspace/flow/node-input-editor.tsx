"use client";

import { CompCall, Flow, Input, InputUi, KoxyNode, StartNode } from "@/types/koxy";
import { FlowStore } from "@/utils/flow";
import StringInput from "./inputs/string-input";
import SimpleInput from "./inputs/main";

interface Props {
  node: KoxyNode | StartNode;
  input: [Input, string, InputUi];
  store: FlowStore;
  update: (f: Flow) => any;
}

export default function NodeInputEditor({ node, input, store, update }: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-xs opacity-70 w-12 truncate">
        {input[0].label}
      </div>
      <SimpleInput node={node} input={input} store={store} update={update} />
    </div>
  );
}
