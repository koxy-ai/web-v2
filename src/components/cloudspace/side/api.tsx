"use client";

import { CompCall } from "@/types/koxy";
import { IconRoute } from "@tabler/icons-react";

const NewApi = ({}: CompCall) => {
  return <>New API Page</>;
};

export default function SideApi({ api, project, openTab }: CompCall) {
  const n = Object.keys(api.flows);

  if (n.length < 1) {
    return (
      <div className="p-4 flex flex-col gap-3">
        <div
          className="w-full p-3 py-6 bg-gray-900/40 rounded-xl border border-border/60 flex flex-col items-center gap-2 group text-center cursor-pointer transition-all hover:bg-gray-900/50"
          onClick={() => openTab("new api", NewApi)}
        >
          <div className="w-16 h-20 relative">
            <div className="w-16 h-20 bg-white rounded-2xl absolute z-10 drop-shadow flex items-center justify-center transition-all top-0 left-0 group-hover:rotate-[15deg] group-hover:left-2">
              <IconRoute className="text-black opacity-70" />
            </div>
            <div className="w-16 h-20 bg-white/40 rounded-2xl absolute top-0 left-2 rotate-[15deg] inset-0 z-0 group-hover:rotate-[0deg] group-hover:left-0 group-hover:right-2 transition-all"></div>
          </div>
          <div className="text-sm mt-3">Create API route</div>
          <div className="text-xs opacity-80">
            {"Let's"} get started with something fun
          </div>
        </div>
      </div>
    );
  }

  return <div className="p-4 flex flex-col gap-3"></div>;
}
