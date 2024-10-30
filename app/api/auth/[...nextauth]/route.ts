import { prismaClient } from "@/lib/db";
import NextAuth, { Account, AuthOptions, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";


export const authOptions:AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account, profile }: { user: User | AdapterUser; account: Account | null; profile?: Profile }) => {
      try {
        const existingUser = await prismaClient.user.findFirst({
          where: { email: user.email || ""},
        });

        if (!existingUser) {
          await prismaClient.user.create({
            data: {
              email: user.email || "",
              provider: "Google",
            },
          });
        }
      } catch (error) {
        NextResponse.json({
          message: error,
        });
        return false
      }

      return true;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
