"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Api } from "@/types/koxy";
import { getLimit } from "@/utils/plan";
import { Team } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function newCloudspace(
  team: Team,
  name: string,
  api: Api
): Promise<FuncResponse | void> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { success: false, error: "Not authenticated" };
  }

  const cloudspaceId = Math.random().toString(36).substring(2, 12);
  let cloudspace;

  try {
    api.id = cloudspaceId;

    const [projects] = await Promise.all([
      db.project.findMany({
        where: {
          teamId: team.id,
        },
      }),
    ])

    if (projects.length >= getLimit(team.tier ?? 0, "projects")) {
      return { success: false, error: "You have reached the limit of cloudspaces" };
    }

    cloudspace = await db.project.create({
      data: {
        id: cloudspaceId,
        name,
        teamId: team.id,
        api: JSON.stringify(api),
      },
    });
  } catch (err) {
    console.error(err);
    return { success: false, error: "Something went wrong" };
  }

  if (!cloudspace) {
    return { success: false, error: "Something went wrong" };
  }

  return redirect(`/app/${team.uniqueName}/cloudspace/${cloudspace.id}`);
}
