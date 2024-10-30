import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();

  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email || "",
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

  const streams = await prismaClient.stream.findMany({
    where: {
      userId: user.id ?? "",
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
      upvotes: {
        where: {
          userId: user.id,
        },
      },
    },
  });

  return NextResponse.json({
    stream: streams.map(({ _count, ...rest }) => ({
      ...rest,
      upvotes: _count.upvotes,
      isUpVoted: rest.upvotes.length ? true : false,
    })),
  });
}
