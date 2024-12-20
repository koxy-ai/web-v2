"use client";

import { useState } from "react";
import { NodeSimpleInputProps } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

export default function StringInput({
  node,
  value,
  updateValue,
  input,
}: NodeSimpleInputProps) {
  const [inputV, setInputV] = useState(value);

  const warn = input[0].required && (!inputV || inputV.length < 1);

  return (
    <div
      className={`w-full h-7 flex items-center gap-2 bg-gray-900/20 border rounded-md px-2 transition-all ${
        warn ? "border-orange-300/40" : "hover:border-white/20"
      }`}
    >
      <input
        className={`min-w-0 w-full text-xs h-7 bg-transparent outline-none`}
        placeholder={input[2].placeholder}
        value={value}
        onInput={(e) => {
          updateValue(e.currentTarget.value);
          setInputV(e.currentTarget.value);
        }}
      />
      {warn && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IconAlertTriangleFilled className="w-3 h-3 text-orange-400" />
            </TooltipTrigger>
            <TooltipContent >This value is required</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
