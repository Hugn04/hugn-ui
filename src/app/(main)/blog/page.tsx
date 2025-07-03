import BlogCard from "@/components/BlogCard";
import BlogCategories from "@/components/BlogCategories";
import BlogHero from "@/components/BlogHero";
import { blogPost } from "@/types/blogPost";
import { Categories } from "@/types/categories";
import Link from "next/link";

// Sample blog data - trong thực tế sẽ fetch từ API hoặc CMS
const blogPosts: blogPost[] = [
  {
    id: 1,
    title: "10 Xu hướng thiết kế Web năm 2025",
    excerpt:
      "Khám phá những xu hướng thiết kế web mới nhất sẽ thống trị năm 2025, từ AI-driven design đến immersive experiences.",
    content: "Năm 2025 đánh dấu một bước ngoặt lớn trong ngành thiết kế web...",
    author: "Minh Hoàng",
    authorImage: "/assets/images/author1.jpg",
    publishDate: "2025-01-15",
    readTime: "8 phút đọc",
    category: "Thiết kế",
    tags: ["Web Design", "Trends", "2025", "UI/UX"],
    image: "/assets/images/blog1.jpg",
    featured: true,
    views: 1250,
    likes: 89,
  },
  {
    id: 2,
    title: "Hướng dẫn tối ưu SEO cho trang web Next.js",
    excerpt:
      "Những kỹ thuật SEO hiệu quả nhất cho ứng dụng Next.js, giúp website của bạn rank cao trên Google.",
    content: "SEO là yếu tố quan trọng quyết định thành công của website...",
    author: "Thu Hà",
    authorImage: "/assets/images/author2.jpg",
    publishDate: "2025-01-12",
    readTime: "12 phút đọc",
    category: "Development",
    tags: ["SEO", "Next.js", "React", "Performance"],
    image: "/assets/images/blog2.jpg",
    featured: true,
    views: 890,
    likes: 67,
  },
  {
    id: 3,
    title: "Cách xây dựng Design System hiệu quả",
    excerpt:
      "Kinh nghiệm thực tế trong việc xây dựng và maintain một design system scalable cho team lớn.",
    content: "Design System không chỉ là một bộ component library...",
    author: "Đức Anh",
    authorImage: "/assets/images/author3.jpg",
    publishDate: "2025-01-10",
    readTime: "15 phút đọc",
    category: "Design System",
    tags: ["Design System", "Figma", "Component", "Team"],
    image: "/assets/images/blog3.jpg",
    featured: true,
    views: 2100,
    likes: 156,
  },
  {
    id: 4,
    title: "Tailwind CSS vs Styled Components: So sánh chi tiết",
    excerpt:
      "Phân tích ưu nhược điểm của hai phương pháp styling phổ biến nhất hiện nay trong React ecosystem.",
    content: "Việc lựa chọn giữa Tailwind CSS và Styled Components...",
    author: "Lan Anh",
    authorImage: "/assets/images/author4.jpg",
    publishDate: "2025-01-08",
    readTime: "10 phút đọc",
    category: "CSS",
    tags: ["Tailwind", "Styled Components", "CSS", "React"],
    image: "/assets/images/blog4.jpg",
    featured: false,
    views: 756,
    likes: 43,
  },
  {
    id: 5,
    title: "Microinteractions: Bí quyết tạo UX đáng nhớ",
    excerpt:
      "Làm thế nào để sử dụng microinteractions một cách hiệu quả để nâng cao trải nghiệm người dùng.",
    content: "Microinteractions là những chi tiết nhỏ nhưng có tác động lớn...",
    author: "Quang Huy",
    authorImage: "/assets/images/author5.jpg",
    publishDate: "2025-01-05",
    readTime: "7 phút đọc",
    category: "UX Design",
    tags: ["Microinteractions", "UX", "Animation", "User Experience"],
    image: "/assets/images/blog5.jpg",
    featured: false,
    views: 1890,
    likes: 134,
  },
  {
    id: 6,
    title: "Performance Optimization cho React Apps",
    excerpt:
      "Các kỹ thuật optimization cần thiết để tăng tốc độ loading và hiệu suất của ứng dụng React.",
    content: "Performance là yếu tố quyết định thành công của web app...",
    author: "Minh Hoàng",
    authorImage: "/assets/images/author1.jpg",
    publishDate: "2025-01-03",
    readTime: "14 phút đọc",
    category: "Performance",
    tags: ["React", "Performance", "Optimization", "Web Vitals"],
    image: "/assets/images/blog6.jpg",
    featured: false,
    views: 1340,
    likes: 98,
  },
];

const categories: Categories[] = [
  { name: "Tất cả", count: blogPosts.length, active: true },
  { name: "Thiết kế", count: 12, active: false },
  { name: "Development", count: 8, active: false },
  { name: "UX Design", count: 6, active: false },
  { name: "Performance", count: 4, active: false },
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Blog Hero Section */}
      <BlogHero />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Filter */}
        <BlogCategories categories={categories} />

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Bài viết nổi bật
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-blue-500 to-transparent ml-6 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  featured={true}
                  delay={index * 100}
                />
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Bài viết mới nhất
            </h2>
            <Link
              href="/blog/archive"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 group"
            >
              Xem tất cả
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                featured={false}
                delay={index * 100}
              />
            ))}
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Đăng ký nhận tin tức mới nhất
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Nhận những bài viết, tips và xu hướng mới nhất về thiết kế và phát
              triển web
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-6 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/25"
              />
              <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                Đăng ký
              </button>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
        </section>
      </div>
    </div>
  );
}
