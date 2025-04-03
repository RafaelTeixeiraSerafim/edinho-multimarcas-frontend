<<<<<<< HEAD
import { ISession } from "@/interfaces/ISession"
import { IUser } from "@/interfaces/IUser"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  export interface User extends IUser {
  }

  export interface Session extends ISession {
    user: User
    token: string,
    refreshToken: string
    tokenExpiry: number
    permissions: string[]
=======
import { ISession } from "@/interfaces/ISession";
import { IUser } from "@/interfaces/IUser";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: IUser & {
      accessToken: string;
      refreshToken: string;
      tokenExpiry: number;
    };
    error?: string;
  }

  interface User extends IUser {
    accessToken: string;
    refreshToken: string;
    tokenExpiry: number;
>>>>>>> rescue-branch
  }
}

declare module "next-auth/jwt" {
  interface JWT {
<<<<<<< HEAD
    user: User
  }
=======
    user: IUser;
    accessToken: string;
    refreshToken: string;
    tokenExpiry: number;
    error?: string;
  }
}

declare module '*.webm' {
  const src: string;
  export default src;
>>>>>>> rescue-branch
}