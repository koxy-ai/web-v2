"use client";

import { Team } from "@prisma/client";
import Dialog from "@tailus-ui/Dialog";

interface Props {
  team: Team;
  children: React.ReactNode;
}

export default function AddMember({ team, children }: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="z-40 bg-black/50" />
        <Dialog.Content mixed data-shade="950" className="max-w-lg z-50">
          <Dialog.Title>Add member to {team.name}</Dialog.Title>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
