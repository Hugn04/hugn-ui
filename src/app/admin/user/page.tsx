import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, FolderOpen, Eye, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Tổng bài viết",
      value: "24",
      description: "+2 từ tháng trước",
      icon: FileText,
      trend: "+8.2%",
    },
    {
      title: "Danh mục",
      value: "6",
      description: "Đang hoạt động",
      icon: FolderOpen,
      trend: "0%",
    },
    {
      title: "Lượt xem",
      value: "12,543",
      description: "+1,234 từ tuần trước",
      icon: Eye,
      trend: "+12.5%",
    },
    {
      title: "Tăng trưởng",
      value: "23.1%",
      description: "So với tháng trước",
      icon: TrendingUp,
      trend: "+4.3%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Chào mừng trở lại!
        </h2>
        <p className="text-muted-foreground">
          Đây là tổng quan về blog của bạn
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-600 font-medium">
                    {stat.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bài viết gần đây</CardTitle>
            <CardDescription>5 bài viết được tạo gần nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Hướng dẫn Next.js 14",
                  date: "2 giờ trước",
                  status: "Đã xuất bản",
                },
                {
                  title: "React Server Components",
                  date: "1 ngày trước",
                  status: "Nháp",
                },
                {
                  title: "TypeScript Tips & Tricks",
                  date: "3 ngày trước",
                  status: "Đã xuất bản",
                },
                {
                  title: "Tailwind CSS Best Practices",
                  date: "5 ngày trước",
                  status: "Đã xuất bản",
                },
                {
                  title: "Database Design Patterns",
                  date: "1 tuần trước",
                  status: "Nháp",
                },
              ].map((post, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{post.title}</p>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      post.status === "Đã xuất bản"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thống kê truy cập</CardTitle>
            <CardDescription>Lượt xem trong 7 ngày qua</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { day: "Thứ 2", views: 1234 },
                { day: "Thứ 3", views: 1456 },
                { day: "Thứ 4", views: 1123 },
                { day: "Thứ 5", views: 1789 },
                { day: "Thứ 6", views: 2134 },
                { day: "Thứ 7", views: 1876 },
                { day: "Chủ nhật", views: 1543 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{item.day}</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(item.views / 2500) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">
                      {item.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
