"use client";

import { User, Member, Team } from "@prisma/client";
import Avatar from "../tailus-ui/Avatar";
import Dropdown from "../tailus-ui/DropdownMenu";
import Button from "../tailus-ui/Button";
import Dialog from "@tailus-ui/Dialog";
import { IconDots } from "@tabler/icons-react";
import { useState } from "react";
import { canManage } from "@/utils/team-tiers";
import SeparatorRoot from "../tailus-ui/Seperator";
import removeTeamMember from "@/functions/team/remove-member";
import { toast } from "sonner";
import LoadingIcon from "../tailus-ui/Loading";

interface Props {
  currentMember: Member;
  user: User;
  member: Member;
  role: string;
  team: Team;
}

export default function MemberItem({
  user,
  member,
  team,
  role,
  currentMember,
}: Props) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const remove = async () => {
    setDeleteLoading(true);

    try {
      const res = await removeTeamMember(team.id, member.id);
      if (res?.success === false) {
        setDeleteLoading(false);
        toast.error(res.error);
      } else {
        location.href = `/app/${team.uniqueName}`;
        setDeleteOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div
      key={member.id}
      className="p-3 px-6 border-b-1 hover:bg-gray-900/30 flex items-center gap-2 border-border/50"
    >
      <div className="flex items-center gap-2 w-full">
        <Avatar.Root size="xs">
          <Avatar.Image src={user.image || "/NONE"} className="min-w-max" />
          <Avatar.Fallback variant="soft" intent="gray">
            {user.name?.substring(0, 1)}
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="text-xs">
          <div>{user.name}</div>
          <div className="text-xs opacity-50">{user.email}</div>
        </div>
      </div>
      <div className="w-64 text-xs opacity-70">{role}</div>
      <Dropdown.Root>
        <Dropdown.Trigger asChild>
          <Button.Root intent="gray" size="xs" variant="ghost" className="w-8">
            <Button.Icon type="only">
              <IconDots size={16} />
            </Button.Icon>
          </Button.Root>
        </Dropdown.Trigger>
        <Dropdown.Portal>
          <Dropdown.Content
            sideOffset={5}
            mixed
            className="z-30 p-2"
            data-shade="950"
          >
            {currentMember.userId !== user.id ? (
              <Dropdown.Item
                intent="danger"
                disabled={
                  role === "OWNER" || canManage(currentMember.role, role)
                }
              >
                Remove member
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                intent="danger"
                onClick={() => setDeleteOpen(true)}
                // disabled={
                //   role === "OWNER" || canManage(currentMember.role, role)
                // }
              >
                Leave team
              </Dropdown.Item>
            )}
          </Dropdown.Content>
        </Dropdown.Portal>
      </Dropdown.Root>
      <Dialog.Root open={deleteOpen} onOpenChange={!deleteLoading ? setDeleteOpen : () => {}}>
        <Dialog.Portal>
          <Dialog.Overlay className="z-50" />
          <Dialog.Content className="max-w-sm z-50" mixed data-shade="950">
            <Dialog.Title className="text-sm">Remove member</Dialog.Title>
            <Dialog.Description className="mt-2 text-xs">
              This action {"can't"} be undone but you can invite this member
              again later
            </Dialog.Description>
            <SeparatorRoot dashed className="mt-5" />
            <Dialog.Actions>
              <Dialog.Close asChild>
                <Button.Root
                  variant="ghost"
                  size="xs"
                  intent="gray"
                  disabled={deleteLoading}
                >
                  <Button.Label className="text-xs">Cancel</Button.Label>
                </Button.Root>
              </Dialog.Close>
                <Button.Root
                  size="xs"
                  intent="danger"
                  className="border"
                  disabled={deleteLoading}
                  onClick={remove}
                >
                  {deleteLoading && (
                    <Button.Icon>
                      <LoadingIcon />
                    </Button.Icon>
                  )}
                  <Button.Label className="text-xs">Remove</Button.Label>
                </Button.Root>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
