"use client";

import { Invite, Team } from "@prisma/client";
import {
  IconArrowsVertical,
  IconInfoCircle,
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
import { newApiFromSample } from "@/utils/apis";

interface Props {
  team: Team;
  children: React.ReactNode;
}

export default function AddProject({ team, children }: Props) {
  const [name, setName] = useState("");
  const [api, setApi] = useState(newApiFromSample());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={!loading ? setOpen : () => {}}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-40 bg-black/50" />
        <Dialog.Content
          mixed
          data-shade="950"
          className="max-w-lg z-50 p-0 overflow-auto no-scrollbar"
        >
          <div className="p-5">
            <Dialog.Title className="text-sm mb-2">New Cloudspace</Dialog.Title>
            <Dialog.Description className="text-xs">
              Your Cloudspace will have dedicated Serverless containers that you
              can configure later to exapnd its compute size, GPUs, timeouts, and
              more.
            </Dialog.Description>
          </div>

          <SeparatorRoot dashed className="" />

          <div className="flex items-center p-5 gap-3">
            <div className="w-full text-xs">Cloudspace name</div>
            <div>
              <Input
                placeholder="Enter your project's name"
                className="w-64 focus:border-white/20 text-xs bg-gray-900/20"
                type="email"
                data-rounded="large"
                size="sm"
                value={name}
                onInput={(e) => setName(e.currentTarget.value)}
              />
            </div>
          </div>

          <SeparatorRoot dashed className="" />

          <div className="text-xs opacity-50 py-3 pb-0 px-5 flex items-center gap-1">
            <IconInfoCircle size={14} />
            All configuration can be changed later from the {"cloudspace's"} settings
          </div>

          <Dialog.Actions className="p-5 border-t-1 border-dashed">
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
              disabled={loading}
            >
              {loading && (
                <Button.Icon>
                  <LoadingIcon />
                </Button.Icon>
              )}
              <Button.Label className="text-xs">Create Cloudspace</Button.Label>
            </Button.Root>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
