import { IUser } from "@/interfaces/IUser";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user:
      | (IUser & {
          accessToken: string;
          refreshToken: string;
          tokenExpiry: number;
        })
      | null;
    error?: string;
  }

  interface User extends IUser {
    accessToken: string;
    refreshToken: string;
    tokenExpiry: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser;
    accessToken: string;
    refreshToken: string;
    tokenExpiry: number;
    error?: string;
  }
}

declare module "*.webm" {
  const src: string;
  export default src;
}
