"use client";

import { Invite } from "@prisma/client";
import NewTeam from "@/components/new-team";
import { Session } from "next-auth";
import Button from "@/components/tailus-ui/Button";
import { IconBell, IconChevronRight } from "@tabler/icons-react";
import { useState } from "react";
import addMember from "@/functions/team/add-member";
import { toast } from "sonner";
import LoadingIcon from "@/components/tailus-ui/Loading";

interface Props {
  session: Session;
  invites: Invite[];
}

export default function PageClient({ session, invites }: Props) {
  const [loading, setLoading] = useState(false);

  const join = async (id: string) => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await addMember(id);

      if (res?.success === false) {
        toast.error(res.error);
      } else {
        toast.success("You have joined the team");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while joining the team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 p-24">
      {invites.map((inv) => (
        <div
          key={`invite-${inv.id}`}
          className="p-5 max-w-72 bg-gray-900/40 border rounded-lg flex flex-col gap-2 text-xs"
        >
          <IconBell size={16} />
          <div>
            {"You're"} Invited to work as <b>{inv.role.toLowerCase()}</b> in{" "}
            {inv.teamName}
          </div>
          <Button.Root
            size="xs"
            intent="gray"
            variant="outlined"
            className="max-w-max mt-2"
            disabled={loading}
            onClick={() => join(inv.id)}
          >
            <Button.Label className="text-xs">Join team</Button.Label>
            <Button.Icon type="trailing">
              <IconChevronRight size={14} />
            </Button.Icon>
            {loading && (
              <Button.Icon>
                <LoadingIcon />
              </Button.Icon>
            )}
          </Button.Root>
        </div>
      ))}
      <div className="my-2 text-xs opacity-50">or</div>
      <NewTeam session={session}>
        <Button.Root size="xs" intent="secondary" className="border" disabled={loading}>
          <Button.Label className="text-xs">Create your team</Button.Label>
        </Button.Root>
      </NewTeam>
    </div>
  );
}
