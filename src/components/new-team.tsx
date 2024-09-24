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
import createTeam from "@/functions/team/create";
import { toast } from "sonner";
import LoadingIcon from "./tailus-ui/Loading";

interface Props {
  session: Session;
  keepOpen?: boolean;
  children?: React.ReactNode;
}

export default function NewTeam({ session, keepOpen, children }: Props) {
  const [open, setOpen] = useState<boolean>(keepOpen ?? false);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

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

  const submit = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const res = await createTeam(name, url);

      if (res?.success === false) {
        toast.error(res.error);
        return;
      }

      toast.success("Team created!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={!keepOpen && !loading ? setOpen : () => {}}>
      {children && (
        <Dialog.Trigger asChild>
          <div onClick={() => setOpen(prev => !prev)}>
            {children}
          </div>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="z-50 bg-black/40 backdrop-blur" />
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
                onInput={(e) => setUrl(cleanUrl(e.currentTarget.value))}
              />
              <Caption>koxy.cloud/app/{url}</Caption>
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
              intent="success"
              size="sm"
              className="border"
              onClick={submit}
              disabled={loading}
            >
              <Button.Label className="text-sm">Create new team</Button.Label>
              {loading && (
                <Button.Icon>
                  <LoadingIcon />
                </Button.Icon>
              )}
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
