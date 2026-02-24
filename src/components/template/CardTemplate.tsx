import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Heart, ThumbsUp } from "lucide-react";
import { Button } from "../ui/button";
import { Template } from "@/types/template";
type CardTemplateProps = {
  template: Template;
  onPreview: (id: number) => void;
  previewId?: number | null;
};
export default function CardTemplate({
  template,
  onPreview,
  previewId,
}: CardTemplateProps) {
  const { id, name, description, image } = template;
  return (
    <div>
      <Card className="w-[300px] h-auto">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <Image
            className="object-cover w-full"
            src={image ? image : "/assets/images/image.png"}
            width={245}
            height={300}
            alt=""
          ></Image>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>Ngày lễ</div>
            <div className="flex gap-[16]">
              <span className="flex">
                <Heart size={20} /> 1
              </span>
              <span className="flex">
                <ThumbsUp size={20}></ThumbsUp> 2
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-between">
            <Button>Xem thêm</Button>
            <Button
              disabled={id === previewId}
              onClick={() => {
                onPreview(id);
              }}
            >
              Xem trước
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
