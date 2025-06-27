import { connectToDb } from '@/utils/database';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDb();

    // Check if a test user exists
    let user = await User.findOne({ email: 'test@example.com' });

    // Create one if not
    if (!user) {
      user = await User.create({
        googleId: 'tryinghard',
        email: 'test@example.com',
        name: 'testuser',
        image: 'plaintext123', 
        team: []
      });
    }

    const users = await User.find();

    return NextResponse.json({
      message: 'Connected and fetched users',
      users,
    });
  } catch (error) {
    console.error('❌ Error in /api/test:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
