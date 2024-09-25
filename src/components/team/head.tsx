"use client";

import { getLimit } from "@/utils/plan";
import { Team, Member, Project, User, Invite } from "@prisma/client";
import {
  IconBox,
  IconChartBar,
  IconChartLine,
  IconChevronRight,
  IconCloud,
  IconRocket,
  IconSettings,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Session } from "next-auth";
import { useState } from "react";
import TeamMembers from "./members";
import { getTier } from "@/utils/team-tiers";
import Button from "../tailus-ui/Button";
import TeamProjects from "./projects";
import Particles from "../ui/particles";

interface Props {
  session: Session;
  team: Team;
  member: Member;
  teamMembers: Member[];
  projects: Project[];
  teamUsers: User[];
  invites: Invite[];
}

interface Tab {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  description: React.ReactNode;
  limit?: () => boolean;
  limitMessage?: string;
}

export default function TeamHead({
  session,
  team,
  member,
  projects,
  teamMembers,
  teamUsers,
  invites,
}: Props) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: Tab[] = [
    {
      id: "projects",
      name: "Cloudspaces",
      icon: <IconCloud size={16} />,
      component: (
        <TeamProjects
          team={team}
          projects={projects}
        />
      ),
      description: `${projects.length}/${getLimit(
        team.tier,
        "projects"
      )} Cloudspaces`,
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
      limit: () => teamMembers.length >= getLimit(team.tier, "members"),
      limitMessage:
        "You have reached the maximum number of members, upgrade your plan to invite more members",
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
      {team.tier === 0 && (
        <div className="w-full p-6 py-4 border-b-1 bg-gradient-to-r from-white/5 to-transparent text-xs flex items-center gap-4 relative overflow-hidden">
          {/* <Particles className="absolute inset-0 w-full opacity-60 z-0" color="#4ade80" refresh /> */}
          <span className="opacity-90 w-full">
            Your team is on the free plan, you can test all of Koxy {"AI's"}{" "}
            features as you wish, but you need to upgrade to a paid plan in
            order to deploy your backend and use it in your app!
          </span>{" "}
          <Button.Root intent="gray" variant="ghost" size="xs" className="min-w-max z-10">
            <Button.Label className="text-xs">Upgrade now</Button.Label>
            <Button.Icon type="trailing">
              <IconChevronRight />
            </Button.Icon>
          </Button.Root>
        </div>
      )}
      <div className="w-full p-6 flex flex-col gap-4">
        {tabs[activeTab].component}
        {getTier(member.role) >= 50 &&
          team.tier < 2 &&
          tabs[activeTab]?.limit?.() && (
            <div className="text-xs p-6 border border-white/30 border-dashed rounded-lg flex gap-4 w-full relative overflow-hidden mt-3 items-end">
              <div className="w-full flex flex-col gap-2">
                <div className="flex items-center gap-1 mb-3">
                  <div
                    className="w-4 h-6 rounded-tl-[999px] border border-white/20"
                    style={{
                      boxShadow: "0px 0px 55px 0px rgba(255, 255, 255, .4)",
                    }}
                  ></div>
                  <div
                    className="w-4 h-6 rounded-br-[999px] border border-white/20 mb-2"
                    style={{
                      boxShadow: "0px 0px 55px 0px rgba(255, 255, 255, .4)",
                    }}
                  ></div>
                </div>
                <div className="text-sm font-semibold">Upgrade your team</div>
                <div>{tabs[activeTab].limitMessage}</div>
              </div>
              <Button.Root
                className="max-w-max min-w-max"
                style={{
                  textShadow: "0px 0px 5px rgba(255, 255, 255, .7)",
                }}
                intent="gray"
                variant="outlined"
                size="sm"
              >
                <Button.Label className="text-xs">Upgrade team</Button.Label>
                <Button.Icon type="trailing">
                  <IconRocket size={16} />
                </Button.Icon>
              </Button.Root>
            </div>
          )}
      </div>
    </div>
  );
}
