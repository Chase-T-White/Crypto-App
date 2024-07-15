import React from "react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center gap-10">
      <p className="text-2xl">Oops, this page does not exist</p>
      <div>
        <Link href={"/"} className="active-button px-8 py-3 text-lg rounded-lg">
          Home
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;
