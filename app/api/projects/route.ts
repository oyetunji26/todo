import { NextResponse } from 'next/server';
import { connectToDb } from '@/utils/database';
import Project from '@/models/Project';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export async function POST(req: Request) {
  try {
    await connectToDb();
    
    const { title, description, owner, team } = await req.json();

    if (!title || !owner) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const existingProjectForUser = await Project.findOne({ owner, title });
    if (existingProjectForUser) {
      return NextResponse.json({ message: 'Project already exists for user' }, { status: 409 });
    }

    const newProject = await Project.create({
      title,
      description,
      owner,
      team: team || null
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('[PROJECT_CREATE]', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDb();

    const userProjects = await Project.find({ owner: userId });

    return NextResponse.json(userProjects, { status: 200 });
  } catch (error) {
    console.error("[PROJECTS_FETCH]", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}