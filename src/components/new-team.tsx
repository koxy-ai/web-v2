"use client";

import Dialog from "@tailus-ui/Dialog";
import { useState, useEffect } from "react";
import SeparatorRoot from "./tailus-ui/Seperator";
import Label from "./tailus-ui/Label";
import Input from "./tailus-ui/Input";
import Button from "./tailus-ui/Button";
import { IconChevronRight } from "@tabler/icons-react";
import { Caption } from "./tailus-ui/typography";
import { Session } from "next-auth";

interface Props {
  session: Session;
  keepOpen?: boolean;
}

export default function NewTeam({ session, keepOpen }: Props) {
  const [open, setOpen] = useState<boolean>(keepOpen ?? false);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const cleanUrl = (value: string) => {
    return value.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
  }

  useEffect(() => {
    setOpen(keepOpen ?? false);
  }, [keepOpen]);

  useEffect(() => {
    setName(`${session.user.name}'s team`);
    setUrl(cleanUrl(`${session.user.name}'s team`));
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={!keepOpen ? setOpen : () => {}}>
      <Dialog.Portal>
        <Dialog.Overlay className="z-40 bg-black/40" />
        <Dialog.Content
          className="z-50 max-w-lg border-1 border-border/50 outline-none"
          data-shade="950"
        >
          <Dialog.Title>New team</Dialog.Title>
          <Dialog.Description size="sm" className="mt-1">
            Create a new team to start
          </Dialog.Description>

          <SeparatorRoot dashed className="my-6" />

          <div className="space-y-6">
            <div className="space-y-2.5">
              <Label size="sm" htmlFor="team-name">
                Team name *
              </Label>
              <Input
                type="text"
                id="team-name"
                required
                data-rounded="large"
                variant="soft"
                color="purple"
                className="outline-none bg-gray-900/20 border border/border/60 focus:border-border"
                placeholder="Team name..."
                value={name}
                onInput={(e) => setName(e.currentTarget.value)}
              />
            </div>

            <div className="space-y-2.5">
              <Label size="sm" htmlFor="team-url">
                Unique path *
              </Label>
              <Input
                type="text"
                id="team-url"
                required
                data-rounded="large"
                variant="soft"
                className="outline-none bg-gray-900/20 border border/border/60 focus:border-border"
                placeholder="Unique team path or url"
                value={url}
                onInput={(e) => setUrl(e.currentTarget.value)}
              />
              <Caption>koxy.cloud/{url}</Caption>
            </div>
          </div>

          <Dialog.Actions className="-mx-[--card-padding] border-t px-[--card-padding] pt-[--card-padding]">
            {!keepOpen && (
              <Dialog.Close asChild>
                <Button.Root variant="outlined" intent="gray" size="sm">
                  <Button.Label>Cancel</Button.Label>
                </Button.Root>
              </Dialog.Close>
            )}
            <Button.Root
              variant="solid"
              intent="secondary"
              size="sm"
              className="border"
            >
              <Button.Label className="text-sm">Create new team</Button.Label>
              <Button.Icon type="trailing">
                <IconChevronRight />
              </Button.Icon>
            </Button.Root>
          </Dialog.Actions>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
