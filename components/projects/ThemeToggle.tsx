"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#F6F6F6] dark:bg-[#2B2C30] z-[99999] p-1.5 text-sm rounded-full grid grid-cols-2 gap-1">
      <button
        onClick={() => setTheme("light")}
        className={`p-2 rounded-3xl z-auto text-center ${
          theme == "light"
            ? " bg-[#ffffff] text-theme font-semibold shadow "
            : "text-theme-inactive"
        }`}
      >
        🌞 Light
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-3xl z-auto text-center ${
          theme == "dark"
            ? " bg-[#38393c] text-theme font-semibold shadow "
            : "text-theme-inactive"
        } `}
      >
        🌙 Dark
      </button>
    </div>
  );
}
