import React from "react";
import Image from "next/image";

const NavLinks = () => {
  return (
    <ul className="flex gap-6">
      <li className="flex gap-2.5">
        <Image src="/images/Home.svg" alt="Home icon" width={20} height={20} />
        Home
      </li>
      <li className="flex gap-2.5">
        <Image
          src="/images/Portfolio.svg"
          alt="Portfolio icon"
          width={20}
          height={20}
        />
        Portfolio
      </li>
    </ul>
  );
};

export default NavLinks;
