import { DefaultSession } from "next-auth";
import { IUser } from "./IUser";

export interface ISession extends DefaultSession {
  user: IUser;
  acessToken: string;
  refreshToken: string;
  tokenExpiry: number;
}
