import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PageClient from "./client";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: Props) {
  const session = (await getServerSession(authOptions))!;

  const team = await db.team.findUnique({
    where: { uniqueName: id },
  });

  if (!team) {
    return redirect("/app");
  }

  const member = await db.member.findFirst({
    where: { teamId: team.id, userId: session.user.id },
  });

  if (!member) {
    return redirect("/app");
  }

  const [teams, members] = await Promise.all([
    db.team.findMany({
      where: { members: { some: { userId: session.user.id } } },
    }),
    db.member.findMany({
      where: { userId: session.user.id },
    }),
  ]);

  return (
    <>
      <PageClient
        session={session}
        currentTeam={id}
        members={members}
        teams={teams}
      />
    </>
  );
}
