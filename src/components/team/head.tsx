"use client";

import { getLimit } from "@/utils/plan";
import { Team, Member, Project, User, Invite } from "@prisma/client";
import {
  IconBox,
  IconChartBar,
  IconChartLine,
  IconChevronRight,
  IconSettings,
  IconSlash,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Session } from "next-auth";
import { useState } from "react";
import TeamMembers from "./members";

interface Props {
  session: Session;
  team: Team;
  member: Member;
  teamMembers: Member[];
  projects: Project[];
  teamUsers: User[];
  invites: Invite[];
}

export default function TeamHead({
  session,
  team,
  member,
  projects,
  teamMembers,
  teamUsers,
  invites
}: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: {
    id: string;
    name: string;
    icon: React.ReactNode;
    component: React.ReactNode;
    description: React.ReactNode;
  }[] = [
    {
      id: "projects",
      name: "Projects",
      icon: <IconBox size={16} />,
      component: <div>Projects</div>,
      description: `${projects.length}/${getLimit(
        team.tier,
        "projects"
      )} projects`,
    },
    {
      id: "team",
      name: "Team",
      icon: <IconUsersGroup size={16} />,
      component: (
        <TeamMembers
          session={session}
          team={team}
          members={teamUsers}
          roles={teamMembers}
          invites={invites}
        />
      ),
      description: `${teamMembers.length}/${getLimit(
        team.tier,
        "members"
      )} members`,
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: <IconChartLine size={16} />,
      component: <div>Analytics</div>,
      description: "Your team analytics",
    },
    {
      id: "usage",
      name: "Usage",
      icon: <IconChartBar size={16} />,
      component: <div>Usage</div>,
      description: "Current billing cycle usage",
    },
    {
      id: "settings",
      name: "Settings",
      icon: <IconSettings size={16} />,
      component: <div>Settings</div>,
      description: "Manage this team",
    },
  ];

  return (
    <div className="pt-14">
      <div className="p-6 pb-0 bg-gray-900/40 border-b-1 border-border/70 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="text-gray-400 font-semibold text-sm">{team.name}</div>
          <IconChevronRight size={16} className="opacity-40" />
          <div className="flex items-center gap-2 text-sm">
            <div className="p-1 border rounded-md flex items-center justify-center">
              {tabs[activeTab].icon}
            </div>
            {tabs[activeTab].name}
          </div>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {tabs[activeTab].description}
        </div>
        <div className="flex items-center mt-5 gap-3">
          {tabs.map((tab, index) => (
            <div
              key={`tab-${tab.id}`}
              className="text-sm flex flex-col items-center justify-center pt-3 pb-2 hover:bg-gray-900/50 relative cursor-pointer rounded-t-md transition-all"
              onClick={() => setActiveTab(index)}
            >
              <div
                className={`${
                  activeTab === index ? "text-gray-200" : "text-gray-400"
                } px-2 text-xs flex items-center gap-1`}
              >
                {tab.icon}
                {tab.name}
              </div>
              <div
                className={`${
                  activeTab === index
                    ? "max-w-max w-full opacity-100"
                    : "max-w-0 opacity-0"
                } transition-all duration-500`}
              >
                <div className="mt-2 h-1 w-full bg-gray-400 absolute -bottom-0.5 left-0 rounded-t-2xl z-10 "></div>
                <div className="mt-2 h-0.5 w-full bg-gradient-to-r from-transparent via-white to-transparent absolute bottom-0 left-0 blur-sm z-0"></div>
                <div className="mt-2 h-0.5 w-full bg-gradient-to-r from-transparent via-white to-transparent absolute bottom-0 left-0 blur-md z-0"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full p-6 flex flex-col gap-4">
        {tabs[activeTab].component}
      </div>
    </div>
  );
}
