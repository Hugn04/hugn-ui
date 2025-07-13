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
import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
const init = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hugn Template</title>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Inter", sans-serif;
            font-optical-sizing: auto;
            font-style: normal;
        }

        body {
            background: #c7ffcf;
            margin-top: 75px;
            width: 100vw;
        }

        /* Header */
        header {
            width: 100vw;
            height: 75px;
            display: flex;
            justify-content: space-around;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
        }

        header>img {
            transform: translateY(-20px);
            height: 100px;
        }

        #side-bar-btn {
            display: none;
        }

        .logo {
            width: 150px;
            height: 100%;
            background: #98c8f2;
            border-radius: 0 0 16px 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: xx-large;
            font-weight: 600;
        }

        .nav-group {
            display: flex;
            align-self: center;
            background: #98c8f2;
            height: 100%;
            padding: 0 16px;
            border-radius: 0 0 16px 16px;
        }

        nav {
            width: 500px;
            display: flex;
            justify-content: space-around;
            align-self: center;
        }

        nav a {
            position: relative;
            transition: text-shadow 0.3s ease;
        }

        nav a::before {
            content: "";
            position: absolute;
            top: 18px;
            left: -3px;
            width: calc(100% + 6px);
            border-radius: 17px;
            height: 5px;
            background: #0783ff;
            transition: opacity 0.3s ease;
            transform: scaleX(0);
            transition: transform ease 0.2s;
        }

        nav a:hover {
            text-shadow: 0 0 0 currentColor, 0 0 0.5px currentColor, 0 0 1px currentColor,
                0.3px 0.3px 0 currentColor, -0.3px -0.3px 0 currentColor;
        }

        nav a.active {
            text-shadow: 0 0 0 currentColor, 0 0 0.5px currentColor, 0 0 1px currentColor,
                0.3px 0.3px 0 currentColor, -0.3px -0.3px 0 currentColor;
        }

        nav a.active::before {
            transform: scaleX(1);
        }

        nav a:hover::before {
            transform: scaleX(1);
        }

        .action {
            margin-left: 32px;
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }

        .action span {}

        .action img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
        }

        /* Side bar */
        #side-bar {
            width: 100vw;
            position: fixed;
            pointer-events: none;
            top: 0;
            left: 0;
            z-index: 102;
        }

        #side-bar .container.active {
            transform: translateX(0);
        }

        #side-bar .veli {
            pointer-events: all;
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #00000067;
            z-index: -1;
        }

        #side-bar .veli.active {
            display: block;
        }

        #side-bar .container {
            pointer-events: all;
            transition: all 0.5s ease;
            width: 75px;
            height: 100vh;
            background: red;
            z-index: 102;
            z-index: 102;
        }

        /* Content */
        .content {
            padding: 16px;
        }

        /* Button */
        .btn {
            cursor: pointer;
            height: 36px;
            text-align: center;
            border-radius: 8px;
            background-color: #0783ff;
            border: none;
            outline: none;
            padding: 4px 8px;
            font-size: 16px;
            color: white;
        }

        .btn+.btn {
            margin-left: 16px;
        }

        .btn:hover {
            background: #0e79e5;
        }

        .btn.cricle {
            width: 30px;
            height: 30px;
            border-radius: 15px;
        }

        a {
            text-decoration: none;
            color: black;
        }

        @media (min-width: 768px) {
            #side-bar .container:hover {
                width: 250px;
            }

            #side-bar .veli.active {
                display: none;
            }
        }

        @media (max-width: 768px) {
            body {
                margin-top: 60px;
            }

            .nav-group nav {
                display: none;
            }

            .register {
                display: none;
            }

            .action {
                margin: 0;
            }

            .action .btn {
                margin: 0;
            }

            header {
                align-items: center;
                justify-content: space-between;
                height: 60px;
                padding-right: 8px;
            }

            header>img {
                display: none;
            }

            .logo {
                font-size: large;
                width: 80px;
            }

            #side-bar-btn {
                display: block;
                width: 36px;
                border-radius: 0 8px 8px 0;
            }

            #side-bar .container {
                transform: translateX(-100%);
                width: 65%;
            }
        }

        body {
            display: flex;
        }

        .content {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }

        .content>div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
        }

        .home-logo {
            width: 450px;
            opacity: 0;
            transform: translateX(100px);
            animation: slideLeft 0.8s ease-out forwards;
        }

        .slogan {
            flex: 1;
        }

        .slogan .container {
            width: 500px;
            opacity: 0;
            transform: translateY(-100px);
            animation: slideDown 0.8s ease-out forwards;
        }

        @keyframes slideLeft {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideDown {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 768px) {
            .content {
                flex-direction: column-reverse;
                justify-content: center;
                align-items: center;
            }

            .content>div {
                width: 100%;
            }

            .home-logo {
                width: 200px;
            }

            .slogan .container {
                display: block;
            }

            /* .slogan .action {
    display: none;
  } */
            p {
                flex: 1;
            }
        }
    </style>
</head>

<body>
    <header>
        <button class="btn" id="side-bar-btn"><i class="fa-solid fa-bars"></i></button>
        <div class="logo">HUGN
        </div>
        <img src="assets/images/icon.png" alt="">
        <div class="nav-group">
            <nav>
                <a class="active" href="#">Trang chủ</a>
                <a href="/template.html">Mẫu</a>
                <a href="#">Game</a>
                <a href="#">Blog</a>
            </nav>
            <div class="action">
                <!-- <button class="btn register">Đăng ký</button>
                <button class="btn">Đăng nhập</button> -->
                <span>Nguyễn Văn Hùng</span>
                <img src="https://res.cloudinary.com/dfrk1gorf/image/upload/v1729355928/img_quiz/xmqnxj4fcu7eueyyzpoh.jpg"
                    alt="Avatar người dùng">
                <!-- <button class="btn cricle">=</button> -->
            </div>
        </div>
    </header>

    <div id="side-bar">
        <div class="veli"></div>
        <div class="container">
            <div class="header">
                MENU
            </div>
        </div>
    </div>
    <div class="content">
        <div class="slogan">
            <div class="container">
                <h1>Thiết kế không giới hạn – Tự do sáng tạo.
                </h1>
                <br>
                <p>
                    Dành cho những ai không ngại phá cách
                    .Giao diện đậm chất nghệ thuật, mang đến cảm hứng sáng tạo và
                    sự khác biệt hoàn toàn cho dự án của bạn.
                </p>
                <br>
                <div class="action">
                    <button class="btn">Đăng nhập</button>
                    <button class="btn">Xem mẫu</button>
                </div>
            </div>
        </div>
        <div>
            <img class="home-logo" src="assets/images/HomeLogo.png" alt="">
        </div>
    </div>
    <script>
        const btnSidebar = document.getElementById("side-bar-btn")
        const sideBar = document.getElementById("side-bar")
        const sidebarContainer = sideBar.querySelector(".container")
        console.log(sidebarContainer);


        btnSidebar.addEventListener('click', (e) => {
            console.log(123);

            sidebarContainer.classList.add('active')
            document.querySelector(".veli").classList.add('active')
        })
        document.querySelector(".veli").onclick = () => {
            console.log(123);

            sidebarContainer.classList.remove('active')
            document.querySelector(".veli").classList.remove('active')
        }
    </script>
</body>

</html>`;
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
  console.log(setCode);

  const panelRef = useRef<ResizablePanelHandle>(null);
  const preViewRef = useRef<ResizablePanelHandle>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [size, setSize] = useState([70, 30]);

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
            <Input type="email" placeholder="Tìm kiếm" />
            <Button type="submit" variant="outline">
              <Search></Search>
            </Button>
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
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
          <CardTemplate></CardTemplate>
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
