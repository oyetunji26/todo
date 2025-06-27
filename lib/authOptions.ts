// lib/authOptions.ts
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDb } from '@/utils/database';
import User from '@/models/User';

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectToDb();

        const { email, password } = credentials ?? {};
        if (!email || !password) return null;

        const user = await User.findOne({ email });
        if (!user || !user.password) return null;

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return null;

        return {
          id: user?._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDb();

      // Only run for Google logins
      if (account?.provider === 'google') {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            googleId: profile?.sub,
            name: user.name,
            email: user.email,
            image: user.image,
            teams: [],
          });
        }
      }

      return true;
    },

    async session({ session }) {
      await connectToDb();

      const userInDb = await User.findOne({ email: session.user?.email });
      if (userInDb) {
        session.user.id = userInDb._id.toString();
        session.user.googleId = userInDb.googleId;
        session.user.name = userInDb.name;
        session.user.image = userInDb.image;
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
