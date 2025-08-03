import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";

// Type definitions
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  category: {
    name: string;
    slug: string;
  };
  tags: string[];
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  readingTime: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
    canonicalUrl?: string;
  };
}

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

// Fake API call - replace with your actual API
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Mock data - replace with real API call
  const mockPost: BlogPost = {
    id: "1",
    title: "Hướng dẫn tối ưu SEO cho Next.js App Router",
    slug: slug,
    excerpt:
      "Tìm hiểu cách tối ưu SEO hiệu quả cho ứng dụng Next.js với App Router thông qua các kỹ thuật metadata, structured data và server components.",
    content: `<h1 style="text-align: left;"><strong>Hi there,</strong></h1><pre><code>async function getRelatedPosts(
  categorySlug: string,
  currentSlug: string
): Promise&lt;BlogPost[]&gt; {</code></pre><p><span class="node-imageComponent"><span class="image-component"><img src="https://res.cloudinary.com/dfrk1gorf/image/upload/v1743057244/img_quiz/vd85ok1jqczx6wgpvnzd.jpg" alt="" title="" width="500" height="500" style="max-width: 500px" data-keep-ratio="true" class=""></span></span>This is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:</p><ol><li><p style="text-align: left;">That’s a bullet list with one …</p></li><li><p style="text-align: left;">… or two list items.</p></li></ol><p><span class="node-imageComponent"><span class="image-component"><img src="https://res.cloudinary.com/dfrk1gorf/image/upload/v1743240083/img_quiz/ccj8jg5xwb7aqwttmrpl.jpg" alt="" title="" width="500" height="500" style="max-width: 500px" data-keep-ratio="true" class=""></span></span>Isn’t that great? <strong>And all of that is editable. But wait, there’s more. Let’s try a code block:</strong></p><pre><code class="language-css">body {
  display: none;
}</code></pre><p style="text-align: left;">I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.</p><img src="https://res.cloudinary.com/dfrk1gorf/image/upload/v1743240083/img_quiz/ccj8jg5xwb7aqwttmrpl.jpg" alt="" style="width: 100%; height: auto;"><blockquote><p>Wow, that’s amazing. Good work, boy! 👏 <br>— Mom</p></blockquote><p style="text-align: left;"></p>`,
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z",
    author: {
      name: "Nguyễn Văn A",
      avatar: "/images/author-avatar.jpg",
      bio: "Frontend Developer với 5 năm kinh nghiệm về React và Next.js",
    },
    category: {
      name: "Web Development",
      slug: "web-development",
    },
    tags: ["Next.js", "SEO", "React", "App Router"],
    featuredImage: {
      url: "/images/nextjs-seo-guide.jpg",
      alt: "Hướng dẫn tối ưu SEO cho Next.js",
      width: 1200,
      height: 630,
    },
    readingTime: 8,
    seo: {
      metaTitle: "Hướng dẫn tối ưu SEO cho Next.js App Router - Chi tiết A-Z",
      metaDescription:
        "Tìm hiểu cách tối ưu SEO hiệu quả cho ứng dụng Next.js với App Router. Hướng dẫn chi tiết về metadata, structured data và performance.",
      focusKeyword: "Next.js SEO",
      canonicalUrl: `https://yourblog.com/blog/${slug}`,
    },
  };

  return mockPost;
}

async function getRelatedPosts(
  categorySlug: string,
  currentSlug: string
): Promise<BlogPost[]> {
  // Mock related posts
  return [
    {
      id: "2",
      title: "React Server Components: Tương lai của React",
      slug: "react-server-components",
      excerpt:
        "Khám phá React Server Components và cách chúng thay đổi cách chúng ta xây dựng ứng dụng React.",
      content:
        "sfdshnbfiudshnbfidushfbdsiulfhbdsijulfghbdskjfhbndskjghbnvksjdfghbnfruih",
      publishedAt: "2024-01-10T09:00:00Z",
      author: { name: "Trần Thị B" },
      category: { name: "React", slug: "react" },
      tags: ["React", "Server Components"],
      readingTime: 6,
      seo: {},
    },
  ];
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  // post = { content: localStorage.getItem("data") || "", ...post };

  if (!post) {
    return {
      title: "Bài viết không tồn tại",
      description: "Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.",
    };
  }

  const { seo, title, excerpt, author, publishedAt, featuredImage } = post;

  return {
    title: seo.metaTitle || title,
    description: seo.metaDescription || excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: author.name }],
    creator: author.name,
    publisher: "Your Blog Name",

    // Open Graph
    openGraph: {
      title: seo.metaTitle || title,
      description: seo.metaDescription || excerpt,
      url: seo.canonicalUrl || `https://yourblog.com/blog/${params.slug}`,
      siteName: "Your Blog Name",
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: post.updatedAt || publishedAt,
      authors: [author.name],
      images: featuredImage
        ? [
            {
              url: featuredImage.url,
              width: featuredImage.width,
              height: featuredImage.height,
              alt: featuredImage.alt,
            },
          ]
        : [],
    },

    // Twitter Card
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || title,
      description: seo.metaDescription || excerpt,
      creator: "@yourtwitterhandle",
      images: featuredImage ? [featuredImage.url] : [],
    },

    // Additional SEO
    alternates: {
      canonical: seo.canonicalUrl || `https://yourblog.com/blog/${params.slug}`,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// JSON-LD Structured Data Component
function StructuredData({ post }: { post: BlogPost }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.url,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.bio,
    },
    publisher: {
      "@type": "Organization",
      name: "Your Blog Name",
      logo: {
        "@type": "ImageObject",
        url: "https://yourblog.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://yourblog.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category.name,
    wordCount: post.content.split(" ").length,
    timeRequired: `PT${post.readingTime}M`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// Breadcrumb Component
function Breadcrumb({ post }: { post: BlogPost }) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: "https://yourblog.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://yourblog.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.category.name,
        item: `https://yourblog.com/category/${post.category.slug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: post.title,
        item: `https://yourblog.com/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <nav className="breadcrumb mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-gray-900">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-gray-900">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/${post.category.slug}`}
          className="hover:text-gray-900"
        >
          {post.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{post.title}</span>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}

// Related Posts Component
function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-8">
      <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.id} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm mb-3">{post.excerpt}</p>
            <div className="flex items-center text-xs text-gray-500">
              <span>{post.author.name}</span>
              <span className="mx-2">•</span>
              <time>
                {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
              </time>
              <span className="mx-2">•</span>
              <span>{post.readingTime} phút đọc</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// Main Blog Detail Component
export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category.slug, post.slug);
  {
    // console.log(post.content);
  }
  return (
    <>
      <StructuredData post={post} />

      <article className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb post={post} />

        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link
              href={`/category/${post.category.slug}`}
              className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200"
            >
              {post.category.name}
            </Link>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center text-gray-600 text-sm mb-6">
            <div className="flex items-center">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full mr-3"
                />
              )}
              <span className="font-medium">{post.author.name}</span>
            </div>
            <span className="mx-3">•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="mx-3">•</span>
            <span>{post.readingTime} phút đọc</span>
          </div>

          {post.featuredImage && (
            <div className="mb-8">
              <Image
                src={post.featuredImage.url}
                alt={post.featuredImage.alt}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Content */}

        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
            >
              #{tag}
            </Link>
          ))}
        </div>

        {/* Author Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Về tác giả</h3>
          <div className="flex items-start">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={64}
                height={64}
                className="rounded-full mr-4"
              />
            )}
            <div>
              <h4 className="font-medium text-lg">{post.author.name}</h4>
              {post.author.bio && (
                <p className="text-gray-600 mt-1">{post.author.bio}</p>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <div className="max-w-4xl mx-auto px-4">
        <Suspense fallback={<div>Đang tải bài viết liên quan...</div>}>
          <RelatedPosts posts={relatedPosts} />
        </Suspense>
      </div>
    </>
  );
}
