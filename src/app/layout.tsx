// import libs
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

// import components
import { BreadCrumb, ScrollUp } from "@/components";

// import partials
import { CustomerFooter, CustomerHeader } from "@/partials";

// import css
import "./globals.css";
import { Providers } from "./providers";
import { PageLoader } from "@/components/(general)/layouts/page-loader";

const josefin = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={josefin.className}>
      <body className="ml:bg-white md:bg-bg-1 dark:bg-bg-dark-1">
        <PageLoader>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              {children}
              <SpeedInsights />
            </ThemeProvider>
          </Providers>
        </PageLoader>
      </body>
    </html>
  );
}
