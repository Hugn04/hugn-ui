"use client";
import CodeView from "@/components/CodeView";
import CardTemplate from "@/components/template/CardTemplate";
import PreviewTemplate from "@/components/template/PreviewTemplate";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination, PaginationTemplate, Template } from "@/types/template";
import axiosClient from "@/utils/requestClient";
import React, { useEffect, useRef, useState } from "react";
const init = `Preview Template Here`;
type ResizablePanelHandle = {
  collapse: () => void;
  expand: (minSize?: number) => void;
  getId: () => string;
  getSize: () => number;
  isCollapsed: () => boolean;
  isExpanded: () => boolean;
  resize: (size: number) => void;
};

export default function TemplatePage() {
  const [code, setCode] = useState(init);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [previewId, setPreviewId] = useState<number | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<ResizablePanelHandle>(null);
  const preViewRef = useRef<ResizablePanelHandle>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState("");
  const [size, setSize] = useState([70, 30]);
  const loadData = async (pageNumber: number) => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axiosClient.get<PaginationTemplate>("/templates", {
        params: { page: pageNumber, limit: 5, keyword: keyword },
      });

      setTemplates((prev) =>
        pageNumber === 1 ? data.data : [...prev, ...data.data]
      );

      setPagination(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!previewId) return;
    const fetchData = async () => {
      try {
        const { data } = await axiosClient.get<{ html: string }>(
          `/template/${previewId}`
        );
        setCode(data.html);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [previewId]);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          pagination.page < pagination.totalPages &&
          !loading
        ) {
          loadData(pagination.page + 1);
        }
      },
      {
        rootMargin: "500px",
      }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, pagination.totalPages, loading]);

  useEffect(() => {
    setTemplates([]);
    loadData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  useEffect(() => {
    if (!isOpen) {
      setSize([
        panelRef.current?.getSize() || 66,
        preViewRef.current?.getSize() || 34,
      ]);
      panelRef.current?.resize(100);
      preViewRef.current?.resize(0);
    } else {
      panelRef.current?.resize(size[0]);
      preViewRef.current?.resize(size[1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="mt-1 h-10 w-full border-t-2 md:min-w-[450px]"
    >
      <ResizablePanel ref={panelRef} defaultSize={100}>
        <div className="flex h-15 border-b-2 items-center justify-between px-4 gap-[8]">
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              placeholder="Tìm kiếm"
            />
            {/* <Button type="submit" variant="outline">
              <Search></Search>
            </Button> */}
          </div>
          <Button
            className="font-semibold"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Preview
          </Button>
        </div>
        <div className="flex h-[600] items-center justify-center p-6 flex-wrap gap-[16] overflow-auto overflow-x-hidden">
          {templates.map((template) => {
            return (
              <CardTemplate
                key={template.id}
                template={template}
                previewId={previewId}
                onPreview={(id) => {
                  setPreviewId(id);
                  if (!isOpen) setIsOpen(true);
                }}
              ></CardTemplate>
            );
          })}
          <div ref={loadMoreRef} />
        </div>
      </ResizablePanel>
      {isOpen && <ResizableHandle withHandle />}
      <ResizablePanel ref={preViewRef} defaultSize={0}>
        <Tabs style={{ gap: 0 }} defaultValue="view" className="w-full">
          <div className="flex w-full h-15 border-b-2 items-center justify-between px-4">
            <Button
              className="font-semibold"
              onClick={() => {
                setIsMobile(!isMobile);
              }}
            >
              Toggle View Mode
            </Button>
            <TabsList>
              <TabsTrigger value="view">View</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="view">
            <div className="w-full h-[600] p-2">
              <PreviewTemplate code={code} mobile={isMobile}></PreviewTemplate>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <div className="w-full h-[600]">
              <CodeView code={code}></CodeView>
            </div>
          </TabsContent>
        </Tabs>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
