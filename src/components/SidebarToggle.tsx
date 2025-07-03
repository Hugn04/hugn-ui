"use client";
import { useEffect } from "react";

export default function SidebarToggle() {
  useEffect(() => {
    const btnSidebar = document.getElementById("side-bar-btn");
    const sideBar = document.getElementById("side-bar");
    const sidebarContainer = sideBar?.querySelector(".container");
    const veli = document.querySelector(".veli");

    if (btnSidebar && sidebarContainer && veli) {
      btnSidebar.addEventListener("click", () => {
        sidebarContainer.classList.add("translate-x-0");
        veli.classList.remove("hidden");
      });
      veli.addEventListener("click", () => {
        sidebarContainer.classList.remove("translate-x-0");
        veli.classList.add("hidden");
      });
    }
  }, []);

  return null;
}
