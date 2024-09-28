"use client";

import { Api, CompCall, CompRes } from "@/types/koxy";
import { Project, Team } from "@prisma/client";
import { useState } from "react";
import Button from "../tailus-ui/Button";
import {
  IconApi,
  IconBook2,
  IconChartArea,
  IconDatabase,
  IconFunction,
  IconHome,
  IconPointerBolt,
  IconSettings,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import SideApi from "./side/api";

interface Props {
  project: Project;
  team: Team;
  api: Api;
  active: string;
  setActive: (a: string) => any;
  changeSide: (title: string, comp: CompRes) => any;
}

interface SideLink {
  id: string;
  name: string;
  icon: React.ReactNode;
  comp: CompRes;
}

export default function Sidebar({
  project,
  team,
  api,
  active,
  setActive,
  changeSide
}: Props) {
  const [open, setOpen] = useState(false);
  const [timeout, setTimeoutBool] = useState(false);

  const links: SideLink[] = [
    {
      id: "home",
      name: "Home",
      icon: <IconHome size={16} className="min-w-max" />,
      comp: () => <div>hi home</div>,
    },
    {
      id: "api",
      name: "Api",
      icon: <IconApi size={20} className="min-w-max" />,
      comp: (params: CompCall) => <SideApi {...params} />,
    },
    {
      id: "database",
      name: "Database",
      icon: <IconDatabase size={16} className="min-w-max" />,
      comp: () => <div>hi database</div>,
    },
    {
      id: "functions",
      name: "Functions",
      icon: <IconFunction size={18} className="min-w-max" />,
      comp: () => <div>hi</div>,
    },
    {
      id: "real-time",
      name: "Real-time",
      icon: <IconPointerBolt size={16} className="min-w-max" />,
      comp: () => <div>hi</div>,
    },
    {
      id: "analytics",
      name: "Analytics",
      icon: <IconChartArea size={16} className="min-w-max" />,
      comp: () => <div>hi</div>,
    },
    {
      id: "api-docs",
      name: "API Docs",
      icon: <IconBook2 size={16} className="min-w-max" />,
      comp: () => <div>hi</div>,
    },
    {
      id: "settings",
      name: "Settings",
      icon: <IconSettings size={16} className="min-w-max" />,
      comp: () => <div>hi</div>,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 p-3 pt-16 h-full border-r-1 z-20 flex flex-col items-center gap-4 border-border/50 ${
        !open ? "w-14" : "w-48"
      } transition-all duration-500 bg-gray-900/10 backdrop-blur-md`}
      onMouseEnter={() => {if (!timeout) setOpen(true)}}
      onMouseLeave={() => setOpen(false)}
    >
      {links.map((link) => (
        <Button.Root
          size="sm"
          intent="gray"
          variant={link.id === active ? "soft" : "ghost"}
          className={`w-full justify-start h-8 relative ${
            link.id === active ? "opacity-100" : "opacity-70 hover:opacity-90"
          }`}
          key={`sidebar-link-${link.id}`}
          onClick={() => {
            setActive(link.id);
            setOpen(false);

            changeSide(link.name, link.comp);

            setTimeoutBool(true);
            setTimeout(() => {
              setTimeoutBool(false);
            }, 700);
          }}
        >
          <div className="absolute h-full w-8 pr-0.5 flex items-center justify-center top-0 left-0">
            {link.icon}
          </div>
          {open && (
            <Button.Label className={`text-xs w-full text-start pl-4`}>
              <motion.div
                initial={{
                  opacity: 0,
                  translateX: -10,
                }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2, delay: 0.2 },
                  translateX: 0,
                }}
              >
                {link.name}
              </motion.div>
            </Button.Label>
          )}
        </Button.Root>
      ))}
    </div>
  );
}
