import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NewTeam from "@/components/new-team";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import PageClient from "./page.client";

export default async function Page() {
  const session = (await getServerSession(authOptions))!;

  const [members, invites] = await Promise.all([
    db.member.findMany({
      where: { userId: session.user.id },
    }),
    db.invite.findMany({
      where: { userEmail: session.user.email!, state: "pending" },
    }),
  ]);

  if (members.length < 1 && invites.length < 1) {
    return <NewTeam session={session} keepOpen />;
  }

  if (members.length < 1) {
    return (
      <PageClient session={session} invites={invites} />
    );
  }

  const [teams] = await Promise.all([
    db.team.findMany({
      where: { id: { in: members.map((m) => m.teamId) } },
    }),
  ]);

  const latestTeam = teams.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  )[0];

  return redirect(`/app/${latestTeam.uniqueName}`);
}
