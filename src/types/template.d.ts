import { BaseUser } from "./user";

export interface Pagination {
  page: number;
  total: number;
  totalPages: number;
}

export interface PaginationTemplate extends Pagination {
  data: Template[];
}
export interface Template {
  id: number;
  name: string;
  description: string;
  image: string;
  user: BaseUser;
}
