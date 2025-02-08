import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ActiveSectionContextProvider from "@/context/active-section-context";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";
import { NextIntlClientProvider, useMessages } from "next-intl";
import LocaleSwitch from "@/components/locale-switch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dionmax | Personal Portfolio",
  description: "Dionmax is a Fullstack Developer with 4 years of experience",
};

type Props = {
  children: React.ReactNode;
  params: {
    locale: "en" | "pt";
  };
};

const RootLayout: React.FC<Props> = ({ children, params: { locale } }) => {
  const messagens = useMessages();

  return (
    <html lang={locale} className="!scroll-smooth">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-[#97c0e7] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#4c549c]"></div>
        <div className="bg-[#f1acac] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#826394]"></div>

        <NextIntlClientProvider messages={messagens}>
          <ThemeContextProvider>
            <ActiveSectionContextProvider>
              <Header />
              {children}
              <Toaster position="top-right" />
              <Footer />
              <ThemeSwitch />
              <LocaleSwitch />
            </ActiveSectionContextProvider>
          </ThemeContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;