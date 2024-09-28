"use client";

import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: Function;
  actionTitle?: string;
}

export default function EmptyCard({
  title,
  description,
  onClick,
  icon,
  actionTitle,
}: Props) {
  return (
    <>
      <div
        className="w-full p-3 py-5 bg-gray-900/30 rounded-xl border border-border/60 flex flex-col items-center group text-center cursor-pointer transition-all hover:bg-gray-900/40 relative overflow-hidden"
        onClick={() => {
          if (onClick) onClick();
        }}
      >
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)] opacity-40 inset-0 z-0 h-32 border-b-1 top-0 left-0 bg-gray-900/30"
          )}
        />
        <div className="w-16 h-20 relative" style={{
            boxShadow: "0px 0px 50px 0px black"
        }}>
          <div className="w-16 h-20 bg-white rounded-2xl absolute z-10 drop-shadow flex items-center justify-center transition-all top-0 left-0 group-hover:rotate-[15deg] group-hover:left-2">
            {icon}
          </div>
          <div className="w-16 h-20 bg-white/40 rounded-2xl absolute top-0 left-2 rotate-[15deg] inset-0 z-0 group-hover:rotate-[0deg] group-hover:left-0 group-hover:right-2 transition-all backdrop-blur"></div>
        </div>
        <div className="text-sm mt-11">{title}</div>
        <div className="text-xs opacity-80 mt-2 mb-2">{description}</div>
        <div className="text-xs p-2 px-3 bg-gray-900/60 rounded-full">
          {actionTitle || "Create"}
        </div>
      </div>
    </>
  );
}
