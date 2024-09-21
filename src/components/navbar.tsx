"use client";

import Link from "next/link";
import {
  IconBook,
  IconCheck,
  IconChevronDown,
  IconChevronRight,
  IconHelp,
  IconLogout,
  IconPlus,
  IconSettings,
  IconSlash,
  IconTicket,
  IconUsersGroup,
} from "@tabler/icons-react";
import { Session } from "next-auth";
import Avatar from "./tailus-ui/Avatar";
import Dropdown from "./tailus-ui/DropdownMenu";
import SeparatorRoot from "./tailus-ui/Seperator";
import { Member, Team } from "@prisma/client";
import NewTeam from "./new-team";
import { signOut } from "next-auth/react";
import Button from "./tailus-ui/Button";

interface Props {
  session: Session;
  currentTeam: string;
  members: Member[];
  teams: Team[];
}

export default function Navbar({
  session,
  currentTeam,
  members,
  teams,
}: Props) {
  const openTeam = teams.find((t) => t.uniqueName === currentTeam)!;

  return (
    <div className="fixed top-0 left-0 w-full flex items-center z-30 bg-background border-b-1 border-border/50 h-14 px-6 before:fixed before:inset-0 before:-z-40 before:[background-image:url('/grainy-bg.svg')] before:opacity-[0.030] before:h-14">
      <div className="flex items-center gap-1">
        <div className="w-3 h-5 rounded-tl-[999px] border border-white/20 bg-gray-900/50"></div>
        <div className="w-3 h-5 rounded-br-[999px] border border-white/20 bg-gray-900/50"></div>
      </div>
      <div className="ml-2">
        <IconSlash size={16} className="opacity-40" />
      </div>
      <Dropdown.Root>
        <Dropdown.Trigger asChild className="">
          <div
            className="min-w-max text-xs flex items-center gap-2 py-1 px-2 rounded-lg opacity-90 hover:opacity-100 transition-all cursor-default group"
            data-rounded="large"
          >
            <Avatar.Root
              size="xxs"
              className="group-hover:rotate-[-10deg] transition-all rounded-md"
            >
              <Avatar.Image
                src={openTeam.avatar || "/NONE"}
                alt={openTeam.uniqueName}
                className="rounded-md border"
              />
              <Avatar.Fallback
                variant="soft"
                intent="gray"
                className="rounded-md border"
              >
                {openTeam.name?.substring(0, 1)}
              </Avatar.Fallback>
            </Avatar.Root>
            <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-200">
              {openTeam.name}
              <IconChevronDown size={14} className="opacity-60" />
            </div>
          </div>
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Content
            sideOffset={5}
            mixed
            className="z-30 p-3 overflow-visible"
            data-shade="925"
            side="bottom"
          >
            {members.map((member) => {
              const team = teams.find((team) => team.id === member.teamId)!;
              return (
                <Dropdown.Item
                  key={team.id}
                  className="min-h-max h-12 p-3"
                  asChild
                >
                  <Link
                    href={`/app/${team.uniqueName}`}
                    className="flex items-center gap-3"
                  >
                    <Avatar.Root
                      size="xs"
                      className="group-hover:rotate-[-10deg] transition-all"
                    >
                      <Avatar.Image
                        src={team.avatar || "/NONE"}
                        alt={team.name}
                        className="rounded-md border"
                      />
                      <Avatar.Fallback
                        variant="soft"
                        intent="gray"
                        className="rounded-md border"
                      >
                        {team.name?.substring(0, 1)}
                      </Avatar.Fallback>
                    </Avatar.Root>
                    <div>
                      <div className="text-xs">{team.name}</div>
                      <div className="text-xs text-gray-400">
                        {member.role.toLowerCase()}
                      </div>
                    </div>
                    {currentTeam === team.uniqueName && (
                      <Dropdown.Icon>
                        <IconCheck size={14} className="opacity-50" />
                      </Dropdown.Icon>
                    )}
                  </Link>
                </Dropdown.Item>
              );
            })}
            <SeparatorRoot dashed className="my-3" />
            <NewTeam session={session}>
              <div
                className="flex items-center gap-2 text-sm p-2 cursor-pointer hover:bg-gray-900/80 rounded-md"
                data-rounded="large"
              >
                <Dropdown.Icon>
                  <IconPlus size={16} />
                </Dropdown.Icon>
                Create new team
              </div>
            </NewTeam>
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>

      <div className="w-full flex items-center justify-end gap-3">
        <Dropdown.Root>
          <Dropdown.Trigger className="outline-none">
            <Button.Root size="sm" variant="ghost" intent="gray">
              <Button.Icon type="only">
                <IconHelp size={16} />
              </Button.Icon>
            </Button.Root>
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content
              sideOffset={5}
              mixed
              className="z-30 p-1 overflow-visible text-sm"
              data-shade="950"
              side="bottom"
            >
              <Dropdown.Item className="text-xs">
                <Dropdown.Icon>
                  <IconBook size={16} />
                </Dropdown.Icon>
                Documentation
              </Dropdown.Item>
              <Dropdown.Item className="text-xs">
                <Dropdown.Icon>
                  <IconTicket size={16} />
                </Dropdown.Icon>
                Support ticket
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>

        <Dropdown.Root>
          <Dropdown.Trigger className="outline-none">
            <div className="flex items-center gap-1.5 bg-gray-900/50 rounded-full group hover:bg-gray-900/60 transition-all p-0.5">
              <Avatar.Root
                size="xs"
                className="group-hover:rotate-[-10deg] transition-all"
              >
                <Avatar.Image
                  src={session.user.image || "/NONE"}
                  alt={session.user.name || "Your profile"}
                />
                <Avatar.Fallback variant="soft" intent="gray">
                  {session.user.name?.substring(0, 1)}
                </Avatar.Fallback>
              </Avatar.Root>
              <IconChevronDown size={16} />
              <div></div>
            </div>
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content
              sideOffset={5}
              mixed
              className="z-30 p-3 overflow-visible"
              data-shade="950"
              side="bottom"
            >
              <div className="flex items-center gap-3">
                <Avatar.Root size="sm">
                  <Avatar.Image
                    src={session.user.image || "/NONE"}
                    alt={session.user.name || "Your profile"}
                  />
                  <Avatar.Fallback variant="soft" intent="gray">
                    {session.user.name?.substring(0, 1)}
                  </Avatar.Fallback>
                </Avatar.Root>
                <div className="flex flex-col">
                  <div className="text-sm">{session.user.name}</div>
                  <div className="text-xs text-gray-400">
                    {session.user.email}
                  </div>
                </div>
              </div>
              <SeparatorRoot dashed className="my-3" />
              <Dropdown.Item>
                <Dropdown.Icon>
                  <IconSettings size={16} />
                </Dropdown.Icon>
                Settings
              </Dropdown.Item>
              <Dropdown.Sub>
                <Dropdown.SubTrigger>
                  <Dropdown.Icon>
                    <IconUsersGroup size={16} className="min-w-max" />
                  </Dropdown.Icon>
                  <div className="w-full">Switch team</div>
                  <Dropdown.Icon>
                    <IconChevronRight size={16} className="min-w-max" />
                  </Dropdown.Icon>
                </Dropdown.SubTrigger>
                <Dropdown.SubContent sideOffset={2} alignOffset={-5}>
                  {members.map((member) => {
                    const team = teams.find(
                      (team) => team.id === member.teamId
                    )!;
                    return (
                      <>
                        <Dropdown.Item
                          key={team.id}
                          className="min-h-max h-12 p-3"
                          asChild
                        >
                          <Link
                            href={`/app/${team.uniqueName}`}
                            className="flex items-center gap-3"
                          >
                            <Avatar.Root
                              size="xs"
                              className="group-hover:rotate-[-10deg] transition-all"
                            >
                              <Avatar.Image
                                src={team.avatar || "/NONE"}
                                alt={team.name}
                                className="rounded-md border"
                              />
                              <Avatar.Fallback
                                variant="soft"
                                intent="gray"
                                className="rounded-md border"
                              >
                                {team.name?.substring(0, 1)}
                              </Avatar.Fallback>
                            </Avatar.Root>
                            <div>
                              <div className="text-xs">{team.name}</div>
                              <div className="text-xs text-gray-400">
                                {member.role.toLowerCase()}
                              </div>
                            </div>
                            {currentTeam === team.uniqueName && (
                              <Dropdown.Icon>
                                <IconCheck size={14} className="opacity-50" />
                              </Dropdown.Icon>
                            )}
                          </Link>
                        </Dropdown.Item>
                      </>
                    );
                  })}
                  <SeparatorRoot dashed className="my-3" />
                  <NewTeam session={session}>
                    <div
                      className="flex items-center gap-2 text-sm p-2 cursor-pointer hover:bg-gray-900/80 rounded-md"
                      data-rounded="large"
                    >
                      <Dropdown.Icon>
                        <IconPlus size={16} />
                      </Dropdown.Icon>
                      Create new team
                    </div>
                  </NewTeam>
                </Dropdown.SubContent>
              </Dropdown.Sub>
              <Dropdown.Item intent="danger" onClick={() => signOut()}>
                <Dropdown.Icon>
                  <IconLogout size={16} />
                </Dropdown.Icon>
                Logout
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>
      </div>
    </div>
  );
}
