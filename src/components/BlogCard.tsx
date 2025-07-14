import { blogPost } from "@/types/blogPost";
// import Image from "next/image";
import Link from "next/link";

export default function BlogCard({
  post,
  featured = false,
  delay = 0,
}: {
  post: blogPost;
  featured: boolean;
  delay: number;
}) {
  return (
    <article
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden animate-[fadeInUp_0.8s_ease-out_${delay}ms_both] ${
        featured ? "lg:flex lg:flex-row" : "flex flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "lg:w-1/2" : "w-full h-48"
        }`}
      >
        {/* <Image
          src={post.image}
          alt={post.title}
          width={featured ? 400 : 300}
          height={featured ? 300 : 200}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        /> */}

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
            {post.category}
          </span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:from-black/40 transition-all duration-300"></div>
      </div>

      <div
        className={`p-6 flex flex-col justify-between ${
          featured ? "lg:w-1/2" : "flex-1"
        }`}
      >
        <div>
          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
            <time dateTime={post.publishDate}>
              {new Date(post.publishDate).toLocaleDateString("vi-VN")}
            </time>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {post.views}
            </span>
          </div>

          <Link href={`/blog/${post.id}`}>
            <h3
              className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 ${
                featured ? "text-2xl" : "text-xl"
              }`}
            >
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <Image
              src={post.authorImage}
              alt={post.author}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            /> */}
            <span className="text-sm text-gray-700 font-medium">
              {post.author}
            </span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {post.likes}
            </button>

            <Link
              href={`/blog/${post.id}`}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 group"
            >
              Đọc thêm
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
        </div>
      </div>
    </article>
  );
}
