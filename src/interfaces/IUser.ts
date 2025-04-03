import { DefaultUser } from "next-auth";

export interface IUser extends DefaultUser {
  id: string;
  name: string;
  email: string;
  birthdate?: string;
  nationalId?: string;
  contact?: string;
}
