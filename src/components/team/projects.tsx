"use client";

import { Project, Team } from "@prisma/client";
import { useState } from "react";
import Input from "../tailus-ui/Input";
import Button from "../tailus-ui/Button";
import { getLimit } from "@/utils/plan";

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

  return (
    <>
      <div className="flex items-center gap-3">
        <Input
          size="sm"
          className="w-64 text-xs focus:outline-transparent focus:border-white/20"
          data-shade="925"
          placeholder="Search projects"
          onInput={handleSearch}
        />
        <div className="w-full"></div>
        <Button.Root
          intent="secondary"
          size="xs"
          className="border"
          disabled={getLimit(team.tier, "projects") <= projects.length}
        >
          <Button.Label className="text-xs min-w-max">
            New project
          </Button.Label>
        </Button.Root>
      </div>
    </>
  );
}
