"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { BorderBeam } from "../ui/border-beam";
import Input from "../tailus-ui/Input";
import Button from "../tailus-ui/Button";
import LoadingIcon from "../tailus-ui/Loading";
import joinWaitlist from "@/functions/waitlist/add";
import { toast } from "sonner";
import JSConfetti from "js-confetti";

interface Props {
  children: React.ReactNode;
}

export function Waitlist({ children }: Props) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const add = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await joinWaitlist(email);

      if (!res) throw new Error();

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success("Successfully joined the waitlist!");
      setOpen(false);
      setEmail("");
      const jsConfetti = new JSConfetti();
      jsConfetti.addConfetti();
    } catch (err) {
      console.error(err);
      toast.error("Faced unexpected error!", {
        description: "Please try again later!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={!loading ? setOpen : () => {}}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="no-scrollbar">
        <BorderBeam />
        <div>Join the waitlist</div>
        <div className="text-sm opacity-60">
          Enter your email to get notified once Koxy V2 is launched, and get 20%
          off during the first 3 months
        </div>
        <Input
          value={email}
          variant="plain"
          placeholder="Enter your email..."
          className="border bg-gray-900/40 px-2.5 rounded-lg"
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <Button.Root
          size="sm"
          intent="secondary"
          disabled={loading}
          onClick={add}
        >
          {loading && (
            <Button.Icon>
              <LoadingIcon />
            </Button.Icon>
          )}
          <Button.Label className="text-sm">Join the waitlist</Button.Label>
        </Button.Root>
      </DialogContent>
    </Dialog>
  );
}
