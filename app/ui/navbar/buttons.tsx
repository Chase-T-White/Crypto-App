"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="flex items-center justify-center p-3.5 bg-dark-purple-700 rounded-md border border-[#ffffff0d]"
      title="Toggle theme"
      data-theme={`${theme}`}
      onClick={() => setTheme(() => (theme === "light" ? "dark" : "light"))}
    >
      <Image
        src="/images/Light.svg"
        alt="Light icon"
        width={20}
        height={20}
        data-hide-on-theme="dark"
      />
      <Image
        src="/images/Dark.svg"
        alt="Dark icon"
        width={20}
        height={20}
        data-hide-on-theme="light"
      />
    </button>
  );
}
