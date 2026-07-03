import { Geist, Geist_Mono } from "next/font/google";
import { NavLink } from "@/components/NavLink";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const NAV_ITEMS = [
  { href: "home", label: "Home" },
  { href: "education", label: "Education" },
];

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
      <body>
        <div className="fixed inset-0 h-20 w-max-screen flex justify-between items-center bg-surface font-sans text-foreground px-5 z-50">
          <h1 className="text-3xl font-bold tracking-tight">
            Alejandro González Macías
          </h1>
          <nav className="flex items-center gap-5">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>
        
        <main className="mt-20">{children}</main>
      </body>
    </html>
  );
}