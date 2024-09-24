"use client";

import { Invite, Member, Team, User } from "@prisma/client";
import { Session } from "next-auth";
import Button from "../tailus-ui/Button";
import Input from "../tailus-ui/Input";
import Avatar from "@tailus-ui/Avatar";
import Dropdown from "@tailus-ui/DropdownMenu";
import { useState } from "react";
import { IconChevronDown, IconDots } from "@tabler/icons-react";
import MemberItem from "./member-item";
import { getLimit } from "@/utils/plan";
import { getTier } from "@/utils/team-tiers";
import AddMember from "./add-member";

interface Props {
  session: Session;
  team: Team;
  members: User[];
  roles: Member[];
  invites: Invite[];
}

export default function TeamMembers({
  session,
  team,
  members,
  roles,
  invites,
}: Props) {
  const [membersState, setMembersState] = useState(members);
  const [invitesState, setInvitesState] = useState(
    invites.filter((i) => i.state === "pending")
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredMembers = members.filter((member) =>
      member.name?.toLowerCase().includes(searchTerm)
    );
    setMembersState(filteredMembers);
  };

  const currentUser = roles.find((m) => m.userId === session.user.id)!;

  return (
    <>
      <div className="flex items-center gap-3">
        <Input
          size="sm"
          className="w-64 text-xs focus:outline-transparent focus:border-white/20"
          data-shade="925"
          placeholder="Search team members"
          onInput={handleSearch}
        />
        <div className="w-full"></div>
        <AddMember
          team={team}
          pushInvite={(i) => {
            setInvitesState([...invitesState, i]);
          }}
        >
          <Button.Root
            intent="success"
            size="xs"
            className="border"
            disabled={
              // getLimit(team.tier, "members") <= roles.length ||
              getTier(currentUser.role) < 50
            }
          >
            <Button.Label className="text-xs min-w-max">
              Invite member
            </Button.Label>
          </Button.Root>
        </AddMember>
      </div>
      <div className="p-3 px-6 rounded-xl bg-gray-900/60 flex items-center gap-3 text-xs">
        <div className="w-full">Account</div>
        <div className="w-48">Role</div>
        <div className="">Actions</div>
      </div>
      <div className="w-full flex flex-col">
        {membersState.map((member) => (
          <MemberItem
            key={member.id}
            user={member}
            member={roles.find((role) => role.userId === member.id)!}
            team={team}
            currentMember={currentUser}
            role={
              roles.find((role) => role.userId === member.id)?.role || "None"
            }
          />
        ))}
      </div>
      {invitesState.length > 0 && (
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <Button.Root size="xs" variant="ghost" intent="warning" className="border border-dashed border-yellow-400/70">
              <Button.Label className="text-xs">
                {invitesState.length} pending invitations
              </Button.Label>
              <Button.Icon type="trailing">
                <IconChevronDown size={16} />
              </Button.Icon>
            </Button.Root>
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content
              mixed
              className="z-50 outline-none transition-all"
              data-shade="925"
              intent="gray"
              variant="soft"
              sideOffset={5}
            >
                {invitesState.map((invite) => (
                  <Dropdown.Item
                    key={`invite-${invite.id}`}
                    intent="gray"
                    className="items-center text-xs"
                  >
                    {invite.userEmail}
                  </Dropdown.Item>
                ))}
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>
      )}
    </>
  );
}
