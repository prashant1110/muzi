import { prismaClient } from "@/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { NextResponse } from "next/server";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async (account: any) => {
      try {
        const existingUser = await prismaClient.user.findFirst({
          where: { email: account.user.email },
        });

        if (!existingUser) {
          await prismaClient.user.create({
            data: {
              email: account.user.email,
              provider: "Google",
            },
          });
        }
      } catch (error) {
        NextResponse.json({
          message: "Unable to sign in",
        });
      }

      return true;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
