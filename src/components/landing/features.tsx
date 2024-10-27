"use client";

import { TextRevealByWord } from "@/components/ui/text-reveal";
import ViewportAnimation from "@/components/viewport-animation";
import {
  IconCheck,
  IconMicrophone,
  IconRecharging,
  IconRocket,
  IconSend,
} from "@tabler/icons-react";
import { BorderBeam } from "@/components/ui/border-beam";

export const CardLight = () => {
  return (
    <ViewportAnimation
      off={{ opacity: 0, width: 0 }}
      on={{
        opacity: 0.4,
        width: "auto",
        transition: { delay: 0.3, duration: 5 },
      }}
      once={false}
    >
      <div className="w-36 h-36 rounded-full bg-white/5 blur-2xl absolute -top-4 -left-4"></div>
      <div className="w-10 h-10 rounded-full bg-white/5 blur-2xl absolute -top-4 -left-4"></div>
      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-60 absolute -top-14 left-4 rotate-[-40deg] blur-md"></div>
      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-60 absolute -top-14 left-4 rotate-[-40deg] blur-sm"></div>

      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-20 absolute -top-10 left-1 rotate-[-20deg] blur-sm"></div>
      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-20 absolute -top-10 left-1 rotate-[-20deg] blur-md"></div>
      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-20 absolute -top-10 left-1 rotate-[-10deg] blur-md"></div>
      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-20 absolute -top-10 left-1 rotate-[-0deg] blur-md"></div>

      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-20 absolute -top-14 left-1 rotate-[-30deg] blur-sm"></div>
      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-20 absolute -top-20 left-1 rotate-[-30deg] blur-sm"></div>
      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-20 absolute -top-20 left-1 rotate-[-50deg] blur-sm"></div>
      <div className="w-2 h-36 bg-gradient-to-b from-white to-transparent opacity-20 absolute -top-20 left-1 rotate-[-60deg] blur-sm"></div>

      <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-4 right-8 z-20 opacity-60" />

      <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-12 right-16 z-20 opacity-60" />

      <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-20 right-12 z-20 opacity-60" />
      <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-6 right-36 z-20 opacity-60" />
      <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-8 right-48 z-20 opacity-60" />
      <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-28 right-36 ml-3 z-20 opacity-60" />
    </ViewportAnimation>
  );
};

const Card0 = () => {
  return (
    <ViewportAnimation
      className="h-full w-full p-4 border rounded-xl bg-gray-900/10 backdrop-blur relative overflow-hidden hover:bg-gray-900/20 hover:border-white/20 group"
      once={false}
      threshold={0.1}
      off={{ opacity: 0, translateY: "20px" }}
      on={{ opacity: 1, translateY: 0, transition: { delay: 0.2 } }}
    >
      <CardLight />
      <div className="w-full flex items-center justify-center relative h-36">
        <div className="size-[100] w-20 h-20 rounded-full relative blur-sm">
          <BorderBeam />
          <BorderBeam />
        </div>
        <IconRecharging
          size={100}
          className="text-white absolute opacity-70 group-hover:rotate-[-20deg] transition-all"
        />
        <IconRecharging
          size={100}
          className="text-white absolute blur-sm opacity-50 group-hover:rotate-[-20deg] transition-all duration-500"
        />
        <IconRecharging
          size={100}
          className="text-white absolute blur-2xl opacity-30 group-hover:rotate-[-20deg] transition-all duration-500"
        />
        {/* <div className=""></div> */}
      </div>
      <div className="font-semibold mb-4">Easy, yet powerful</div>
      <div className="text-xs opacity-60">
        Won't introduce no new strange workflows, languages, or workarounds.
        <br />
        <br />
        You can use the built-in nodes for simple flows, and build your custom
        nodes from scratch in JS/TS or Python if needed.
        <br />
        <br />
        Or just use our AI to generate new nodes for your any use-case you have
        without any code.
      </div>
    </ViewportAnimation>
  );
};

const Card1 = () => {
  return (
    <ViewportAnimation
      className="h-full w-full p-4 border rounded-xl bg-gray-900/10 backdrop-blur relative overflow-hidden hover:bg-gray-900/20 hover:border-white/20"
      once={false}
      threshold={0.1}
      off={{ opacity: 0, translateY: "20px" }}
      on={{ opacity: 1, translateY: 0, transition: { delay: 0.4 } }}
    >
      <CardLight />
      <div className="w-full flex flex-col items-center justify-center relative h-36">
        <IconRocket
          size={400}
          className="absolute text-white z-0 inset-0 opacity-[.03]"
        />
        <div className="p-2 px-3 border rounded-xl bg-[#121212] text-xs absolute backdrop-blur top-12 z-10">
          <div>GPU MEDIUM</div>
          <div className="opacity-60">A10G - 8 CPU cores - 16GB RAM</div>
        </div>
        <div className="p-2 px-3 border rounded-xl bg-[#141414] text-xs absolute backdrop-blur top-20 z-0 rotate-[-10deg]">
          <div>CUSTOM</div>
          <div className="opacity-60">2 A100 - 12 CPU cores - 32GB RAM</div>
        </div>
        <div className="p-2 px-3 border rounded-xl bg-[#080808] text-xs absolute backdrop-blur top-2 z-10 rotate-[10deg]">
          <div>BASE</div>
          <div className="opacity-60">4 CPU cores - 8GB RAM</div>
        </div>
      </div>
      <div className="font-semibold mb-4 mt-4">Truly Scalable</div>
      <div className="text-xs opacity-60">
        I mean it for real, you can configure your projects to run on custom
        containers with Serverless dedicated CPUs, RAM, and even GPUs!
        <br />
        <br />
        You got built-in zero-downtime deploys, monitoring, auto-scaling, and
        your containers only run when needed reducing idle time and costs.
      </div>
    </ViewportAnimation>
  );
};

const Card2 = () => {
  return (
    <ViewportAnimation
      className="h-96 w-full p-8 border rounded-xl bg-gray-900/10 backdrop-blur relative overflow-hidden hover:bg-gray-900/20 hover:border-white/20 flex flex-col"
      once={false}
      threshold={0.1}
      off={{ opacity: 0, translateY: "20px" }}
      on={{ opacity: 1, translateY: 0, transition: { delay: 0.4 } }}
    >
      <CardLight />
      <BorderBeam />
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="flex flex-col w-[70%] relative rounded-xl overflow-hidden">
          <BorderBeam />
          <div className="w-full border rounded-xl p-3 pt-5 pl-5 flex flex-col bg-gray-900/20 backdrop-blur">
            <input
              placeholder="Generate new nodes or adjust any built-in node... how can I help
              you?"
              className="bg-transparent text-xs"
            />
            <div className="mt-6 w-full flex items-center justify-end pt-2 border-border/60 gap-2">
              <div className="w-7 h-7 flex items-center justify-center bg-gray-900 rounded-md">
                <IconMicrophone size={14} />
              </div>
              <div className="w-7 h-7 flex items-center justify-center bg-gray-900 rounded-md">
                <IconSend size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-semibold mb-4">AI-Powered, in a useful way</div>
      <div className="text-xs opacity-60 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <IconCheck size={14} />
          Build Multimodal AI apps using AI models from OpenAI, Stable
          Diffusion, HuggingFace, or any other provider
        </div>
        <div className="flex items-center gap-3">
          <IconCheck size={14} />
          There are a lot of no-code flows builders, but what about one with AI
          completions? yep, you got it!
        </div>
        <div className="flex items-center gap-3">
          <IconCheck size={14} />
          Generate new custom nodes using AI with text/voice instructions, with
          full type-safety in seconds
        </div>
      </div>
    </ViewportAnimation>
  );
};

export function Features() {
  return (
    <div className="w-full flex flex-col gap-4 z-10 pb-36">
      <TextRevealByWord text="I hate no-code tools, so I built a good one" />
      <div className="w-full flex items-center grid grid-cols-2 gap-4">
        <Card0 />
        <Card1 />
      </div>
      <Card2 />
    </div>
  );
}
