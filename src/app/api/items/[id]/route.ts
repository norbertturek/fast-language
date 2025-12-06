import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

// GET /api/items/[id] - Get single item
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const item = await prisma.item.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to fetch item:", error);
    return NextResponse.json(
      { error: "Failed to fetch item" },
      { status: 500 }
    );
  }
}

// PUT /api/items/[id] - Update item
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description } = body;

    const item = await prisma.item.update({
      where: { id: parseInt(id, 10) },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to update item:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

// DELETE /api/items/[id] - Delete item
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await prisma.item.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: "Item deleted" });
  } catch (error) {
    console.error("Failed to delete item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
