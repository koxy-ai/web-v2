"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default async function addMember(
  inviteId: string
): Promise<FuncResponse | void> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to invite a member",
    };
  }

  let invite;

  try {
    invite = await db.invite.findFirst({
      where: {
        id: inviteId,
        userEmail: session.user.email!,
      },
    });

    if (!invite) {
      return {
        success: false,
        error: "Invite not found",
      };
    }

    await db.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        state: "accepted",
      },
    });

    await db.member.create({
      data: {
        userId: session.user.id,
        teamId: invite.teamId,
        role: invite.role,
      },
    });
  } catch (err) {
    console.error(err);
    return {
      success: false,
      error: "An error occurred while accepting the invite",
    };
  }

  return revalidatePath(`/app/${invite.teamId}`);
}
