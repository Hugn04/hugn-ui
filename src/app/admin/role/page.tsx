"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import type { Category } from "@/types/blogPost";
import { Permission, Role } from "@/types/role";
import axiosClient from "@/utils/requestClient";
import useSWR from "swr";
import ChipSelect, { ChipItem } from "@/components/ChipSelect";

const fetcher = <T,>(url: string) =>
  axiosClient.get<T>(url).then((res) => res.data);

export default function CategoriesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<Role>({
    id: 0,
    name: "",
    description: "",
    permissions: [],
  });

  const {
    data: permissions,
    // isLoading,
    // error,
  } = useSWR<Permission[]>("/admin/permissions", (url) => fetcher(url), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // 1 phút mới gọi lại
  });
  const {
    data: roles,
    // isLoading,
    // error,
  } = useSWR<Role[]>("/admin/role", (url) => fetcher(url), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // 1 phút mới gọi lại
  });

  const resetForm = () => {
    setFormData({
      id: "",
      slug: "",
      description: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Auto-generate slug from name
    if (field === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };

  const handleAddCategory = () => {
    // const newCategory: Category = {
    //   id: Date.now().toString(),
    //   name: formData.name,
    //   slug: formData.slug,
    //   description: formData.description,
    //   postCount: 0,
    //   createdAt: new Date().toISOString(),
    // };
    // setCategories([...roles, newCategory]);
    // resetForm();
    // setIsAddDialogOpen(false);
  };

  const handleEditRole = (role: Role) => {
    // setEditingCategory(role);
    setFormData({
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: [],
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCategory = () => {
    if (editingCategory) {
      // setCategories(
      //   roles.map((cat) =>
      //     cat.id === editingCategory.id
      //       ? {
      //           ...cat,
      //           name: formData.name,
      //           slug: formData.slug,
      //           description: formData.description,
      //         }
      //       : cat
      //   )
      // );
      // resetForm();
      // setIsEditDialogOpen(false);
      // setEditingCategory(null);
    }
  };

  const handleDeleteCategory = (category: Category) => {
    console.log(category);

    // setCategories(roles.filter((cat) => cat.id !== category.id));
    // setDeleteCategory(null);
  };
  const initData = [
    {
      id: 1,
      name: "admin",
      description: "Tạo bài viết",
    },
    {
      id: 2,
      name: "user",
      description: "Sửa bài viết",
    },
    {
      id: 3,
      name: "studio",
      description: "Xóa người dùng",
    },
    {
      id: 4,
      name: "view_report",
      description: "Xem báo cáo",
    },
  ];
  const selectData = [
    {
      id: 4,
      name: "view_report",
      description: "Xem báo cáo",
    },
  ];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quản lý quyền</h2>
          <p className="text-muted-foreground">
            Tạo và quản lý các quyền cho người dùng của bạn
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Thêm vai trò
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm vai trò mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <label htmlFor="name">Tên vai trò</label>
              <Input
                id="name"
                placeholder="Nhập tên vai trò..."
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <label htmlFor="name">Permission</label>
              <ChipSelect data={initData} selectData={selectData}></ChipSelect>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={handleAddCategory}
                disabled={!formData.name.trim()}
              >
                Thêm danh mục
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách quyền</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Tên quyền</TableHead>
                  <TableHead className="w-[400px]">Các permission</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="w-[200px]">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles?.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="font-medium">{role.name}</div>
                    </TableCell>
                    <TableCell className="flex gap-1 items-center flex-wrap">
                      {role.permissions.map((permission) => {
                        return (
                          <ChipItem key={permission.id}>
                            {permission.name}
                          </ChipItem>
                        );
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate text-muted-foreground">
                        {role.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleEditRole(role);
                          setIsEditDialogOpen(true);
                        }}
                        className="mr-2"
                      >
                        <Edit className="h-4 w-4" />
                        Chỉnh sửa
                      </Button>
                      <Button variant={"destructive"}>
                        <Trash2 className="h-4 w-4" />
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Permission */}
      <Card>
        <CardHeader>
          <CardTitle>Permission</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên Permission</TableHead>
                  <TableHead>Mô tả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {permissions?.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell>
                      <div className="font-medium">{permission.name}</div>
                    </TableCell>

                    <TableCell>
                      <div className="max-w-[200px] truncate text-muted-foreground">
                        {permission.description}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <label htmlFor="name">Tên vai trò</label>
            <Input
              id="name"
              placeholder="Nhập tên vai trò..."
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <label htmlFor="name">Permission</label>
            <ChipSelect
              data={initData}
              selectData={formData.permissions}
            ></ChipSelect>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                resetForm();
                setEditingCategory(null);
              }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleUpdateCategory}
              disabled={!formData.name.trim()}
            >
              Cập nhật
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteCategory}
        onOpenChange={() => setDeleteCategory(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa danh mục</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa danh mục {deleteCategory?.name}? Hành
              động này không thể hoàn tác.
              {deleteCategory?.postCount && deleteCategory.postCount > 0 && (
                <div className="mt-2 p-2 bg-destructive/10 text-destructive text-sm rounded">
                  Không thể xóa danh mục này vì còn {deleteCategory.postCount}{" "}
                  bài viết.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteCategory && handleDeleteCategory(deleteCategory)
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={
                !!(deleteCategory?.postCount && deleteCategory.postCount > 0)
              }
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
