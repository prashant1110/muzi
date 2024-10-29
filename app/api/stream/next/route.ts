import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  const spaceId = req.nextUrl.searchParams.get("spaceId");

  if (!spaceId) {
    return NextResponse.json(
      {
        message: "no space id",
      },
      {
        status: 403,
      }
    );
  }

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

  const mostUpVotedStream = await prismaClient.stream.findFirst({
    where: {
      spaceId: spaceId,
      played: false,
    },
    orderBy: {
      upvotes: {
        _count: "desc",
      },
    },
  });

  await Promise.all([
    prismaClient.currentStream.upsert({
      where: {
        userId: user.id,
        spaceId: spaceId,
      },
      update: {
        streamId: mostUpVotedStream?.id,
      },
      create: {
        userId: user.id,
        streamId: mostUpVotedStream?.id,
        spaceId: spaceId,
      },
    }),
    prismaClient.stream.update({
      where: {
        id: mostUpVotedStream?.id ?? "",
      },
      data: {
        played: true,
        playedTimeStamp: new Date(),
      },
    }),
  ]);

  return NextResponse.json({ stream: mostUpVotedStream });
}
