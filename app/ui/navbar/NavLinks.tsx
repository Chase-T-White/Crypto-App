"use client";

import React from "react";
import Link from "next/link";
import { RiHome5Fill } from "react-icons/ri";
import { TbStack2Filled } from "react-icons/tb";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const path = usePathname();

  return (
    <ul className="flex gap-6 font-medium">
      <Link
        href={"/"}
        className={`flex items-center gap-2.5 px-4 py-3  ${
          path === "/" ? "text-white" : "text-[#FFFFFF80]"
        }`}
      >
        <RiHome5Fill className="w-5 h-5" />
        Home
      </Link>
      <Link
        href={"/portfolio"}
        className={`flex items-center gap-2.5 px-4 py-3 ${
          path === "/portfolio" ? "text-white" : "text-[#FFFFFF80]"
        }`}
      >
        <TbStack2Filled className="w-5 h-5" />
        Portfolio
      </Link>
    </ul>
  );
};

export default NavLinks;
