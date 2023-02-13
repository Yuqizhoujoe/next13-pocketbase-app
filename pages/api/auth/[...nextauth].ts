import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authWithPassword } from "../../../server/pb/query/user";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "pocketbase",
      id: "pocketbase",
      credentials: {},
      async authorize(credentials, req) {
        console.log(`credentials ${JSON.stringify(credentials)}`);

        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        const user = await authWithPassword({ email, password });

        // if everything is fine
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    async jwt(params) {
      const { user, token, account, isNewUser } = params;
      // update token
      // @ts-ignore
      if (user) {
        // @ts-ignore
        token.name = user.record.username;
        // @ts-ignore
        token.email = user.record.email;
      }
      // return final_token
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  jwt: {
    secret: process.env.SECRET,
    maxAge: 60 * 60 * 24,
  },
};

export default NextAuth(authOptions);
