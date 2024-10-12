"use client";

import { IconCaretDownFilled, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

interface Props {
  hasNext: boolean;
  hasStart: boolean;
}

export function StraightEdge({ hasStart, hasNext }: Props) {
  const [addFocus, setAddFocus] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* {hasStart && <div className="w-2 h-1 rounded-b-2xl bg-white"></div>} */}
      <div
        className={`border-l-1 pr-[0.62px] backdrop-blur flex-none relative ${
          hasNext ? "border-white/10 h-8" : "border-dashed border-white/50 h-8"
        }`}
      ></div>
      {hasNext ? (
        <>
          <IconCaretDownFilled className="absolute -bottom-2 text-gray-500 p-1" />
          <div
            className="-top-1 absolute w-3 h-3 rounded-full bg-black border hover:w-5 hover:h-5 flex items-center justify-center transition-all cursor-pointer border-white/20"
            onMouseEnter={() => setAddFocus(true)}
            onMouseLeave={() => setAddFocus(false)}
          >
            {addFocus && <IconPlus className="p-0.5" />}
          </div>
        </>
      ) : (
        <div className="rounded-full border-1 bg-gray-900/20 p-1 px-3 text-xs backdrop-blur border-white/50 border-dashed hover:bg-white/5 transition-all cursor-pointer">
          add node
        </div>
      )}
    </div>
  );
}
