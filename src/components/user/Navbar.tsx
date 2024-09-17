"use client";

import { Session } from "next-auth";

interface Props {
  session: Session;
}

export default function UserNavbar({ session }: Props) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-16 flex items-center gap-3 z-30 border-b-1 border-border/60 bg-gray-900/30 backdrop-blur"></div>
    </>
  );
}
