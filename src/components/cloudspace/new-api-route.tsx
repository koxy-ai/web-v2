"use client";

import { CompCall } from "@/types/koxy";
import { IconPlus } from "@tabler/icons-react";

export default function NewApiRoute({}: CompCall) {
  return (
    <div className="w-full p-12 flex flex-col items-center gap-3">
      <div className="w-10 h-10 flex items-center justify-center relative border rounded-2xl bg-gray-900/20">
        <IconPlus />
      </div>
      New APi Route
    </div>
  );
}
