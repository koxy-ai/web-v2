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

interface Props {
  team: Team;
  project: Project;
}

export default function CloudspaceLayout({ team, project }: Props) {
  const [updateId, setUpdateId] = useState<string>(Math.random().toString());
  const [api, setApi] = useState<Api>(JSON.parse(project.api) as Api);
  const [projectState, setProjectState] = useState({ ...project });
  const [comps, setComps] = useState<CompRes[]>([]);
  const [sideActive, setSideActive] = useState("home");
  const [SideComp, setSideComp] = useState<CompRes | null>(null);
  const [sideTitle, setSideTitle] = useState("Home");

  useEffect(() => {
    setSideComp(() => function Comp({ team, project, api }: CompCall) {
      return (<div>{project.name} home</div>);
    })
  }, []);

  const update = () => {
    setUpdateId(Math.random().toString());
  };

  const changeSide = (title: string, comp: CompRes) => {
    setSideTitle(title);
    setSideComp(() => comp);
  };

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
        <ResizablePanel className="min-w-56 bg-gray-900/10" defaultSize={18}>
          <div className="pt-14 min-h-screen max-h-screen overflow-auto no-scrollbar">
            <div className="min-h-10 max-h-10 border-b-1 border-border/60 flex items-center px-4">
              <div className="text-xs opacity-60">{sideTitle}</div>
            </div>
            {SideComp !== null && (
              <SideComp team={team} project={projectState} api={api} />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="opacity-60" />
        <ResizablePanel className="w-full min-w-[70%]" defaultSize={82}>
          <div className="flex flex-col pt-14 min-h-screen max-h-screen overflow-auto">
            <div className="w-full min-h-10 max-h-10 border-b-1 border-border/60 flex items-center px-4">
              hi
            </div>
            <div className="h-screen"></div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
