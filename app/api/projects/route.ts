import { NextResponse } from "next/server";
import  { connectToDb } from "@/utils/database"; // your custom DB connection util
import Project from "@/models/project";

// Only POST is handled here
export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectToDb();

    // Parse the request body
    const body = await req.json();
    const { title, description, owner, team } = body;

    // Basic validation
    if (!title || !owner) {
      return NextResponse.json(
        { message: "Title and owner are required." },
        { status: 400 }
      );
    }

    // Create new project
    const project = await Project.create({
      title,
      description,
      owner,
      team: team || null, // make sure it's null if not provided
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error("[CREATE_PROJECT_ERROR]", error);
    return NextResponse.json(
      { message: "Server error creating project." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
