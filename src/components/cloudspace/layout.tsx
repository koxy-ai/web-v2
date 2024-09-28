"use client";

import { Api, CompCall, CompRes } from "@/types/koxy";
import { Project, Team } from "@prisma/client";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { IconPlus, IconX } from "@tabler/icons-react";
import SeparatorRoot from "../tailus-ui/Seperator";
import Button from "../tailus-ui/Button";

interface Props {
  team: Team;
  project: Project;
}

export default function CloudspaceLayout({ team, project }: Props) {
  const [updateId, setUpdateId] = useState<string>(Math.random().toString());
  const [api, setApi] = useState<Api>(JSON.parse(project.api) as Api);
  const [projectState, setProjectState] = useState({ ...project });

  const [comps, setComps] = useState<Record<string, CompRes>>({});
  const [activeComp, setActiveComp] = useState<string | null>(null);

  const [sideActive, setSideActive] = useState("home");
  const [SideComp, setSideComp] = useState<CompRes | null>(null);
  const [sideTitle, setSideTitle] = useState("Home");

  useEffect(() => {
    setSideComp(
      () =>
        function Comp({ team, project, api }: CompCall) {
          return <div>{project.name} home</div>;
        }
    );
  }, []);

  const update = () => {
    setUpdateId(Math.random().toString());
  };

  const changeSide = (title: string, comp: CompRes) => {
    setSideTitle(title);
    setSideComp(() => comp);
  };

  const openTab = (id: string, comp: CompRes) => {
    if (comps[id]) {
      setActiveComp(id);
      return;
    }

    setComps((prev) => ({ ...prev, [id]: comp }));
    setActiveComp(id);
  };

  const DisplayComp = comps[activeComp || ""];

  return (
    <>
      <Sidebar
        project={project}
        team={team}
        api={api}
        active={sideActive}
        setActive={(a: string) => setSideActive(a)}
        changeSide={changeSide}
      />
      <ResizablePanelGroup direction="horizontal" className="pl-14 flex">
        <ResizablePanel className="min-w-56" defaultSize={18}>
          <div className="pt-14 min-h-screen max-h-screen overflow-auto no-scrollbar">
            <div className="min-h-10 max-h-10 border-b-1 border-border/60 flex items-center px-4">
              <div className="text-xs opacity-60">{sideTitle}</div>
            </div>
            {SideComp !== null && (
              <SideComp
                team={team}
                project={projectState}
                api={api}
                openTab={openTab}
              />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="opacity-60" />

        <ResizablePanel className="w-full min-w-[70%]" defaultSize={82}>
          <div className="flex flex-col pt-14 min-h-screen max-h-screen overflow-auto">
            <div className="w-full min-h-10 max-h-10 border-b-1 border-border/60 flex bg-gray-900/10 overflow-auto no-scrollbar">
              {Object.keys(comps).map((key, index) => (
                <div key={`tab-${key}-${index}`} className="flex">
                  <div
                    className={`h-10 flex items-center gap-2 px-3 text-xs hover:bg-gray-900/30 text-gray-300 cursor-default min-w-36 max-w-36 ${
                      activeComp === key
                        ? "bg-gray-900/20 border-b-1 border-white"
                        : ""
                    }`}
                  >
                    <div className="cursor-default truncate w-full">{key}</div>
                    <IconX
                      className="min-h-6 max-h-6 min-w-6 max-w-6 p-1 rounded-md hover:bg-gray-500/20 text-xs scale-[0.75] opcaity-80"
                      onClick={() => {
                        setComps((prev) => {
                          const newComps = { ...prev };
                          delete newComps[key];
                          return newComps;
                        });
                      }}
                    />
                  </div>
                  <SeparatorRoot
                    className="h-10 opacity-40"
                    orientation="vertical"
                  />
                </div>
              ))}
              <div className="h-10 flex items-center justify-center p-2">
                <Button.Root size="xs" variant="ghost" intent="gray">
                  <Button.Icon className="p-0.5">
                    <IconPlus size={10} />
                  </Button.Icon>
                  <Button.Label className="text-xs">New</Button.Label>
                </Button.Root>
              </div>
            </div>
            <div className="h-screen">
              {DisplayComp && (
                <DisplayComp
                  team={team}
                  project={projectState}
                  api={api}
                  openTab={openTab}
                />
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
