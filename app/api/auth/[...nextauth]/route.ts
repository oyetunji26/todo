import NextAuth, { AuthOptions } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Auth options for NextAuth

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
