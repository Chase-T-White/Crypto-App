"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";
import { RxComponentPlaceholder } from "react-icons/rx";
import { updateTheme } from "@/utils/localStorageFunctions";

export function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex items-center justify-center p-1.5 xsm:p-3.5">
        <RxComponentPlaceholder className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      className="flex items-center justify-center p-1.5 xsm:p-3.5"
      title="Toggle theme"
      data-theme={`${theme}`}
      onClick={() => {
        setTheme(() => (theme === "light" ? "dark" : "light"));
        updateTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? (
        <FiSun className="w-5 h-5" data-hide-on-theme="dark" />
      ) : (
        <FiMoon className="w-5 h-5" data-hide-on-theme="light" />
      )}
    </button>
  );
}
