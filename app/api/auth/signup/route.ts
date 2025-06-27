// app/api/auth/signup/route.ts

import { NextResponse } from 'next/server';
// import { dbConnect } from '@/lib/dbConnect';
import { connectToDb } from '@/utils/database';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectToDb();
    const body = await req.json();
    const { name, email, password } = body;

    console.log('[SIGNUP_REQUEST]', body);

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    console.log('[USER_CREATED]', newUser.email);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('[SIGNUP_ERROR]', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}