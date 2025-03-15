import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omawang",
  description: "Kurniwan Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="font-[family-name:var(--font-geist-sans)] min-h-screen max-w-2xl mx-auto px-4">
            <Navbar />

            {children}

            <footer className="flex items-center justify-center pb-4 pt-8">
              <small className="font-medium">
                &copy; Copyright {new Date().getFullYear()}, Omawang.
              </small>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
