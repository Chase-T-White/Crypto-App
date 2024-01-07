import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
// import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";

const space = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto App",
  description: "Track the various crypto currencies that you are interested in",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <ThemeProvider attribute="class"> */}
      <body
        className={`${space.className} text-darkTheme-white-100 bg-dark-purple-800`}
      >
        <div className="max-w-[1300px] mx-auto">
          <Navbar />
          {children}
        </div>
      </body>
      {/* </ThemeProvider> */}
    </html>
  );
}
