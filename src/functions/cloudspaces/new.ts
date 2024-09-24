"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Api } from "@/types/koxy";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function newCloudspace(
  teamId: string,
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

    cloudspace = await db.project.create({
      data: {
        id: cloudspaceId,
        name,
        teamId,
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

  return redirect(`/team/${teamId}/cloudspace/${cloudspace.id}`);
}
