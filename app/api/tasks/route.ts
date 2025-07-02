import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectToDb } from "@/utils/database";
import Task from "@/models/Task";

// 🔐 AUTH CHECK HELPER
async function requireAuth(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return { isAuthenticated: false, response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
    }
    return { isAuthenticated: true, session };
}

// ✅ CREATE TASK
export async function POST(req: NextRequest) {
    const { isAuthenticated, session, response } = await requireAuth(req);
    if (!isAuthenticated) return response;

    try {
        await connectToDb();

        const body = await req.json();
        const { title, description, progress, project, dueDate, completed } = body;

        if (!title) {
            return NextResponse.json({ message: "Title is required." }, { status: 400 });
        }

        const newTask = await Task.create({
            title,
            description,
            progress: progress || 0,
            project,
            dueDate,
            completed: completed || false,
            owner: session?.user?.id,
        });

        return NextResponse.json(newTask, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Failed to create task.", error: error.message },
            { status: 500 }
        );
    }
}

// ✅ GET TASKS
export async function GET(req: NextRequest) {
    const { isAuthenticated, session, response } = await requireAuth(req);
    if (!isAuthenticated) return response;

    try {
        await connectToDb();

        const { searchParams } = new URL(req.url);
        const project = searchParams.get("project");
        const completed = searchParams.get("completed");

        const filter: any = {};
        if (project) filter.project = project;
        if (completed !== null) filter.completed = completed === "true";

        const tasks = await Task.find(filter)
            .populate("project")
            .sort({ createdAt: -1 });

        return NextResponse.json(tasks, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: "Failed to fetch tasks.", error: error.message },
            { status: 500 }
        );
    }
}
