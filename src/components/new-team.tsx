"use client";

import { Dialog, KoxyDialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";

interface Props {
  keepOpen?: boolean;
}

export default function NewTeam({ keepOpen }: Props) {
  const [open, setOpen] = useState<boolean>(keepOpen ?? false);

  useEffect(() => {
    setOpen(keepOpen ?? false);
  }, [keepOpen]);

  return (
    <Dialog open={open} onOpenChange={!keepOpen ? setOpen : () => {}}>
      <KoxyDialogContent close={!keepOpen} dialogTitle="new team">
        Hello
      </KoxyDialogContent>
    </Dialog>
  );
}
