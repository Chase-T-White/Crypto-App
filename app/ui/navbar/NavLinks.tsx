"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiHome5Fill } from "react-icons/ri";
import { TbStack2Filled } from "react-icons/tb";

const NavLinks = () => {
  const path = usePathname();

  return (
    <ul className="flex gap-2 lg:gap-6 font-medium">
      <Link
        href={"/"}
        className={`flex items-center gap-2.5 px-2 xsm:px-4 py-1.5 xsm:py-3  ${
          path === "/"
            ? "text-dark-text-200 dark:text-white border-white/10 bg-dark-blue-400"
            : "text-dark-text-200/50 dark:text-white/50 bg-light-purple-200 dark:bg-dark-purple-500 border-transparent"
        } border md:border-0 rounded-md md:bg-transparent`}
        title="Home Page"
      >
        <RiHome5Fill className="w-5 h-5" />
        <p className={`hidden md:block`}>Home</p>
      </Link>
      <Link
        href={"/portfolio"}
        className={`flex items-center gap-2.5 px-2 xsm:px-4 py-1.5 xsm:py-3 ${
          path === "/portfolio"
            ? "text-dark-text-200 dark:text-white border-white/10 bg-dark-blue-400"
            : "text-dark-text-200/50 dark:text-white/50 bg-light-purple-200 dark:bg-dark-purple-500 border-transparent"
        } border md:border-0 rounded-md md:bg-transparent`}
        title="Portfolio Page"
      >
        <TbStack2Filled className="w-5 h-5" />
        <p className={`hidden md:block`}>Portfolio</p>
      </Link>
    </ul>
  );
};

export default NavLinks;
