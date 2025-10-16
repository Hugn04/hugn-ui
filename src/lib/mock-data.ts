import type { Role } from "@/types/role";

export const mockRoles: Role[] = [
  {
    id: 1,
    name: "Admin",
    description: "admin",
    permissions: [
      {
        id: 1,
        name: "admin",
        description: "Tạo người dùng",
      },
      {
        id: 2,
        name: "studio",
        description: "Tạo người dùng",
      },
      {
        id: 3,
        name: "user",
        description: "Tạo người dùng",
      },
    ],
  },
  {
    id: 2,
    name: "Studio",
    description: "Có thế đăng template",
    permissions: [
      {
        id: 2,
        name: "studio",
        description: "Tạo người dùng",
      },
      {
        id: 3,
        name: "user",
        description: "Tạo người dùng",
      },
    ],
  },
  {
    id: 3,
    name: "User",
    description: "Có thế xem template",
    permissions: [
      {
        id: 3,
        name: "user",
        description: "Tạo người dùng",
      },
    ],
  },
];
