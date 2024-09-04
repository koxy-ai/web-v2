import Link from "next/link";
import Logo from "./logo";
import { IconChevronRight } from "@tabler/icons-react";

interface Link {
  name: string;
  href: string;
}

interface Props {
  links?: Link[];
}

export default function Navbar({ links }: Props) {
  return (
    <div className="fixed top-0 left-0 w-full flex items-center gap-2 z-50 bg-background border-b-1">
      <Logo />
      {links?.map((link) => (
        <>
          <IconChevronRight size={16} className="opacity-50" />
          <Link
            href={link.href}
            className="text-xs opacity-60 hover:opacity-100"
          >
            {link.name}
          </Link>
        </>
      ))}
    </div>
  );
}
