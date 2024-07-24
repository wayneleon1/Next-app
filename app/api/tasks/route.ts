import { NextResponse, NextRequest } from "next/server";
import { db } from "@/lib/db";
import { tasks } from "@/lib/schema";

export const GET = async (req: NextRequest) => {
  try {
    const getTasks = await db.select().from(tasks);
    return NextResponse.json({ status: 200, data: getTasks });
  } catch (err) {
    return NextResponse.json({ status: 400, message: "Error in fetching" });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const { title, description } = data;
    const newTasks = {
      title: title,
      description: description,
    };
    const postTasks = await db.insert(tasks).values(newTasks);
    return NextResponse.json({ status: 200, message: "Successfully Added" });
  } catch (err) {
    return NextResponse.json({ status: 400, message: "Error in fetching" });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    await db.delete(tasks);
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
