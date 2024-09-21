"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function removeTeamMember(
  teamId: string,
  id: string
): Promise<FuncResponse> {
  const session = await getServerSession(authOptions);

  if (!session) return { success: false, error: "Not authenticated" };

  try {
    // await db.member.delete({
    //   where: { teamId, id, userId },
    // });
    await db.team.update({
      where: { id: teamId },
      data: {
        members: {
          delete: {
            id,
          },
        },
      },
    });

    return { success: true, data: null };
  } catch (err) {
    console.error("Error removing team member");
    return { success: false, error: "Error removing team member" };
  }
}
