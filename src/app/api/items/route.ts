import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/items - List all items
export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 }
    );
  }
}

// POST /api/items - Create a new item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const item = await prisma.item.create({
      data: {
        name,
        description: description || null,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Failed to create item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}
