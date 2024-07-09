import Image from "next/image";
import NavLinks from "./NavLinks";
import NavOptions from "./NavOptions";

const Navbar = () => {
  return (
    <nav className="py-6 px-6 xl:px-0 bg-white dark:bg-transparent">
      <div className="max-w-[1300px] w-full mx-auto flex items-center justify-between">
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
      </div>
    </nav>
  );
};

export default Navbar;
