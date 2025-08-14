export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: "draft" | "published" | "archived";
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  featuredImage?: string;
  readTime: number;
  views: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  createdAt: string;
}
