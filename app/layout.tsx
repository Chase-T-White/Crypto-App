import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ui/theme-provider";
import Banner from "./ui/Banner";
import Navbar from "./ui/navbar/Navbar";
import StoreProvider from "./StoreProvider";
import { ErrorBoundary } from "react-error-boundary";

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
    <html className="min-h-screen" lang="en" suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <StoreProvider>
          <body
            className={`relative ${space.className} min-h-screen text-dark-text-400 dark:text-light-text-100 bg-light-purple-100 dark:bg-dark-purple-900`}
          >
            <ErrorBoundary fallback={<p>Oops, something went wrong</p>}>
              <ErrorBoundary
                fallback={
                  <p className="py-5 text-center text-xsm font-medium text-light-text-200 bg-dark-purple-600 dark:bg-dark-purple-800 border-b border-white/[0.1]">
                    Something went wrong
                  </p>
                }
              >
                <Banner />
              </ErrorBoundary>
              <Navbar />
              <div className="max-w-[1300px] min-h-[calc(100vh-161px)] mx-auto">
                {children}
              </div>
            </ErrorBoundary>
          </body>
        </StoreProvider>
      </ThemeProvider>
    </html>
  );
}
