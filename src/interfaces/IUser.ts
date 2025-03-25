import { DefaultUser } from "next-auth";

export interface IUser extends DefaultUser {
  id: string;
  name: string;
  email: string;
  birthdate?: string;
  cpf?: string;
  nationalId?: string;
  contact?: string;
  roleName?: string;
}
