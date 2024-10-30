import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    
    if (!creatorId) {
      return NextResponse.json({
        message: "Un-authenticated",
      });
    }

    const space = await prismaClient.space.findMany({
      where: {
        creatorId: creatorId,
      },
    });

    return NextResponse.json({
      space,
    });
  } catch (error) {
    return NextResponse.json({
        error,
      });
  }
}
