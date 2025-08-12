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
import { Button } from "./ui/button";

type ModeToggleProps = {
  type?: "icon" | "select";
};

export function ModeToggle({ type = "select" }: ModeToggleProps) {
  const { theme, setTheme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const activeTheme = mounted ? theme : "system";

  const toggleTheme = (theme: string) => {
    if (theme === "system") {
      theme = systemTheme ?? "light";
    }
    const newTheme = theme == "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div>
      {type === "icon" ? (
        <Button
          onClick={() => {
            toggleTheme(theme ?? "light");
          }}
          variant="outline"
          size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      ) : (
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
      )}
    </div>
  );
}
