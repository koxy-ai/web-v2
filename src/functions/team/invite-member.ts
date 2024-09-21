"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getLimit } from "@/utils/plan";
import { getTier } from "@/utils/team-tiers";
import { Invite } from "@prisma/client";
import { getServerSession } from "next-auth";

export default async function inviteMember(
  teamId: string,
  email: string,
  role: string
): Promise<FuncResponse<Invite>> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to invite a member",
    };
  }

  try {
    const member = await db.member.findFirst({
      where: {
        userId: session.user.id,
        teamId,
      },
    });

    if (!member || getTier(member.role) < 50) {
      return {
        success: false,
        error: "You do not have permission to invite members",
      };
    }

    const team = await db.team.findFirst({
      where: {
        id: teamId,
      },
    });

    if (!team) {
      return {
        success: false,
        error: "Team not found",
      };
    }

    const members = await db.member.findMany({
      where: {
        teamId,
      },
    });

    if (members.length >= getLimit(team.tier, "members")) {
      return {
        success: false,
        error: "Team members limit reached",
      };
    }

    const user = await db.user.findFirst({where: {email}});

    const existMember = members.find((m) => m.userId === user?.id);

    if (existMember) {
      return {
        success: false,
        error: "Member is already in the team",
      };
    }

    const data = await db.invite.create({
      data: {
        teamId,
        userEmail: email,
        role,
        state: "pending",
        teamName: team.name,
      },
    })

    return { success: true, data };
  } catch (err) {
    console.error(err);

    return { success: false, error: "Can't invite member due to an error" };
  }
}
