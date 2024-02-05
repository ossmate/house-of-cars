import { createAPIPath } from "@/lib/utils";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any, _req) {
        if (!credentials?.username || !credentials?.password) return null;

        const response = await fetch(`${createAPIPath()}/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: credentials?.username,
            password: credentials?.password,
          }),
        });

        if (response.status == 401) {
          return null;
        }

        const user = await response.json();

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      session.token = token.token;
      session.userId = token.userId;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
