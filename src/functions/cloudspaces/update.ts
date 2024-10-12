"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { Project } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function updateCloudspace(
  teamId: string,
  project: Partial<Project>
): Promise<FuncResponse> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Not logged in" };
  }

  const team = await db.team.findUnique({
    where: { id: teamId },
  });

  if (!team) {
    return { success: false, error: "Not authorized" };
  }

  try {
    await db.project.update({
      where: {
        id: project.id,
        teamId,
      },
      data: {
        ...project,
      },
    });
  } catch (err) {
    console.error(err);
    return { success: false, error: "Something went wrong" };
  }

  // await revalidatePath(`/app/${team.uniqueName}`);
  await revalidatePath(`/app/`);
  // await revalidatePath(`/app/${team.uniqueName}/cloudspace/${project.id}`);
  return { success: true, data: null };
}
