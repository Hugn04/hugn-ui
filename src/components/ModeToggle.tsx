"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "./ui/select";
import { SelectValue } from "@radix-ui/react-select";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const activeTheme = mounted ? theme : "system";
  return (
    <Select
      defaultValue={activeTheme}
      value={activeTheme}
      onValueChange={(value) => setTheme(value)}
    >
      <SelectTrigger>
        {activeTheme === "system" && <Monitor />}
        {activeTheme === "dark" && <Moon />}
        {activeTheme === "light" && <Sun />}
        <SelectValue></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value="system">System</SelectItem>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
