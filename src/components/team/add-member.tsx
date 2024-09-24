"use client";

import { Invite, Team } from "@prisma/client";
import {
  IconArrowsVertical,
  IconUserCode,
  IconUserPentagon,
} from "@tabler/icons-react";
import Dialog from "@tailus-ui/Dialog";
import Select from "@tailus-ui/Select";
import Button from "@tailus-ui/Button";
import { useState } from "react";
import SeparatorRoot from "../tailus-ui/Seperator";
import Input from "../tailus-ui/Input";
import inviteMember from "@/functions/team/invite-member";
import { toast } from "sonner";
import LoadingIcon from "../tailus-ui/Loading";

interface Props {
  team: Team;
  children: React.ReactNode;
  pushInvite: (invite: Invite) => any;
}

interface Role {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export default function AddMember({ team, children, pushInvite }: Props) {
  const [role, setRole] = useState<string>();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles: Role[] = [
    { id: "ADMIN", name: "Admin", icon: <IconUserPentagon size={16} /> },
    { id: "DEVELOPER", name: "Developer", icon: <IconUserCode size={16} /> },
  ];

  const add = async () => {
    if (loading) return;

    if (!role || !email) {
      toast.error("Please select a role and enter an email address");
      return;
    }

    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      setLoading(false);
      return;
    }

    try {
      const res = await inviteMember(team.id, email, role!);

      if (res?.success === false) {
        toast.error(res.error);
      } else {
        toast.success("Invite sent successfully");
        setOpen(false);
        setEmail("");
        setRole(undefined);

        pushInvite(res.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while sending the invite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={!loading ? setOpen : () => {}}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-40 bg-black/50" />
        <Dialog.Content mixed data-shade="950" className="max-w-lg z-50">
          <Dialog.Title className="text-sm mb-2">
            Invite a member to {team.name}
          </Dialog.Title>
          <Dialog.Description className="text-xs">
            The member needs to accept the invite from their notifications to
            join. make sure to define the role carefully as it {"can't"} be
            changed later
          </Dialog.Description>

          <SeparatorRoot dashed className="my-6" />

          <div className="flex flex-col gap-3 mt-3">
            <Select.Root value={role} onValueChange={setRole}>
              <Select.Trigger
                size="md"
                data-shade="950"
                className="flex items-center w-full outline-transparent relative text-xs"
                data-rounded="large"
              >
                <Select.Value
                  placeholder="Select Role"
                  className="min-w-full text-xs opacity-70 outline-none"
                />
                <IconArrowsVertical
                  size={14}
                  className="opacity-60 absolute top-2 right-3"
                />
              </Select.Trigger>
              <Select.Portal>
                <Select.Content
                  mixed
                  className="z-50 outline-none transition-all"
                  data-shade="925"
                  intent="gray"
                  variant="soft"
                >
                  <Select.Viewport className="outline-none">
                    {roles.map((role) => (
                      <Select.Item
                        key={`role-select-${role.id}`}
                        value={role.id}
                        intent="gray"
                        className="items-center"
                      >
                        <Select.ItemIndicator className="text-white! bg-white/20 rounded-full w-2 h-2" />
                        <Select.ItemText>
                          <span className="flex items-center gap-2">
                            {role.icon} {role.name}
                          </span>
                        </Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>

            <Input
              placeholder="Email Address"
              className="w-full focus:border-white/20 text-xs"
              type="email"
              data-rounded="xlarge"
              value={email}
              onInput={(e) => setEmail(e.currentTarget.value)}
            />
          </div>

          <Dialog.Actions>
            <Dialog.Close>
              <Button.Root
                size="xs"
                intent="gray"
                variant="ghost"
                disabled={loading}
              >
                <Button.Label className="text-xs">Cancel</Button.Label>
              </Button.Root>
            </Dialog.Close>
            <Button.Root
              size="xs"
              intent="success"
              className="border"
              onClick={add}
              disabled={loading}
            >
              {loading && (
                <Button.Icon>
                  <LoadingIcon />
                </Button.Icon>
              )}
              <Button.Label className="text-xs">Send invite</Button.Label>
            </Button.Root>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
