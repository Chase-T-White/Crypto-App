"use client";

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="flex items-center justify-center p-3.5"
      title="Toggle theme"
      data-theme={`${theme}`}
      onClick={() => setTheme(() => (theme === "light" ? "dark" : "light"))}
    >
      {theme === "light" ? (
        <FiSun className="w-5 h-5" data-hide-on-theme="dark" />
      ) : (
        <FiMoon className="w-5 h-5" data-hide-on-theme="light" />
      )}
      {/* <Image
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
      /> */}
    </button>
  );
}
