import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "../../i18n/routing";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: (typeof routing.locales)[number] }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  const messages = await getMessages();
  const t = await getTranslations("Layout");

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
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
              {t("sourceCode")}
            </a>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}