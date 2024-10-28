"use server";

import { db } from "@/lib/db";

interface Success {
  success: true;
}

interface Failure {
  success: false;
  error: string;
}

export default async function joinWaitlist(
  email: string
): Promise<Success | Failure> {
  if (typeof email !== "string" || email.length < 1) {
    return { success: false, error: "Please enter a valid email" };
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const valid = regex.test(email);

  if (!valid) {
    return { success: false, error: "Please enter a valid email" };
  }

  try {
    const exist = await db.waitlist.findUnique({ where: { email } });

    if (exist) {
      return { success: false, error: "Email already in the waitlist!" };
    }

    await db.waitlist.create({ data: { email } });
  } catch (err) {
    console.error(err);
    return { success: false, error: "Unexpected error!" };
  }

  return { success: true };
}
