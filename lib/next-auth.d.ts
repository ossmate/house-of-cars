import NextAuth from "next-auth/next";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    userId: string;
    token: string;
    iat: number;
    user: {
      name: string;
      email: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    token: string;
    iat: number;
    user: {
      name: string;
      email: string;
    };
  }
}

import { Session as NextAuthSession } from "next-auth";

interface CustomSession extends NextAuthSession {
  userId: string;
  token: string;
  iat: number;
  user: {
    name: string;
    email: string;
  };
}

declare module "next-auth" {
  interface Session extends CustomSession {}
}
