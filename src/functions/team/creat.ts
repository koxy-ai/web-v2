"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function createTeam(
  name: string,
  url: string
): Promise<FuncResponse | undefined> {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, error: "Unauthorized" };

    const urlExist = await db.team.findMany({ where: { uniqueName: url } });

    if (urlExist.length > 0)
      return { success: false, error: "Team url already exists" };

    const team = await db.team.create({
      data: {
        name,
        uniqueName: url,
        members: {
          create: {
            userId: session.user.id,
            role: "OWNER",
          },
        },
        credits: 0,
        tier: 0
      },
    });

    return redirect(`/app/${team.uniqueName}`);
  } catch (err) {
    console.error(err);

    return { success: false, error: "Something went wrong" };
  }
}
