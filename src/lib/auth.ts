import { NextAuthOptions, getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const getCred = (provider: string) => {
  provider = provider.toUpperCase();
  const clientId = process.env[`${provider}_CLIENT_ID`];
  const clientSecret = process.env[`${provider}_CLIENT_SECRET`];

  if (!clientId || !clientSecret) {
    throw new Error(`Invalid '${provider}' client ID or secret`);
  }

  return { clientId, clientSecret };
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: `${process.env.NEXTAUTH_SECRET}`,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  providers: [
    GoogleProvider(getCred("google")),
    GithubProvider(getCred("github")),
    CredentialsProvider({
      credentials: {
        id: { type: "text" },
      },
      authorize: async (creds, req) => {
        const user = await db.user.findFirst({ where: { id: creds?.id } });

        return user ?? null;
      },
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.teams = token.teams;
      }

      return session;
    },

    async jwt({ token }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        return token;
      }

      const jwt: JWT = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        teams: JSON.parse(dbUser.teams),
      };

      return jwt;
    },

    redirect() {
      return "/app";
    },
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}