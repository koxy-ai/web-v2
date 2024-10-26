import CloudspaceLayout from "@/components/cloudspace/layout";
import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string; cloudspace: string };
}

export default async function Page({ params: { id, cloudspace } }: Props) {
  const session = (await getServerSession(authOptions))!;

  const team = await db.team.findFirst({
    where: { uniqueName: id },
  });

  if (!team) {
    return redirect("/app");
  }

  const [project, teams, members, invites] = await Promise.all([
    db.project.findFirst({
      where: { id: cloudspace, teamId: team.id },
    }),
    db.team.findMany({
      where: { members: { some: { userId: session.user.id } } },
    }),
    db.member.findMany({
      where: { userId: session.user.id },
    }),
    db.invite.findMany({
      where: { userEmail: session.user.email! },
    }),
  ]);

  if (!project || !team) {
    return redirect("/app");
  }

  return (
    <>
      <Navbar
        session={session}
        currentTeam={id}
        members={members}
        teams={teams}
        invites={invites}
      />
      <div className="">
        <CloudspaceLayout team={team} project={project} />
      </div>
    </>
  );
}
