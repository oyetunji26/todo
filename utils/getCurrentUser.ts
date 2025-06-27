// lib/getCurrentUser.ts

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import User from "@/models/User"; // Mongoose User model
import { connectToDb } from "@/utils/database"; // your MongoDB connection function

export async function getCurrentUser() {
    await connectToDb();

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    // Find the user in your database
    const user = await User.findOne({ email: session.user.email });

    if (!user) return null;

    console.log(user);

    return user;
}
