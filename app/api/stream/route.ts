import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateStream = z.object({
  creatorId: z.string(),
  url: z.string(),
});

const ytRegex = new RegExp("https?://(www.)?youtube.com/watch?v=[w-]+");

export async function GET(req: NextRequest) {
  try {
    const data = CreateStream.parse(await req.json());
    const isYt = ytRegex.test(data.url);

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

    await prismaClient.stream.create({
      data: {
        userId: data.creatorId,
        url: data.url,
        type: "Youtube",
        extractedId,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while adding stream",
      },
      {
        status: 411,
      }
    );
  }
}
