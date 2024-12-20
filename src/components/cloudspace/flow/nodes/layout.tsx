"use client";

import Button from "@/components/tailus-ui/Button";
import { CompCall, Flow, KoxyNode, StartNode } from "@/types/koxy";
import { FlowStore } from "@/utils/flow";
import { IconChevronDown, IconDots } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import NodeInputEditor from "../node-input-editor";

interface Props {
  node: KoxyNode | StartNode;
  store: FlowStore;
  can?: {
    delete?: boolean;
    editCode?: boolean;
  };
  children: React.ReactNode;
  defaultOpen?: boolean;
  update: (f: Flow) => any;
}

export default function NodeLayout({
  node,
  can,
  store,
  children,
  defaultOpen,
  update
}: Props) {
  const state = store.nodeState(node);

  const [open, setOpen] = useState(state.use("open", defaultOpen ?? true));
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    state.onUpdate("open", (value) => {
      setOpen(value);
    });
  }, [node]);

  return (
    <div
      className={`nodeLayout group ${
        selected
          ? "border-purple-300/30"
          : "border-border/80 hover:border-border"
      }`}
      style={{
        boxShadow: "0px 0px 20px 10px black",
      }}
      onClick={() => setSelected(true)}
      onMouseLeave={() => setSelected(false)}
    >
      <div className="w-full flex items-center gap-2 p-1">
        <Button.Root
          variant="ghost"
          intent="gray"
          size="xs"
          onClick={() => state.set<boolean>("open", !open)}
          className="min-w-max p-1"
        >
          <Button.Icon type="only">
            <IconChevronDown
              className={`${
                open ? "rotate-[180deg]" : ""
              } transition-all w-2 h-2 opacity-70 cursor-pointer hover:opacity-90 transition-all p-0.5`}
              size={12}
            />
          </Button.Icon>
        </Button.Root>
        <div className="w-full truncate opacity-80">{node.label}</div>
        <div className="flex items-center min-w-max gap-2">
          <Button.Root variant="ghost" intent="gray" size="xs">
            <Button.Icon type="only">
              <IconDots className="w-3 h-3 p-0.5" />
            </Button.Icon>
          </Button.Root>
        </div>
      </div>
      {open && (
        <>
          <div className="w-full border-t-1 border-border/60"></div>
          <div className="p-3 flex flex-col gap-2">
            {node.inputs.sort((a, b) => a[0].index - b[0].index).map((input, index) => (
              <NodeInputEditor
                node={node}
                input={input}
                store={store}
                key={`nodeinput-${node.id}-${index}`}
                update={update}
              />
            ))}
          </div>
          {children}
        </>
      )}
    </div>
  );
}
