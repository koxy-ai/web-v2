/* eslint-disable no-unused-vars */

import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { AvailableGen } from "./available-gens";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    teams: string[];
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      teams: string[];
    };
  }
}
