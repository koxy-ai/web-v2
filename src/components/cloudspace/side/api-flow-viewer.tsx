import React, { useState } from "react";
import { ChevronDown, ChevronRight, Trash } from "lucide-react";
import { Api, CompCall, Flow } from "@/types/koxy";
import { IconFolderCode, IconRoute } from "@tabler/icons-react";
import ContextMenu from "@tailus-ui/ContextMenu";
import FlowMain from "../flow/main";

interface FlowStructureProps {
  api: Api;
  openTab: CompCall["openTab"];
}

const MethodLabel: React.FC<{ method: Flow["method"] }> = ({ method }) => {
  const colorClass = {
    GET: "bg-green-500/10 text-green-100 border",
    POST: "bg-blue-500/10 text-blue-100 border",
    PUT: "bg-yellow-500/10 text-yellow-100 border",
    DELETE: "bg-red-500/10 text-red-100 border",
  }[method];

  return (
    <span className={`text-[9px] px-1  rounded ${colorClass}`}>{method}</span>
  );
};

const FlowItem: React.FC<{ flow: Flow; openTab: CompCall["openTab"] }> = ({
  flow,
  openTab,
}) => (
  <ContextMenu.Root>
    <ContextMenu.Trigger>
      <div
        className="pl-2 flex items-center space-x-2 py-1 text-xs opacity-80 hover:bg-gray-900/40 cursor-pointer"
        onClick={() => openTab(`${flow.name}`, FlowMain, flow)}
      >
        <IconRoute className="h-4 w-4 text-gray-400" />
        <span className="text-gray-300">{flow.name}</span>
        <MethodLabel method={flow.method} />
      </div>
    </ContextMenu.Trigger>
    <ContextMenu.Portal>
      <ContextMenu.Content
        mixed
        data-shade="950"
        variant="solid"
        intent="primary"
        className=""
      >
        <ContextMenu.Item intent="danger" className="text-xs">
          <Trash className="size-3" />
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Portal>
  </ContextMenu.Root>
);

const PathItem: React.FC<{
  path: string;
  flows: Flow[];
  openTab: CompCall["openTab"];
}> = ({ path, flows, openTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        className={`flex items-center space-x-2 cursor-pointer py-2 ${
          isOpen ? "" : "opacity-80 mb-1"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        )}
        {/* <Server className="h-4 w-4 text-blue-400" /> */}
        <IconFolderCode className="h-4 w-4 text-gray-200" />
        <span className="text-gray-200 text-xs">{path}</span>
      </div>
      {isOpen && (
        <div className="ml-4 flex flex-col gap-1 pb-2">
          {flows.map((flow) => (
            <FlowItem key={flow.id} flow={flow} openTab={openTab} />
          ))}
        </div>
      )}
      <div className="w-full border-t-1 border-border/50"></div>
    </div>
  );
};

export const FlowStructure: React.FC<FlowStructureProps> = ({
  api,
  openTab,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(api.flows).map(([path, flows]) => (
        <PathItem key={path} path={path} flows={flows} openTab={openTab} />
      ))}
    </div>
  );
};
