import React from "react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <p className="text-2xl">Oops, this page does not exist</p>
      <div>
        <Link href={"/"} className="active-button px-3 py-5 text-lg rounded-lg">
          Home
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;
