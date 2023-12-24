import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import { connectToDB } from "../../../lib/utils";
import { User } from "../../../lib/models";

export const options = {
  providers: [
    GoogleProvider({
      profile(profile) {
        // console.log(profile);
        return {
          ...profile,
          role: profile.role ?? "SuperAdmin",
          id: profile.sub,
          image: profile.picture,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      profile(profile) {
        // console.log(profile);
        return {
          ...profile,
          role: profile.role ?? "SuperAdmin",
          image: null,
        };
      },
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),

    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Username:",
    //       type: "text",
    //       placeholder: "your-cool-username",
    //     },
    //     password: {
    //       label: "Password:",
    //       type: "password",
    //       placeholder: "your-awesome-password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     // This is where you need to retrieve user data
    //     // to verify with credentials
    //     // Docs: https://next-auth.js.org/configuration/providers/credentials
    //     const user = {
    //       id: "42",
    //       name: "Dave",
    //       password: "nextauth",
    //       role: "manager",
    //     };

    //     if (
    //       credentials?.username === user.name &&
    //       credentials?.password === user.password
    //     ) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],

  // pages: {
  //   signIn: "/client",
  // },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "facebook") {
        const { name, email, id, image, role } = user;
        try {
          await connectToDB();
          const userExists = await User.findOne({ id: user.id });
          // console.log(userExists);

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                id,
                image,
                role,
              }),
            });

            if (res.ok) {
              const updatedUserFromDB = await User.findOne({ id: user.id });
              user._id = updatedUserFromDB._id;
              return user;
            }
          } else {
            user._id = userExists._id;
            return user;
          }
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },

    async jwt({ token, user }) {
      if (user && user._id) {
        token.role = user.role;
        token.id = user.id;
        token._id = user._id.toString();
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user._id = token._id;
      }
      // console.log(session);
      return session;
    },
  },
};
