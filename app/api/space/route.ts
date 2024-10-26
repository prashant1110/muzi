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
    console.log(prismaClient)
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
