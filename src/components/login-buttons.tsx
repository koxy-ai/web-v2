"use client";

import { signIn } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  callbackUrl?: string;
}

export default function LoginButtons({ callbackUrl }: Props) {
  const [loading, setLoading] = useState<{ google: boolean; github: boolean }>({
    google: false,
    github: false,
  });

  const getLoading = (provider: "google" | "github") => loading[provider];

  const continueSignin = async (provider: "google" | "github") => {
    setLoading({ ...loading, [provider]: true });
    try {
      await signIn(provider, { callbackUrl: callbackUrl || "/projects" });
    } catch {
      toast.error("Can't sign in, try again later!");
    } finally {
      setLoading({ ...loading, [provider]: false });
    }
  };

  return (
    <div className="flex flex-col gap-4 md:w-[80%]">
      <Button
        className="w-full font-semibold"
        size="md"
        variant="solid"
        color="primary"
        startContent={<IconBrandGoogle />}
        isLoading={getLoading("google")}
        onPress={() => continueSignin("google")}
      >
        Continue with Google
      </Button>
      <Button
        className="w-full border dark:border-white/20 font-semibold"
        size="md"
        variant="light"
        startContent={<IconBrandGithub />}
        isLoading={getLoading("github")}
        onPress={() => continueSignin("github")}
      >
        Continue with Github
      </Button>
    </div>
  );
}
