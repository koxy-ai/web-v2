import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NewTeam from "@/components/new-team";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = (await getServerSession(authOptions))!;
  const members = await db.member.findMany({
    where: { userId: session.user.id },
  });

  if (members.length < 1) {
    return <div className="dark">
      <NewTeam keepOpen session={session} />
    </div>;
  }

  const teams = await db.team.findMany({
    where: { id: { in: members.map((m) => m.teamId) } },
  });

  const latestTeam = teams.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )[0];

  return redirect(`/app/${latestTeam.uniqueName}`);
}
