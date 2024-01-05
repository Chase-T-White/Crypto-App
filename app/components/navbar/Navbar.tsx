import React from "react";
import Image from "next/image";
import NavLinks from "./NavLinks";
import NavOptions from "./NavOptions";

const Navbar = () => {
  return (
    <nav className="max-w-[1300px] mx-auto mt-6 mb-14 flex items-center justify-between">
      <div className="flex gap-2.5">
        <Image
          src="/images/Logo.svg"
          alt="company logo"
          width={36}
          height={20}
        />
        <h4 className="text-xl font-bold font-Inter">Logoipsm</h4>
      </div>
      <NavLinks />
      <NavOptions />
    </nav>
  );
};

export default Navbar;
