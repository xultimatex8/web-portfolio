import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />

        <main className="mt-20 flex-1">{children}</main>

        <footer className="w-full py-8 lg:py-10 px-6 lg:px-15 flex flex-col lg:flex-row items-center justify-between gap-3 bg-nav text-nav-foreground text-sm md:text-base fhd:text-lg text-center">
          <p>© {new Date().getFullYear()} Alejandro González Macías</p>
          <a
            href="https://github.com/xultimatex8/web-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 decoration-nav-foreground/40 hover:decoration-accent-primary hover:text-accent-primary transition-colors"
          >
            Built with Next.js — view source on GitHub
          </a>
        </footer>
      </body>
    </html>
  );
}