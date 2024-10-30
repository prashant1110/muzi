import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userEmail = req.nextUrl.searchParams.get("email");

  const user = await prismaClient.user.findFirst({
    where: {
      email: userEmail || "",
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        message: "UnAuthenticated",
      },
      {
        status: 403,
      }
    );
  }

  return NextResponse.json({
    user,
  });
}
