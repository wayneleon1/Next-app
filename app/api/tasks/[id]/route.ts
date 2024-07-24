import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ status: 400, message: "ID is required" });
    }

    await db.delete(tasks).where(eq(tasks.id, id));
    return NextResponse.json({
      status: 200,
      message: "Task deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({ status: 400, message: "Error in deleting" });
  }
};
