import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";

export const GET = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Not Authorized" });
  }

  try {
    const getTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, session.user.id));
    return NextResponse.json({ status: 200, data: getTasks });
  } catch (err) {
    return NextResponse.json({ status: 400, message: "Error in fetching" });
  }
};

export const POST = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Not Authorized" });
  }
  try {
    const userId = session?.user.id;
    const data = await req.json();
    const { title, description } = data;
    const newTasks = {
      title: title,
      description: description,
      userId: userId,
    };
    const postTasks = await db.insert(tasks).values(newTasks);
    return NextResponse.json({
      status: 200,
      message: "Task successfully Added",
    });
  } catch (err) {
    return NextResponse.json({ status: 400, message: "Error in fetching" });
  }
};

export const DELETE = async (req: NextRequest) => {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ status: 401, message: "Not Authorized" });
  }
  try {
    await db.delete(tasks).where(eq(tasks.userId, session.user.id));
    return NextResponse.json({
      status: 200,
      message: "All tasks deleted successfully",
    });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      message: "Error in deleting all tasks",
    });
  }
};
