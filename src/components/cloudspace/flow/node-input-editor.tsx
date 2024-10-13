"use client";

import {
  CompCall,
  Flow,
  Input,
  InputUi,
  KoxyNode,
  StartNode,
} from "@/types/koxy";
import { FlowStore } from "@/utils/flow";
import StringInput from "./inputs/string-input";
import SimpleInput from "./inputs/main";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  node: KoxyNode | StartNode;
  input: [Input, string, InputUi];
  store: FlowStore;
  update: (f: Flow) => any;
}

export default function NodeInputEditor({ node, input, store, update }: Props) {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-xs opacity-70 w-12 truncate cursor-default">
              {input[0].label}
            </div>
          </TooltipTrigger>
          <TooltipContent className="backdrop-blur">
            {input[0].label}: {input[0].description}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SimpleInput node={node} input={input} store={store} update={update} />
    </div>
  );
}
