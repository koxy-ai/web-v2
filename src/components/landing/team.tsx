"use client";

import Button from "../tailus-ui/Button";

export function Team() {
  return (
    <div
      id="teams"
      className="w-full flex flex-col items-center p-10 pb-36 z-10 bg-gray-900/20 border border-b-1 border-border/70 rounded-b-xl mb-24"
    >
      <div className="text-7xl landingSubtitle opacity-60 w-full">Teams</div>
      <div className="w-full flex gap-6 mb-8 mt-2">
        <div className="text-3xl font-semibold w-full">
          Invite your entire team to work together
        </div>
        <div className="w-full text-xs opacity-70">
          Invite your devs and admins to work together on your projects whether
          building, wathcing analytics and logs, or managing expenses
          <br />
          <br />
          Set a role to each member to keep everything organized and under your
          control
        </div>
      </div>
      <div className="w-full rounded-xl relative p-10 flex items-center justify-center">
        <div className="p-2 bg-black/40 backdrop-blur z-10 rounded-2xl">
          <div className="p-4 bg-[#080808]/80 rounded-2xl w-64">
            <div className="p-2 flex items-center gap-2 text-xs border-b-1">
              <div>kais</div>
              <div className="opacity-60">owner</div>
            </div>
            <div className="p-2 flex items-center gap-2 text-xs border-b-1">
              <div>theo</div>
              <div className="opacity-60">developer</div>
            </div>
            <div className="p-2 flex items-center gap-2 text-xs border-b-1">
              <div>mark</div>
              <div className="opacity-60">admin</div>
            </div>
            <div className="mt-12 flex items-center justify-end">
              <Button.Root
                size="xs"
                intent="gray"
                variant="soft"
                className="border"
              >
                <Button.Label className="text-xs">Invite member</Button.Label>
              </Button.Root>
            </div>
          </div>
        </div>
        <img
          src="/assets/wallpaper3.jpg"
          className="w-full h-full rounded-xl absolute top-0 left-0 object-cover inset-0 z-0"
        />
      </div>
    </div>
  );
}
