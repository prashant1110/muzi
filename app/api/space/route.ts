import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const CreateSpace = z.object({
  name: z.string(),
  creatorId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = CreateSpace.parse(await req.json());
   

    const space = await prismaClient.space.create({
      data: {
        name: data.name,
        creatorId: data.creatorId,
      },
    });
    return NextResponse.json({
      ...space,
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
  try {
    const spaceId = req.nextUrl.searchParams.get("spaceId");

    if (!spaceId) {
      return NextResponse.json({
        message: "Error while fetching stream",
      });
    }

    const space = await prismaClient.space.findFirst({
      where: {
        id: spaceId,
      },
    });

    return NextResponse.json({
      space
    })
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
