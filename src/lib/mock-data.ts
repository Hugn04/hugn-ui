import type { BlogPost, Category } from "@/types/blogPost";
import type { Role } from "@/types/role";

export const mockRoles: Role[] = [
  {
    id: 1,
    name: "Admin",
    description: "admin",
    permissions: [
      {
        id: 1,
        name: "create-user",
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
        name: "create-user",
        description: "Tạo người dùng",
      },
    ],
  },
];

export const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "Hướng dẫn Next.js 14 App Router",
    slug: "huong-dan-nextjs-14-app-router",
    content: "Nội dung chi tiết về Next.js 14...",
    excerpt:
      "Tìm hiểu về các tính năng mới trong Next.js 14 và cách sử dụng App Router hiệu quả.",
    status: "published",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript"],
    author: "Admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    publishedAt: "2024-01-15T10:00:00Z",
    featuredImage: "/nextjs-tutorial.png",
    readTime: 8,
    views: 1234,
  },
  {
    id: "2",
    title: "React Server Components Deep Dive",
    slug: "react-server-components-deep-dive",
    content: "Khám phá React Server Components...",
    excerpt:
      "Tìm hiểu sâu về React Server Components và cách chúng thay đổi cách chúng ta xây dựng ứng dụng React.",
    status: "draft",
    category: "React",
    tags: ["React", "Server Components", "Performance"],
    author: "Admin",
    createdAt: "2024-01-14T09:30:00Z",
    updatedAt: "2024-01-14T09:30:00Z",
    readTime: 12,
    views: 0,
  },
  {
    id: "3",
    title: "TypeScript Best Practices 2024",
    slug: "typescript-best-practices-2024",
    content: "Các thực hành tốt nhất với TypeScript...",
    excerpt:
      "Cập nhật các thực hành tốt nhất khi làm việc với TypeScript trong năm 2024.",
    status: "published",
    category: "TypeScript",
    tags: ["TypeScript", "Best Practices", "Development"],
    author: "Admin",
    createdAt: "2024-01-13T14:20:00Z",
    updatedAt: "2024-01-13T14:20:00Z",
    publishedAt: "2024-01-13T14:20:00Z",
    featuredImage: "/typescript-code.png",
    readTime: 6,
    views: 856,
  },
  {
    id: "4",
    title: "Tailwind CSS Advanced Techniques",
    slug: "tailwind-css-advanced-techniques",
    content: "Kỹ thuật nâng cao với Tailwind CSS...",
    excerpt:
      "Khám phá các kỹ thuật nâng cao để tối ưu hóa workflow với Tailwind CSS.",
    status: "archived",
    category: "CSS",
    tags: ["Tailwind CSS", "CSS", "Design"],
    author: "Admin",
    createdAt: "2024-01-10T11:15:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
    readTime: 10,
    views: 432,
  },
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description: "Các bài viết về phát triển web",
    postCount: 8,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "React",
    slug: "react",
    description: "Thư viện React và ecosystem",
    postCount: 5,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "TypeScript",
    slug: "typescript",
    description: "Ngôn ngữ TypeScript",
    postCount: 3,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "CSS",
    slug: "css",
    description: "Styling và CSS frameworks",
    postCount: 4,
    createdAt: "2024-01-01T00:00:00Z",
  },
];
