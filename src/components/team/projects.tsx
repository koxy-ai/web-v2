"use client";

import { Project, Team } from "@prisma/client";
import { useState } from "react";
import Input from "../tailus-ui/Input";
import Button from "../tailus-ui/Button";
import { getLimit } from "@/utils/plan";
import { Title } from "../tailus-ui/typography";
import { IconPlus } from "@tabler/icons-react";
import DashboardIcon from "../icons/dashboard";
import AddProject from "./add-project";
import ProjectItem from "./project-item";

interface Props {
  team: Team;
  projects: Project[];
}

export default function TeamProjects({ projects, team }: Props) {
  const [projectsState, setProjectsState] = useState(projects);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProjects = projects.filter((project) =>
      project.name?.toLowerCase().includes(searchTerm)
    );
    setProjectsState(filteredProjects);
  };

  if (projects.length < 1) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-3 p-10 text-center">
        <div className="p-4 relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-0 right-1 w-1 h-full border-r-1 border-dashed border-white/20"></div>
          <div className="absolute top-0 left-1 w-1 h-full border-l-1 border-dashed border-white/20"></div>
          <div className="absolute top-1 left-0 h-1 w-full border-t-1 border-dashed border-white/20"></div>
          <div className="absolute bottom-1 left-0 h-1 w-full border-b-1 border-dashed border-white/20"></div>
          <DashboardIcon width="45" height="45" />
          <DashboardIcon
            width="45"
            height="45"
            className="absolute blur-sm opacity-60"
          />
        </div>
        <Title className="text-base">No Cloudspaces yet!</Title>
        <div className="text-sm opacity-70 max-w-md mb-2">
          Cloudspaces are cloud environments for your backend's API, flows,
          databases, real-time channels, all served by Koxy AI.
        </div>
        <AddProject team={team}>
          <Button.Root
            intent="success"
            size="sm"
            className="border"
            disabled={getLimit(team.tier, "projects") <= projects.length}
            style={{
              boxShadow: "0px 0px 180px 0px #4ade80",
            }}
          >
            <Button.Icon>
              <IconPlus size={16} />
            </Button.Icon>
            <Button.Label className="text-xs min-w-max">
              New Cloudspace
            </Button.Label>
          </Button.Root>
        </AddProject>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Input
          size="sm"
          className="w-64 text-xs focus:outline-transparent focus:border-white/20"
          data-shade="925"
          placeholder="Search Cloudspaces"
          onInput={handleSearch}
        />
        <div className="w-full"></div>
        <AddProject team={team}>
          <Button.Root
            intent="success"
            size="xs"
            className="border"
            disabled={getLimit(team.tier, "projects") <= projects.length}
          >
            <Button.Label className="text-xs min-w-max">
              New Cloudspace
            </Button.Label>
          </Button.Root>
        </AddProject>
      </div>
      <div className="w-full grid grid-cols-3 flex gap-4">
        {projectsState.map((project) => (
          <ProjectItem project={project} key={project.id} team={team} />
        ))}
      </div>
    </>
  );
}
