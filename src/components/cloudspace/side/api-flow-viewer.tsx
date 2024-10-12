"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight, Trash } from "lucide-react";
import { Api, CompCall, Flow } from "@/types/koxy";
import { IconFolderCode, IconLoader, IconRoute } from "@tabler/icons-react";
import ContextMenu from "@tailus-ui/ContextMenu";
import FlowMain from "../flow/main";

interface FlowStructureProps {
  api: Api;
  openTab: CompCall["openTab"];
  update: CompCall["update"];
  saveChanges: CompCall["saveChanges"];
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

const FlowItem: React.FC<{
  api: Api;
  flow: Flow;
  openTab: CompCall["openTab"];
  path: string;
  update: CompCall["update"];
  saveChanges: CompCall["saveChanges"];
}> = ({ api, flow, openTab, path, update, saveChanges }) => {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const deleteFlow = async () => {
    if (deleteLoading) return;
    setDeleteLoading(true);

    const newProject = update({
      type: "api",
      data: {
        flows: {
          ...api.flows,
          [path]: api.flows[path].filter((f) => f.id !== flow.id),
        },
      },
    });
    if (newProject) {
      saveChanges(newProject);
    }

    setDeleteLoading(false);
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <div
          className="pl-2 flex items-center space-x-2 py-1 text-xs opacity-80 hover:bg-gray-900/40 cursor-pointer"
          onClick={() =>
            openTab(`${flow.name}`, (args: any) => <FlowMain {...args} />, {
              flow,
              path,
            })
          }
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
          <ContextMenu.Item
            intent="danger"
            className="text-xs"
            disabled={deleteLoading}
            onClick={deleteFlow}
          >
            {!deleteLoading ? (
              <Trash className="size-3" />
            ) : (
              <IconLoader size={13} className="animate-spin" />
            )}
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

const PathItem: React.FC<{
  api: Api;
  path: string;
  flows: Flow[];
  openTab: CompCall["openTab"];
  update: CompCall["update"];
  saveChanges: CompCall["saveChanges"];
}> = ({ api, path, flows, openTab, update, saveChanges }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (flows.length < 1) return null;

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
            <FlowItem
              key={flow.id}
              flow={flow}
              openTab={openTab}
              path={path}
              update={update}
              saveChanges={saveChanges}
              api={api}
            />
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
  update,
  saveChanges,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(api.flows).map(([path, flows]) => (
        <PathItem
          key={path}
          path={path}
          flows={flows}
          openTab={openTab}
          update={update}
          saveChanges={saveChanges}
          api={api}
        />
      ))}
    </div>
  );
};
