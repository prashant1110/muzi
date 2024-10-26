import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const user = z.object({
  spaceId: z.string(),
  userId: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const data = user.parse(await req.json());

    const space = await prismaClient.space.findFirst({
      where: {
        id: data.spaceId,
      },
    });

    if (!space) {
      return NextResponse.json({
        message: "No Group exists",
      });
    }

    const userExists = await prismaClient.space.findFirst({
      where: {
        id: data.spaceId,
        users: {
          some: {
            id: data.userId,
          },
        },
      },
    });

    if (userExists) {
      return NextResponse.json({
        message: "User already exists in group",
      });
    }

    const res = await prismaClient.space.update({
      where: { id: data.spaceId },
      data: {
        users: {
          connect: {
            id: data.userId,
          },
        },
      },
    });

    return NextResponse.json({
      message: "user added to group",
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
