import React, { useState } from "react";
import { ChevronDown, ChevronRight, Server, GitBranch } from "lucide-react";
import { Api, Flow } from "@/types/koxy";
import { IconFolderCode, IconRoute } from "@tabler/icons-react";

interface FlowStructureProps {
  api: Api;
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

const FlowItem: React.FC<{ flow: Flow }> = ({ flow }) => (
  <div className="ml-2 flex items-center space-x-2 py-1 text-xs opacity-80">
    {/* <GitBranch className="h-4 w-4 text-gray-400" /> */}
    <IconRoute className="h-4 w-4 text-gray-400" />
    <span className="text-gray-300">{flow.name}</span>
    <MethodLabel method={flow.method} />
  </div>
);

const PathItem: React.FC<{ path: string; flows: Flow[] }> = ({
  path,
  flows,
}) => {
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
            <FlowItem key={flow.id} flow={flow} />
          ))}
        </div>
      )}
      <div className="w-full border-t-1 border-border/50"></div>
    </div>
  );
};

export const FlowStructure: React.FC<FlowStructureProps> = ({ api }) => {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(api.flows).map(([path, flows]) => (
        <PathItem key={path} path={path} flows={flows} />
      ))}
    </div>
  );
};
