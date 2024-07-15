import Image from "next/image";
import NavLinks from "./NavLinks";
import NavOptions from "./NavOptions";

const Navbar = () => {
  return (
    <nav className="text-sm lg:text-base py-6 px-6 bg-white dark:bg-transparent">
      <div className="max-w-[1300px] w-full mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="shrink-0">
            <Image
              src="/images/Logo.svg"
              alt="company logo"
              width={36}
              height={20}
            />
          </div>
          <h4 className="hidden base:inline-block text-xl font-bold font-Inter">
            Logoipsm
          </h4>
        </div>
        <NavLinks />
        <NavOptions />
      </div>
    </nav>
  );
};

export default Navbar;
