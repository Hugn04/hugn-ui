"use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  bookmarked: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

const BlogApp: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [newPostContent, setNewPostContent] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});

  // Mock data
  const mockPosts: Post[] = [
    {
      id: "1",
      author: {
        name: "Nguyễn Văn A",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      content:
        "Hôm nay là một ngày tuyệt vời! Vừa hoàn thành dự án mới và cảm thấy rất hạnh phúc. Công nghệ thực sự đang thay đổi cuộc sống chúng ta theo cách tích cực. 🚀",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      timestamp: "2 giờ trước",
      likes: 142,
      comments: 23,
      shares: 8,
      liked: false,
      bookmarked: false,
    },
    {
      id: "2",
      author: {
        name: "Trần Thị B",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b25bd8f3?w=100&h=100&fit=crop&crop=face",
        verified: false,
      },
      content:
        "Những bài học từ cuộc sống: Hãy luôn giữ thái độ tích cực và không bao giờ ngừng học hỏi. Mỗi ngày đều là một cơ hội mới để phát triển bản thân.",
      timestamp: "4 giờ trước",
      likes: 89,
      comments: 15,
      shares: 3,
      liked: true,
      bookmarked: true,
    },
    {
      id: "3",
      author: {
        name: "Lê Minh C",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        verified: true,
      },
      content:
        "Chia sẻ một số tips về lập trình hiệu quả: 1. Viết code clean, 2. Comment đầy đủ, 3. Test thường xuyên, 4. Refactor khi cần thiết. Các bạn có tips nào khác không?",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
      timestamp: "6 giờ trước",
      likes: 234,
      comments: 45,
      shares: 12,
      liked: false,
      bookmarked: false,
    },
  ];

  const mockComments: { [key: string]: Comment[] } = {
    "1": [
      {
        id: "1",
        author: {
          name: "Hoàng Văn D",
          avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
        },
        content: "Chúc mừng bạn! Dự án gì thế?",
        timestamp: "1 giờ trước",
      },
      {
        id: "2",
        author: {
          name: "Phạm Thị E",
          avatar:
            "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=50&h=50&fit=crop&crop=face",
        },
        content: "Thật tuyệt! Cảm hứng quá 👏",
        timestamp: "30 phút trước",
      },
    ],
  };

  useEffect(() => {
    setPosts(mockPosts);
    setComments(mockComments);
  }, []);

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );
  };

  const handleShare = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  const handleAddComment = (postId: string) => {
    if (!newComment[postId]?.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Bạn",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
      },
      content: newComment[postId],
      timestamp: "vừa xong",
    };

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment],
    }));

    setNewComment((prev) => ({ ...prev, [postId]: "" }));

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: "Bạn",
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
        verified: false,
      },
      content: newPostContent,
      timestamp: "vừa xong",
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      bookmarked: false,
    };

    setPosts((prev) => [newPost, ...prev]);
    setNewPostContent("");
    setShowNewPost(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* New Post */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
                alt="Your avatar"
                className="w-12 h-12 rounded-full"
              />
              <button
                onClick={() => setShowNewPost(true)}
                className="flex-1 text-left py-3 px-4 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
              >
                Bạn đang nghĩ gì?
              </button>
            </div>

            {showNewPost && (
              <div className="mt-4">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Chia sẻ suy nghĩ của bạn..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                />
                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    onClick={() => setShowNewPost(false)}
                    className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleCreatePost}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Đăng
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                {/* Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">
                            {post.author.name}
                          </h3>
                          {post.author.verified && (
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">
                          {post.timestamp}
                        </p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreHorizontal className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-800 mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Post Image */}
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post image"
                      className="w-full rounded-lg object-cover max-h-96"
                    />
                  )}
                </div>

                {/* Engagement Stats */}
                <div className="px-6 py-2 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.likes} lượt thích</span>
                    <div className="flex space-x-4">
                      <span>{post.comments} bình luận</span>
                      <span>{post.shares} chia sẻ</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-6 py-3 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        post.liked
                          ? "text-red-500 bg-red-50 hover:bg-red-100"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          post.liked ? "fill-current" : ""
                        }`}
                      />
                      <span>Thích</span>
                    </button>

                    <button
                      onClick={() =>
                        setSelectedPost(
                          selectedPost === post.id ? null : post.id
                        )
                      }
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Bình luận</span>
                    </button>

                    <button
                      onClick={() => handleShare(post.id)}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Chia sẻ</span>
                    </button>

                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        post.bookmarked
                          ? "text-blue-500 bg-blue-50 hover:bg-blue-100"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Bookmark
                        className={`w-5 h-5 ${
                          post.bookmarked ? "fill-current" : ""
                        }`}
                      />
                      <span>Lưu</span>
                    </button>
                  </div>
                </div>

                {/* Comments Section */}
                {selectedPost === post.id && (
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    {/* Existing Comments */}
                    {comments[post.id]?.map((comment) => (
                      <div key={comment.id} className="flex space-x-3 mb-4">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="bg-white rounded-lg p-3">
                            <h4 className="font-semibold text-sm text-gray-900">
                              {comment.author.name}
                            </h4>
                            <p className="text-gray-800 text-sm">
                              {comment.content}
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 ml-3">
                            {comment.timestamp}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Add Comment */}
                    <div className="flex space-x-3">
                      <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                        alt="Your avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1 flex space-x-2">
                        <input
                          type="text"
                          value={newComment[post.id] || ""}
                          onChange={(e) =>
                            setNewComment((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          placeholder="Viết bình luận..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddComment(post.id)
                          }
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                          Gửi
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogApp;
