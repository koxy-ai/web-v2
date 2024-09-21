import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import TeamHead from "@/components/team/head";
import { User } from "@prisma/client";

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

  const [teams, members, projects, teamMembers] = await Promise.all([
    db.team.findMany({
      where: { members: { some: { userId: session.user.id } } },
    }),
    db.member.findMany({
      where: { userId: session.user.id },
    }),
    db.project.findMany({
      where: { teamId: team.id },
    }),
    db.member.findMany({
      where: { teamId: team.id },
    }),
  ]);

  let teamUsers = await Promise.all(
    teamMembers.map((member) =>
      db.user.findUnique({ where: { id: member.userId } }) 
    )
  )

  teamUsers = teamUsers.filter((user) => user !== null) as User[]

  return (
    <>
      <Navbar
        session={session}
        currentTeam={id}
        members={members}
        teams={teams}
      />

      <TeamHead
        session={session}
        team={team}
        member={member}
        projects={projects}
        teamMembers={teamMembers}
        teamUsers={teamUsers as User[]}
      />
    </>
  );
}
