"use client";

import Button from "../tailus-ui/Button";

export function Docs() {
  return (
    <div className="w-full flex flex-col items-center pb-36 pt-12 z-10 border-t-1 border-border/40">
      <div className="text-7xl landingSubtitle opacity-60 w-full">
        Auto Docs
      </div>
      <div className="w-full flex gap-6 mb-8 mt-2">
        <div className="text-3xl font-semibold w-full">
          Auto-generated docs for all your APIs, Nodes, and Workflows
        </div>
        <div className="w-full text-xs opacity-70">
          Focus on building, all the docs for your back-end will be auto
          generated, along with a playground with full type-safety for all your
          APIs routes, nodes, and workflows
        </div>
      </div>
      <div className="w-full rounded-xl relative p-10 flex items-center justify-center">
        <div className="p-2 bg-black/40 backdrop-blur z-10 rounded-2xl">
          <div className="p-4 bg-[#080808]/80 rounded-2xl w-64">
            <div className="flex items-center gap-2">
              <div className="text-sm">/api/item</div>
              <div className="text-xs px-2 border-green-400/10 text-green-300 border rounded-full bg-green-400/10">
                POST
              </div>
            </div>
            <div className="mt-2 mb-2 w-full border-t-1 border-border/60"></div>
            <div className="text-xs opacity-70 mb-4">Create a new item.</div>
            <div className="p-2 border-b-1 flex items-center gap-2">
              <div className="text-xs">title</div>
              <div className="text-xs text-green-400">string</div>
              <div className="text-xs text-red-400">required</div>
            </div>
            <div className="p-2 border-b-1 flex items-center gap-2">
              <div className="text-xs">description</div>
              <div className="text-xs text-green-400">string</div>
            </div>
            <div className="p-2 border-b-1 flex items-center gap-2">
              <div className="text-xs">public</div>
              <div className="text-xs text-purple-400">boolean</div>
            </div>
            <div className="mt-12 flex items-center justify-end">
                <Button.Root size="xs" intent="gray" variant="soft" className="border">
                    <Button.Label className="text-xs">Playground</Button.Label>
                </Button.Root>
            </div>
          </div>
        </div>
        <img
          src="/assets/wallpaper16-C2qZ60E-.jpg"
          className="w-full h-full rounded-xl absolute top-0 left-0 object-cover inset-0 z-0"
        />
      </div>
    </div>
  );
}
