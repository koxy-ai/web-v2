"use client";

import { Api, CompRes } from "@/types/koxy";
import { Project, Team } from "@prisma/client";
import { useState } from "react";
import Sidebar from "./sidebar";

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

  const update = () => {
    setUpdateId(Math.random().toString());
  };

  return (
    <>
      <Sidebar
        project={project}
        team={team}
        api={api}
        active={sideActive}
        setActive={(a: string) => setSideActive(a)}
      />
      <div className="pl-14">Hello</div>
    </>
  );
}
