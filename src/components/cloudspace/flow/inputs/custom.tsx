"use client";

import { KoxyNode, StartNode, Input, InputUi, Flow } from "@/types/koxy";
import { FlowStore } from "@/utils/flow";
import { IconEdit } from "@tabler/icons-react";
import { InputCodeEditor } from "./code-editor";
import { useState } from "react";

interface Props {
  node: KoxyNode | StartNode;
  input: [Input, string, InputUi];
  store: FlowStore;
  update: (f: Flow) => any;
}

export default function CustomInputEditor({
  node,
  input,
  store,
  update,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full text-xs h-7 flex items-center justify-center bg-gray-900/80 border rounded-lg transition-all gap-2 group cursor-pointer hover:border-white/20 relative">
        <div
          className="h-full w-full flex items-center justify-center gap-2 px-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          <IconEdit size={16} className="opacity-70" />
          <div className="opacity-60 group-hover:opacity-80 transition-all truncate">
            open editor
          </div>
        </div>
      </div>
      <InputCodeEditor
        node={node}
        input={input}
        store={store}
        update={update}
        show={open}
        hide={() => setOpen(false)}
      />
    </>
  );
}
