import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Not Authorized" });
  }
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

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Not Authorized" });
  }
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ status: 400, message: "ID is required" });
    }

    const task = await db.select().from(tasks).where(eq(tasks.id, id));
    if (task.length === 0) {
      return NextResponse.json({ status: 404, message: "Task not found" });
    }

    return NextResponse.json({ status: 200, data: task });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "Error in fetching task",
    });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Not Authorized" });
  }
  try {
    const { id } = params;
    const data = await req.json();
    const { title, description } = data;

    if (!id || !title || !description) {
      return NextResponse.json({
        status: 400,
        message: "ID, title, and description are required",
      });
    }

    await db.update(tasks).set({ title, description }).where(eq(tasks.id, id));
    return NextResponse.json({
      status: 200,
      message: "Task updated successfully",
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "Error in updating task",
    });
  }
};
