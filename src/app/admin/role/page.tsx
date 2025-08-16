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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { mockRoles } from "@/lib/mock-data";
import type { Category } from "@/types/blogPost";
import { Role } from "@/types/role";

export default function CategoriesPage() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
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

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
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
              Thêm danh mục
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm danh mục mới</DialogTitle>
              <DialogDescription>
                Tạo danh mục mới cho blog của bạn
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name">Tên danh mục</label>
                <Input
                  id="name"
                  placeholder="Nhập tên danh mục..."
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
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
          <CardTitle>Danh sách role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên quyền</TableHead>
                  <TableHead>Các quyền</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Hành động</TableHead>
                  {/* <TableHead className="w-[70px]"></TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="font-medium">{role.name}</div>
                    </TableCell>
                    <TableCell>
                      {role.permissions.map((permission) => {
                        return (
                          <code
                            key={permission.id}
                            className="text-sm bg-muted px-2 py-1 rounded"
                          >
                            {permission.name}
                          </code>
                        );
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate text-muted-foreground">
                        {role.description}
                      </div>
                    </TableCell>
                    {/* <TableCell></TableCell> */}
                    {/* <TableCell>{formatDate(category.createdAt)}</TableCell> */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Mở menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => {}}>
                            <Edit className="mr-2 h-4 w-4" />
                            Chỉnh sửa
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {}}
                            // disabled={category.postCount > 0}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
            <DialogDescription>Cập nhật thông tin danh mục</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="edit-name">Tên danh mục</label>
              <Input
                id="edit-name"
                placeholder="Nhập tên danh mục..."
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              {/* <Label htmlFor="edit-slug">Slug</Label> */}
              <Input
                id="edit-slug"
                placeholder="url-danh-muc"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
              />
            </div>
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
