import { Role } from "./Role";

export class User {
  id: number | undefined;
  username: string | undefined;
  password: string | undefined;
  address: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  dateOfBirth: string | undefined;
  gender: string | undefined;
  roles: Role[] | undefined;
}
