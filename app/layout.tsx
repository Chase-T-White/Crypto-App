import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ui/theme-provider";
import Banner from "./ui/Banner";
import Navbar from "./ui/navbar/Navbar";
import StoreProvider from "./StoreProvider";

const space = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Crypto App",
    default: "Crypto App",
  },
  description: "Track the various crypto currencies that you are interested in",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <StoreProvider>
          <body
            className={`${space.className} text-lightTheme-blue-300 dark:text-darkTheme-white-100 bg-lightTheme-bg-purple-100 dark:bg-dark-purple-900`}
          >
            <Banner />
            <Navbar />
            <div className="max-w-[1300px] mx-auto">{children}</div>
          </body>
        </StoreProvider>
      </ThemeProvider>
    </html>
  );
}
