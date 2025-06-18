import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@/utils/database";
import User from "@/models/user";
import { authOptions } from "@/lib/authOptions";

// Auth options for NextAuth

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
