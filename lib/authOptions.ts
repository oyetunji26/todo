import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@/utils/database";
import User from "@/models/user";

export const authOptions : AuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile } ) {
  
        await connectToDb();
  
        console.log('USER:', user);
        console.log('ACCOUNT:', account);
        console.log('PROFILE:', profile);
  
        const existingUser = await User.findOne({ email: user.email });
  
        if (!existingUser) {
          await User.create({
            googleId: user?.id,
            name: user.name,
            email: user.email,
            image: user.image,
          });
  
  
        }
  
        return true;
      },
  
      // signIn({ user, account, profile }) {
  
  
      //   await connectToDb();
  
      //   const googleId = profile?.sub;
      //   if (!googleId || !user.email) return false;
  
      //   const existingUser = await User.findOne({ email: user.email });
  
      //   if (!existingUser) {
      //     await User.create({
      //       googleId,
      //       name: user.name,
      //       email: user.email,
      //       image: user.image,
      //     });
      //   }
  
      //   return true;
      // },
  
      async session({ session } ) {
        await connectToDb();
  
        const userInDb = await User.findOne({ email: session.user?.email });
  
        if (userInDb) {
          // session?.user?.id = userInDb._id.toString();
          // session.user.googleId = userInDb.googleId;
          // session.user.name = userInDb.name;
          // session?.user?.image = userInDb.image;
  
          console.log(session)
        }
  
        if (session) {
          
        }
  
        return session;
      },
  
      async redirect({ url, baseUrl } ) {
        return baseUrl; // redirect to home ("/") after login
      },
    },
  
    secret: process.env.NEXTAUTH_SECRET,
  };
  