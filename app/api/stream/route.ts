import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import { YT_REGEX } from "@/lib/util";
import { getServerSession } from "next-auth";

const CreateStream = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateStream.parse(await req.json());
    const isYt = data.url.match(YT_REGEX);
    if (!isYt) {
      return NextResponse.json(
        {
          message: "Invalid youtube url format",
        },
        {
          status: 411,
        }
      );
    }
    const extractedId = data.url.split("?v=")[1];
    const res = await youtubesearchapi.GetVideoDetails(extractedId);
    const title = res.title;
    const thumbnails = res.thumbnail.thumbnails;
    thumbnails.sort((a: { width: number }, b: { width: number }) =>
      a.width < b.width ? -1 : 1
    );

    const stream = await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        type: "Youtube",
        extractedId,
        smallImg:
          (thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url) ??
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s",
        bigImg:
          thumbnails[thumbnails.length - 1].url ??
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s",
        title: title ?? "Can't find image",
      },
    });

    return NextResponse.json({
      ...stream,
      upvotes: 0,
      isUpVoted: false,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 411,
      }
    );
  }
}

export async function GET(req: NextRequest) {
  const creatorId = req.nextUrl.searchParams.get("creatorId");

  const session = await getServerSession();

  const user = await prismaClient.user.findFirst({
    where: {
      email: session?.user?.email || "",
    },
  });

  if (!creatorId) {
    return NextResponse.json({
      message: "Error while fetching stream",
    });
  }

  const streams = await prismaClient.stream.findMany({
    where: {
      userId: creatorId ?? "",
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
      upvotes: {
        where: {
          userId: user?.id,
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
