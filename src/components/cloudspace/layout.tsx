"use client";

import { Api, CompCall, CompRes, UpdateApiProps, UpdateProjectProps } from "@/types/koxy";
import { Project, Team } from "@prisma/client";
import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { IconLoader, IconPlus, IconX } from "@tabler/icons-react";
import SeparatorRoot from "../tailus-ui/Seperator";
import Button from "../tailus-ui/Button";
import updateCloudspace from "@/functions/cloudspaces/update";
import { toast } from "sonner";

interface Props {
  team: Team;
  project: Project;
}



export default function CloudspaceLayout({ team, project }: Props) {
  const [updateId, setUpdateId] = useState<string>(`${Date.now()}`);
  const [loading, setLoading] = useState(false);

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

  const update = (payload: UpdateProjectProps | UpdateApiProps, callback?: Function) => {
    const {type, data} = payload;

    if (type === "project") {
      setProjectState((prev) => ({ ...prev, ...data }));
    } else if (type === "api") {
      setApi((prev) => ({ ...prev, ...data }));
    }

    setUpdateId(`${Date.now()}`);
    if (callback) callback();
  };

  const saveChanges = async () => {
    if (loading) return;

    setLoading(true);
    const newProject = { ...projectState, api: JSON.stringify(api) };

    try {
      const res = await updateCloudspace(team.id, newProject);

      if (res.success) {
        setProjectState(newProject);
        toast.success("Saved changes");
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const changeSide = (title: string, comp: CompRes) => {
    setSideTitle(title);
    setSideComp(() => comp);
  };

  const openTab = (id: string, comp: CompRes) => {
    setComps((prev) => ({ ...prev, [id]: comp }));
    setActiveComp(id);
  };

  const DisplayComp = comps[activeComp || ""];

  return (
    <div key={updateId}>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/60 backdrop-blur z-50 gap-3">
          <div className="">
            {/* <IconLoader className="animate-spin" /> */}
          </div>
          <div className="flex items-center gap-0.5 pt-1 rotate-[20deg] animate-pulse">
            <div className="w-3 h-5 rounded-tl-[999px] border border-white/20 bg-gray-900/50"></div>
            <div className="w-3 h-5 rounded-br-[999px] border border-white/20 bg-gray-900/50 mb-2"></div>
          </div>
          <div className="text-sm opacity-80">
            Saving changes, please wait...
          </div>
        </div>
      )}
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
                update={update}
                saveChanges={saveChanges}
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
                        ? "bg-gray-900/20 border-b-2 border-white"
                        : ""
                    }`}
                  >
                    <div
                      className="cursor-pointer truncate w-full"
                      onClick={() => setActiveComp(key)}
                    >
                      {key}
                    </div>
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
                  update={update}
                  saveChanges={saveChanges}
                />
              )}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
