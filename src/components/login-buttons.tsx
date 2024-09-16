"use client";

import { signIn } from "next-auth/react";
import Button from "@tailus-ui/Button";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import LoadingIcon from "./tailus-ui/Loading";

interface Props {
  callbackUrl?: string;
}

export default function LoginButtons({ callbackUrl }: Props) {
  const [loading, setLoading] = useState<{ google: boolean; github: boolean }>({
    google: false,
    github: false,
  });

  const getLoading = (provider: "google" | "github") => loading[provider];
  const isLoading = () => loading["google"] || loading["github"];

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
      <Button.Root
        className="w-full text-sm border"
        intent="neutral"
        size="md"
        color="primary"
        disabled={getLoading("google")}
        onClick={() => {
          if (!isLoading()) continueSignin("google");
        }}
      >
        <Button.Icon>
          {getLoading("google") ? <LoadingIcon /> : <IconBrandGoogle size={20} />}
        </Button.Icon>
        <Button.Label>
          Continue with Google
        </Button.Label>
      </Button.Root>

      <Button.Root
        className="w-full text-sm"
        intent="gray"
        size="md"
        variant="outlined"
        disabled={getLoading("github")}
        onClick={() => {
          if (!isLoading()) continueSignin("github");
        }}
      >
        <Button.Icon>
          {getLoading("github") ? <LoadingIcon /> : <IconBrandGithub size={20} />}
        </Button.Icon>
        <Button.Label>
          Continue with Github
        </Button.Label>
      </Button.Root>
      {/* <Button.Root
        className="w-full border dark:border-white/20 font-semibold"
        size="md"
        variant="light"
        startContent={<IconBrandGithub />}
        isLoading={getLoading("github")}
        onPress={() => continueSignin("github")}
      >
        Continue with Github
      </Button.Root> */}
    </div>
  );
}
