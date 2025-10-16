import { Role } from "./role";

export interface User {
  avatarUrl: string;
  createdAt: string;
  email: string;
  id: number;
  roles: Role[];
  username: string;
}
