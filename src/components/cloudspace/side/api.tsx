"use client";

import { CompCall } from "@/types/koxy";
import { IconRoute } from "@tabler/icons-react";
import EmptyCard from "../empty-card";

const NewApiRoute = ({}: CompCall) => {
  return <div className="p-4 flex flex-col"></div>;
};

export default function SideApi({ api, project, openTab }: CompCall) {
  const n = Object.keys(api.flows);

  if (n.length < 1) {
    return (
      <div className="p-4 flex flex-col gap-3">
        <EmptyCard
          title="Create API route"
          description="Let's get started with something fun"
          icon={<IconRoute className="text-black opacity-70" />}
          onClick={() => openTab("new api", NewApiRoute)}
        />
      </div>
    );
  }

  return <div className="p-4 flex flex-col gap-3"></div>;
}
