import { Role } from "./role";

export interface BaseUser {
  username: string;
  avatarUrl: string;
  id: number;
}

export interface User extends BaseUser {
  createdAt: string;
  email: string;
  roles: Role[];
}
