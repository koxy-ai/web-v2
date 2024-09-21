"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function ignoreInvite(
  inviteId: string
): Promise<FuncResponse> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { success: false, error: "Not authenticated" };
  }

  await db.invite.update({
    where: { id: inviteId },
    data: { state: "ignored" },
  });

  return { success: true, data: null };
}
